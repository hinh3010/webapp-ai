"use client";

import { useEffect, useRef } from "react";
import * as fabric from "fabric";

export default function CanvasComponent() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

    useEffect(() => {
        if (canvasRef.current && !fabricCanvasRef.current) {
            const canvas = new fabric.Canvas(canvasRef.current, {
                controlsAboveOverlay: true,
            });
            fabricCanvasRef.current = canvas;

            // Tạo một hình chữ nhật thay vì path
            const clip = new fabric.Rect({
                left: 140.75,    // Tương đương x tối thiểu từ path cũ
                top: 27,        // Tương đương y tối thiểu từ path cũ
                width: 218.5,   // 359.25 - 140.75 từ path cũ
                height: 446,    // 473 - 27 từ path cũ
                fill: "red",
                absolutePositioned: true, // Đảm bảo clip hoạt động đúng
            });

            canvas.add(clip);
            canvas.centerObject(clip);

            // Load và thêm hình ảnh
            fabric.FabricImage.fromURL(
                "https://cdn.pixabay.com/photo/2015/12/09/01/02/colorful-abstract-background-1084082_640.jpg",
                { crossOrigin: "anonymous" }
            ).then((img) => {
                img.set({
                    centeredScaling: true,
                });
                canvas.add(img);
                canvas.clipPath = clip;
                canvas.renderAll();
            });
        }

        // Cleanup khi component unmount
        return () => {
            if (fabricCanvasRef.current) {
                fabricCanvasRef.current.dispose();
                fabricCanvasRef.current = null;
            }
        };
    }, []);

    return (
        <div>
            <canvas
                ref={canvasRef}
                id="canvas"
                width={500}
                height={500}
                style={{ border: "1px solid #ccc" }}
            />
        </div>
    );
}