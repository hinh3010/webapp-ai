"use client";

import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";

interface Page {
    frame: fabric.Rect;
    background: fabric.Rect | fabric.FabricImage;
    layers: fabric.Object[];
}

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [pages, setPages] = useState<Page[]>([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        if (!canvasRef.current) return;

        const newCanvas = new fabric.Canvas(canvasRef.current, {
            width: 1000,
            height: 700,
            backgroundColor: "#f0f0f0",
        });

        setCanvas(newCanvas);

        const defaultPage = createPage(newCanvas, 0, 100);
        setPages([defaultPage]);

        return () => {
            newCanvas.dispose();
        };
    }, []);

    const createPage = (canvas: fabric.Canvas, pageIndex: number, topPosition: number): Page => {
        const frameWidth = 800;
        const frameHeight = 500;

        const frame = new fabric.Rect({
            left: 100,
            top: topPosition,
            width: frameWidth,
            height: frameHeight,
            fill: "transparent",
            stroke: "black",
            strokeWidth: 2,
            selectable: false,
            evented: false,
            name: `frame-${pageIndex}`,
        });

        const background = new fabric.Rect({
            left: frame.left,
            top: frame.top,
            width: frameWidth,
            height: frameHeight,
            fill: "white",
            selectable: false,
            evented: false,
            lockMovementX: true,
            lockMovementY: true,
            hasControls: false,
            hasBorders: false,
            name: `background-${pageIndex}`,
        });

        canvas.add(background);
        canvas.add(frame);

        return { frame, background, layers: [] };
    };


    const addPage = () => {
        if (!canvas) return;

        const frameHeight = 500;
        const spacing = 20;
        const lastPage = pages[pages.length - 1];
        const newTop = lastPage ? lastPage.frame.top! + frameHeight + spacing : 100;

        const newPage = createPage(canvas, pages.length, newTop);
        const newCanvasHeight = newTop + frameHeight + 100;
        canvas.setHeight(newCanvasHeight);

        setPages((prev) => [...prev, newPage]);
        setCurrentPage(pages.length);
    };

    const addBackground = (file: File) => {
        if (!canvas || pages.length === 0) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const imgElement = new Image();
            imgElement.src = e.target?.result as string;
            imgElement.onload = () => {
                const frame = pages[currentPage].frame;
                const oldBackground = pages[currentPage].background;

                const newBackground = new fabric.FabricImage(imgElement, {
                    left: frame.left,
                    top: frame.top,
                    width: frame.width,
                    height: frame.height,
                    scaleX: 1,
                    scaleY: 1,
                    selectable: false,
                    evented: false,
                    lockMovementX: true,
                    lockMovementY: true,
                    hasControls: false,
                    hasBorders: false,
                    name: `background-${currentPage}`,
                });

                const frameWidth = frame.width!;
                const frameHeight = frame.height!;
                const imgWidth = imgElement.width;
                const imgHeight = imgElement.height;
                const scale = Math.max(frameWidth / imgWidth, frameHeight / imgHeight);
                newBackground.scaleX = scale;
                newBackground.scaleY = scale;

                canvas.remove(oldBackground);
                pages[currentPage].background = newBackground;
                canvas.add(newBackground);
            };
        };
        reader.readAsDataURL(file);
    };

    const addRectangle = () => {
        if (!canvas || pages.length === 0) return;

        const frame = pages[currentPage].frame;
        const rect = new fabric.Rect({
            left: frame.left! + 100,
            top: frame.top! + 100,
            fill: "blue",
            width: 100,
            height: 100,
        });

        pages[currentPage].layers.push(rect);
        canvas.add(rect);
    };

    const exportImage = () => {
        if (!canvas || pages.length === 0) return;

        const frame = pages[currentPage].frame;
        const dataURL = canvas.toDataURL({
            format: "jpeg",
            multiplier: 1,
            quality: 1,
            left: frame.left,
            top: frame.top,
            width: frame.width,
            height: frame.height,
        });

        const link = document.createElement("a");
        link.href = dataURL;
        link.download = `page-${currentPage + 1}.jpeg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4 bg-gray-100 min-h-screen">
            <div className="flex flex-wrap gap-2 bg-white p-4 shadow-md rounded-lg">
                <button
                    onClick={addPage}
                    className="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                >
                    📄 Add Page
                </button>
                <button
                    onClick={addRectangle}
                    className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                    🟦 Hình chữ nhật
                </button>
                <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                    🌄 Thêm nền
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files && addBackground(e.target.files[0])}
                        className="hidden"
                    />
                </label>
                <button
                    onClick={exportImage}
                    className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                    📷 Xuất ảnh
                </button>
                <select
                    value={currentPage}
                    onChange={(e) => setCurrentPage(Number(e.target.value))}
                    className="px-3 py-2 border rounded-lg"
                >
                    {pages.map((_, index) => (
                        <option key={index} value={index}>
                            Page {index + 1}
                        </option>
                    ))}
                </select>
            </div>
            <canvas
                ref={canvasRef}
                width={1000}
                height={700}
                className="border border-gray-300 shadow-lg rounded-lg"
            />
        </div>
    );
};

export default Canvas;