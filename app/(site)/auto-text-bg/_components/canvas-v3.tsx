"use client"; // Thêm directive này vì chúng ta sử dụng client-side code

import { useEffect, useRef } from "react";
import * as fabric from "fabric";

export default function CanvasComponent() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

    useEffect(() => {
        // Khởi tạo canvas
        if (canvasRef.current && !fabricCanvasRef.current) {
            const canvas = new fabric.Canvas(canvasRef.current, {
                controlsAboveOverlay: true,
            });
            fabricCanvasRef.current = canvas;

            // Tạo clip path
            const clip = new fabric.Path(
                "M 162.824 27 L 337.176 27 C 349.359 27 359.25 36.891 359.25 49.074 L 359.25 450.926 C 359.25 463.109 349.359 473 337.176 473 L 162.824 473 C 150.641 473 140.75 463.109 140.75 450.926 L 140.75 49.074 C 140.75 36.891 150.641 27 162.824 27 Z M 190.041 66 C 200.046 66 208.168 74.206 208.168 84.312 L 208.168 141.688 C 208.168 151.794 200.046 160 190.041 160 C 180.037 160 171.915 151.794 171.915 141.688 L 171.915 84.312 C 171.915 74.206 180.037 66 190.041 66 Z"
            );

            clip.set({
                fill: "red",
                fillRule: "evenodd",
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
            })
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