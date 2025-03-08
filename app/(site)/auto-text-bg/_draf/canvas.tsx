"use client";

import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [history, setHistory] = useState<string[]>([]); // Lưu trạng thái JSON đầy đủ
    const [redoStack, setRedoStack] = useState<string[]>([]);

    useEffect(() => {
        if (!canvasRef.current) return;

        const newCanvas = new fabric.Canvas(canvasRef.current, {
            backgroundColor: "white",
            selection: true,
        });

        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: "red",
            width: 200,
            height: 200,
        });

        newCanvas.add(rect);
        setCanvas(newCanvas);

        // Lưu trạng thái ban đầu vào history
        setHistory([JSON.stringify(newCanvas.toJSON())]);

        return () => {
            newCanvas.dispose();
        };
    }, []);

    // 🔹 Thêm hình chữ nhật
    const addRectangle = () => {
        if (!canvas) return;
        const rect = new fabric.Rect({
            left: canvas.width! / 2,
            top: canvas.height! / 2,
            fill: "blue",
            width: 100,
            height: 100,
            originX: "center",
            originY: "center",
        });
        canvas.add(rect);
        saveHistory();
        canvas.renderAll();
    };

    // 🔹 Thêm hình tròn
    const addCircle = () => {
        if (!canvas) return;
        const circle = new fabric.Circle({
            left: 150,
            top: 150,
            radius: 50,
            fill: "red",
        });
        canvas.add(circle);
        saveHistory();
    };

    // 🔹 Thêm văn bản
    const addText = () => {
        if (!canvas) return;
        const text = new fabric.Text("Hello Fabric!", {
            left: 200,
            top: 200,
            fontSize: 24,
            fill: "black",
        });
        canvas.add(text);
        saveHistory();
    };

    // 🔹 Xóa đối tượng được chọn
    const deleteObject = () => {
        if (!canvas) return;
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.remove(activeObject);
            saveHistory();
        }
    };

    // 🔹 Lưu lịch sử
    const saveHistory = () => {
        if (!canvas) return;
        setHistory((prev) => [...prev, JSON.stringify(canvas.toJSON())]);
        setRedoStack([]); // Reset redo khi có hành động mới
    };

    // 🔹 Undo
    const undo = () => {
        if (!canvas || history.length <= 1) return; // Giữ lại trạng thái đầu tiên
        const currentState = JSON.stringify(canvas.toJSON());
        setRedoStack((prev) => [currentState, ...prev]);
        const prevState = history[history.length - 2]; // Lấy trạng thái trước đó
        setHistory((prev) => prev.slice(0, -1)); // Xóa trạng thái hiện tại
        canvas.loadFromJSON(JSON.parse(prevState), () => canvas.renderAll());
    };

    // 🔹 Redo
    const redo = () => {
        if (!canvas || redoStack.length === 0) return;
        const currentState = JSON.stringify(canvas.toJSON());
        setHistory((prev) => [...prev, currentState]);
        const nextState = redoStack[0];
        setRedoStack((prev) => prev.slice(1));
        canvas.loadFromJSON(JSON.parse(nextState), () => canvas.renderAll());
    };

    // 🔹 Export hình ảnh
    const exportImage = () => {
        if (!canvas) return;
        const dataURL = canvas.toDataURL({
            format: "png",
            multiplier: 1, // Sửa multiplier thành 1 để đảm bảo chất lượng
        });
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "canvas.png";
        link.click();
    };

    // 🔹 Vẽ tự do (Pencil Mode)
    const toggleDrawingMode = () => {
        if (!canvas) return;
        setIsDrawing((prev) => !prev);
        canvas.isDrawingMode = !isDrawing;
        saveHistory();
    };

    // 🔹 Zoom & Pan
    const zoomIn = () => {
        if (!canvas) return;
        canvas.setZoom(canvas.getZoom() * 1.1);
    };

    const zoomOut = () => {
        if (!canvas) return;
        canvas.setZoom(canvas.getZoom() * 0.9);
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4 bg-gray-100 min-h-screen">
            {/* 🔹 Thanh công cụ */}
            <div className="flex flex-wrap gap-2 bg-white p-4 shadow-md rounded-lg">
                <button onClick={addRectangle} className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">🟦 Hình chữ nhật</button>
                <button onClick={addCircle} className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">🔴 Hình tròn</button>
                <button onClick={addText} className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">📝 Văn bản</button>
                <button onClick={deleteObject} className="cursor-pointer px-4 py-2 text-white rounded-lg hover:bg-red-600 transition-all bg-red-500">🗑 Xóa</button>
                <button onClick={undo} className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">⏪ Undo</button>
                <button onClick={redo} className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">⏩ Redo</button>
                <button onClick={toggleDrawingMode} className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">✏ Vẽ</button>
                <button onClick={zoomIn} className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">🔍+</button>
                <button onClick={zoomOut} className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">🔍-</button>
                <button onClick={exportImage} className="cursor-pointer px-4 py-2 text-white rounded-lg hover:bg-green-600 transition-all bg-green-500">📷 Xuất ảnh</button>
            </div>

            {/* 🔹 Canvas */}
            <canvas ref={canvasRef} width={800} height={500} className="border border-gray-300 shadow-lg rounded-lg" />
        </div>
    );
};

export default Canvas;