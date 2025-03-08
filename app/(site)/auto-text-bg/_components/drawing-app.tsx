'use client'

import { useState } from 'react'
import { useFabricCanvas } from '../_hook/use-fabric'

type DrawingMode = 'pencil' | 'select';

export default function EnhancedDrawingApp() {
    const [mode, setMode] = useState<DrawingMode>('pencil')
    const [color, setColor] = useState<string>('#000000')
    const [brushSize, setBrushSize] = useState<number>(5)

    const {
        canvasRef,
        setDrawingMode,
        setBrushColor,
        setBrushWidth,
        addRect,
        addCircle,
        addText,
        clearCanvas,
        deleteSelected,
        saveToImage
    } = useFabricCanvas({
        width: 800,
        height: 600,
        backgroundColor: '#ffffff',
        isDrawingMode: true
    })

    // Xử lý thay đổi chế độ
    const handleModeChange = (newMode: DrawingMode): void => {
        setMode(newMode)
        setDrawingMode(newMode === 'pencil')
    }

    // Xử lý thay đổi màu sắc
    const handleColorChange = (newColor: string): void => {
        setColor(newColor)
        setBrushColor(newColor)
    }

    // Xử lý thay đổi kích thước bút
    const handleBrushSizeChange = (newSize: number): void => {
        setBrushSize(newSize)
        setBrushWidth(newSize)
    }

    // Thêm hình chữ nhật với màu hiện tại
    const handleAddRect = (): void => {
        addRect({ fill: color })
    }

    // Thêm hình tròn với màu hiện tại
    const handleAddCircle = (): void => {
        addCircle({ fill: color })
    }

    // Thêm văn bản với màu hiện tại
    const handleAddText = (): void => {
        addText('Nhập văn bản', { fill: color })
    }

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Ứng dụng vẽ với Fabric.js Hooks & TypeScript</h2>

                <div className="flex gap-4 mb-4">
                    <div className="space-y-2">
                        <div className="font-medium">Chế độ:</div>
                        <div className="flex gap-2">
                            <button
                                className={`px-3 py-1 rounded ${mode === 'pencil' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                                onClick={() => handleModeChange('pencil')}
                            >
                                Bút vẽ
                            </button>
                            <button
                                className={`px-3 py-1 rounded ${mode === 'select' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                                onClick={() => handleModeChange('select')}
                            >
                                Chọn
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="font-medium">Màu sắc:</div>
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => handleColorChange(e.target.value)}
                            className="h-8 w-16"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="font-medium">Kích thước bút:</div>
                        <input
                            type="range"
                            min="1"
                            max="30"
                            value={brushSize}
                            onChange={(e) => handleBrushSizeChange(parseInt(e.target.value))}
                            className="w-32"
                        />
                        <span className="ml-2">{brushSize}px</span>
                    </div>
                </div>

                <div className="flex gap-2 mb-4 flex-wrap">
                    <button
                        className="px-3 py-1 bg-indigo-600 text-white rounded"
                        onClick={handleAddRect}
                    >
                        Thêm hình chữ nhật
                    </button>
                    <button
                        className="px-3 py-1 bg-indigo-600 text-white rounded"
                        onClick={handleAddCircle}
                    >
                        Thêm hình tròn
                    </button>
                    <button
                        className="px-3 py-1 bg-indigo-600 text-white rounded"
                        onClick={handleAddText}
                    >
                        Thêm văn bản
                    </button>
                    <button
                        className="px-3 py-1 bg-red-600 text-white rounded"
                        onClick={deleteSelected}
                    >
                        Xóa đã chọn
                    </button>
                    <button
                        className="px-3 py-1 bg-red-600 text-white rounded"
                        onClick={clearCanvas}
                    >
                        Xóa tất cả
                    </button>
                    <button
                        className="px-3 py-1 bg-green-600 text-white rounded"
                        onClick={() => saveToImage('png', 1)}
                    >
                        Lưu ảnh
                    </button>
                </div>
            </div>

            <div className="border border-gray-300 rounded">
                <canvas ref={canvasRef} className="border border-gray-300" />
            </div>
        </div>
    )
}