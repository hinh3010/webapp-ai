import { useEffect, useRef } from "react";
import * as fabric from "fabric";

const TwoCanvas = () => {
    const topCanvasRef = useRef<fabric.Canvas | null>(null);
    const bottomCanvasRef = useRef<fabric.Canvas | null>(null);

    useEffect(() => {
        // Tạo 2 canvas
        const topCanvas = new fabric.Canvas("topCanvas", { backgroundColor: "lightgray" });
        const bottomCanvas = new fabric.Canvas("bottomCanvas", { backgroundColor: "white" });

        topCanvasRef.current = topCanvas;
        bottomCanvasRef.current = bottomCanvas;

        // 🔥 Xử lý kéo thả
        topCanvas.on("object:moving", (e) => {
            const obj = e.target;
            if (obj) obj.set({ opacity: 0.5 });
        });

        topCanvas.on("mouse:up", (e) => {
            const obj = e.target;
            if (!obj) return;

            // Lấy vị trí object
            const pointer = topCanvas.getPointer(e.e);
            const bottomCanvasRect = bottomCanvas.upperCanvasEl.getBoundingClientRect();

            // 🔥 Nếu object di chuyển ra ngoài topCanvas -> chuyển xuống bottomCanvas
            if (pointer.y > bottomCanvasRect.top - topCanvas.upperCanvasEl.getBoundingClientRect().top) {
                topCanvas.remove(obj);
                bottomCanvas.add(obj);
                obj.set({ opacity: 1 });
                bottomCanvas.renderAll();
            } else {
                obj.set({ opacity: 1 });
                topCanvas.renderAll();
            }
        });

        return () => {
            topCanvas.dispose();
            bottomCanvas.dispose();
        };
    }, []);

    return (
        <div>
            <canvas id="topCanvas" width={500} height={250} style={{ border: "1px solid black" }}></canvas>
            <canvas id="bottomCanvas" width={500} height={250} style={{ border: "1px solid black", marginTop: "10px" }}></canvas>
        </div>
    );
};

export default TwoCanvas;
