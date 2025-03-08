"use client";

import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(100);
    const [selectedFont, setSelectedFont] = useState("Arial"); // Font mặc định

    useEffect(() => {
        if (!canvasRef.current) return;

        const newCanvas = new fabric.Canvas(canvasRef.current, {
            backgroundColor: "white",
            selection: true,
            width: 800,
            height: 500,
        });

        setCanvas(newCanvas);

        return () => {
            newCanvas.dispose();
        };
    }, []);


    // 🔹 Thêm hình chữ nhật
    const addRectangle = () => {
        if (!canvas) return;
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: "blue",
            width: 100,
            height: 100,
            globalCompositeOperation: 'source-atop',
            objectCaching: true
        });

        canvas.add(rect);
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
    };

    // 🔹 Thêm văn bản
    const addText = () => {
        if (!canvas) return;
        const text = new fabric.Textbox("Hello Fabric!", {
            left: 200,
            top: 200,
            fontSize: 24,
            fill: "black",
            editable: true,
            width: 0,
            lockScalingX: true,
            lockScalingY: true,
            lockUniScaling: true,
            selectable: true,
            textAlign: 'center',
        });


        text.setControlsVisibility({
            mt: true, // Top middle
            mb: true, // Bottom middle
            ml: true, // Left middle
            mr: true, // Right middle
            tl: true, // Top left
            tr: true, // Top right
            bl: true, // Bottom left
            br: true, // Bottom right
            mtr: false, // Xoay (ẩn nếu không muốn xoay)
        });
        text.set({
            borderColor: "blue", // Màu viền
            cornerColor: "green", // Màu điểm điều khiển
            cornerSize: 10, // Kích thước điểm điều khiển
        });

        // Tự động điều chỉnh width theo nội dung ban đầu
        text.set({ width: text.getMinWidth() });
        text.controls = {
            tl: new fabric.Control({
                x: -0.5,
                y: -0.5,
                cursorStyle: "pointer",
                render: (ctx, left, top) => {
                    ctx.font = "16px Arial";
                    ctx.fillStyle = "red";
                    ctx.fillText("★", left - 8, top + 4);
                },
            }),
            tr: new fabric.Control({
                x: 0.5,
                y: -0.5,
                cursorStyle: "pointer",
            }),
            bl: new fabric.Control({
                x: -0.5,
                y: 0.5,
                cursorStyle: "pointer",
            }),
            br: new fabric.Control({
                x: 0.5,
                y: 0.5,
                cursorStyle: "pointer",
            }),
            mt: new fabric.Control({
                x: 0,
                y: -0.5,
                cursorStyle: "pointer",
            }),
            mb: new fabric.Control({
                x: 0,
                y: 0.5,
                cursorStyle: "pointer",
            }),
            ml: new fabric.Control({
                x: -0.5,
                y: 0,
                cursorStyle: "pointer",
            }),
            mr: new fabric.Control({
                x: 0.5,
                y: 0,
                cursorStyle: "pointer",
            }),
        };

        canvas.add(text);

        // Khi thoát chế độ chỉnh sửa
        text.on("editing:exited", () => {
            if (text.text?.trim() === "") {
                canvas.remove(text);
            } else {
                text.set({ width: text.getMinWidth(), lockScalingX: true });
            }
            canvas.requestRenderAll();
        });

        // Sự kiện nhấp chuột để vào chế độ chỉnh sửa
        text.on("mousedown", () => {
            text.selectAll();
            canvas.setActiveObject(text);
        });

        canvas.setActiveObject(text);
        canvas.requestRenderAll();
    };

    // Hàm xử lý thay đổi font
    const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newFont = event.target.value;
        setSelectedFont(newFont);
        const activeObject = canvas?.getActiveObject();
        if (activeObject && activeObject.type === "textbox") {
            activeObject.set({ fontFamily: newFont });
            (activeObject as fabric.Textbox).set({ width: (activeObject as fabric.Textbox).getMinWidth() });
            canvas?.requestRenderAll();
        }
    };

    // 🔹 Xóa đối tượng được chọn
    const deleteObject = () => {
        if (!canvas) return;
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.remove(activeObject);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            addImage(file);
        }
    };

    const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            addBackground(file);
        }
    };

    const addImage = (urlOrFile: string | File) => {
        if (!canvas) return;

        if (typeof urlOrFile === "string") {
            fabric.FabricImage.fromURL(urlOrFile, { crossOrigin: "anonymous" })
                .then((img) => {
                    img.set({
                        left: 150,
                        top: 150,
                        scaleX: 0.5,
                        scaleY: 0.5,
                    });
                    canvas.add(img);
                })
                .catch((err) => console.error("Error loading image:", err));
        } else {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imgElement = new Image();
                imgElement.src = e.target?.result as string;
                imgElement.onload = () => {
                    const img = new fabric.FabricImage(imgElement, {
                        left: 150,
                        top: 150,
                        scaleX: 0.5,
                        scaleY: 0.5,
                    });
                    canvas.add(img);
                };
            };
            reader.readAsDataURL(urlOrFile);
        }
    };

    // const addBackground = (file: File) => {
    //     if (!canvas) return;

    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //         const imgElement = new Image();
    //         imgElement.src = e.target?.result as string;
    //         imgElement.onload = () => {
    //             const img = new fabric.FabricImage(imgElement, {
    //                 left: 0,
    //                 top: 0,
    //                 selectable: false,
    //                 evented: false,
    //                 lockMovementX: true,
    //                 lockMovementY: true,
    //             });

    //             const canvasWidth = canvas.width!;
    //             const canvasHeight = canvas.height!;
    //             const imgWidth = imgElement.width;
    //             const imgHeight = imgElement.height;
    //             const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    //             img.scaleX = scale;
    //             img.scaleY = scale;

    //             canvas.backgroundImage = img;
    //         };
    //     };
    //     reader.readAsDataURL(file);
    // };

    const addBackground = (file: File) => {
        if (!canvas) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const imgElement = new Image();
            imgElement.src = e.target?.result as string;
            imgElement.onload = () => {
                const img = new fabric.FabricImage(imgElement, {
                    left: 0,
                    top: 0,
                    selectable: false, // Không thể chọn
                    evented: false, // Không tương tác được
                    lockMovementX: true, // Khóa di chuyển ngang
                    lockMovementY: true, // Khóa di chuyển dọc
                    hasControls: false, // Không hiển thị controls khi chọn (dù không thể chọn)
                    hasBorders: false, // Không hiển thị viền
                });

                // Đặt kích thước layer background bằng canvas
                const canvasWidth = canvas.width / 3 * 2;
                const canvasHeight = canvas.height / 3 * 2;
                const imgWidth = imgElement.width;
                const imgHeight = imgElement.height;
                const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
                img.scaleX = scale;
                img.scaleY = scale;
                img.width = canvasWidth;
                img.height = canvasHeight;

                // 🟢 Xóa layer cũ trước khi thêm layer mới
                const bgLayer = canvas.getObjects().find((obj) => 'name' in obj && obj.name === 'background-layer');
                if (bgLayer) {

                    canvas.remove(bgLayer);
                }

                // 🟢 Đặt tên layer để dễ quản lý
                img.set({ name: 'background-layer' });

                // Đặt layer này ở dưới cùng
                canvas.add(img);
                canvas.moveObjectTo(img, 0)
            };
        };
        reader.readAsDataURL(file);
    };

    const toggleDrawingMode = () => {
        if (!canvas) return;

        const newIsDrawing = !isDrawing;
        setIsDrawing(newIsDrawing);
        canvas.isDrawingMode = newIsDrawing;

        if (newIsDrawing) {
            if (!canvas.freeDrawingBrush) {
                canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
            }
            const brush = canvas.freeDrawingBrush;
            brush.width = 10;
            brush.color = "red";
        }
    };

    const handleZoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (!canvas) return;
        const zoomValue = Number(event.target.value) / 100;
        setZoomLevel(Number(event.target.value));
        canvas.setZoom(zoomValue);
    };

    const exportImage = () => {
        if (!canvas) return;

        try {
            const dataURL = canvas.toDataURL({
                format: "jpeg",
                quality: 1,
                multiplier: 1,
            });

            const link = document.createElement("a");
            link.href = dataURL;
            link.download = "canvas.jpeg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error exporting image:", error);
            alert("Có lỗi xảy ra khi xuất ảnh. Vui lòng thử lại!");
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4 bg-gray-100 min-h-screen">
            <div className="flex flex-wrap gap-2 bg-white p-4 shadow-md rounded-lg">
                <button
                    onClick={addRectangle}
                    className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                    🟦 Hình chữ nhật
                </button>
                <button
                    onClick={addCircle}
                    className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                    🔴 Hình tròn
                </button>
                <button
                    onClick={addText}
                    className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                    📝 Văn bản
                </button>
                <button
                    onClick={deleteObject}
                    className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                    🗑 Xóa
                </button>
                <button
                    onClick={toggleDrawingMode}
                    className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                    ✏ Vẽ
                </button>
                <select
                    value={zoomLevel}
                    onChange={handleZoomChange}
                    className="px-3 py-2 border rounded-lg"
                >
                    <option value="25">25%</option>
                    <option value="50">50%</option>
                    <option value="75">75%</option>
                    <option value="100">100%</option>
                </select>
                <select
                    value={selectedFont}
                    onChange={handleFontChange}
                    className="px-3 py-2 border rounded-lg"
                >
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Verdana">Verdana</option>
                </select>
                <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                    📷 Thêm ảnh
                    <input
                        type="file"
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                    />
                </label>
                <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                    🌄 Thêm nền
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleBackgroundUpload}
                        className="hidden"
                    />
                </label>
                <button
                    onClick={exportImage}
                    className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                    📷 Xuất ảnh
                </button>
            </div>
            <canvas
                ref={canvasRef}
                width={800}
                height={500}
                className="border border-gray-300 shadow-lg rounded-lg"
            />
        </div>
    );
};

export default Canvas;