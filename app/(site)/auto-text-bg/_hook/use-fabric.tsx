'use client'

import fabric from 'fabric';
import { useEffect, useRef } from 'react';

interface UseFabricCanvasOptions {
    width?: number;
    height?: number;
    backgroundColor?: string;
    isDrawingMode?: boolean;
}

interface UseFabricCanvasResult {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    fabricCanvas: fabric.Canvas | null;
    setDrawingMode: (isDrawing: boolean) => void;
    setBrushColor: (color: string) => void;
    setBrushWidth: (width: number) => void;
    addRect: (options: unknown) => void;
    addCircle: (options: unknown) => void;
    addText: (text: string, options: unknown) => void;
    clearCanvas: () => void;
    deleteSelected: () => void;
    saveToImage: (format?: string, quality?: number) => void;
}

export function useFabricCanvas(options: UseFabricCanvasOptions = {}): UseFabricCanvasResult {
    const {
        width = 800,
        height = 600,
        backgroundColor = '#ffffff',
        isDrawingMode = false
    } = options

    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const fabricRef = useRef<fabric.Canvas | null>(null)

    useEffect(() => {
        if (typeof window !== 'undefined' && canvasRef.current && !fabricRef.current) {
            // Khởi tạo canvas
            fabricRef.current = new fabric.Canvas(canvasRef.current, {
                width,
                height,
                backgroundColor,
                isDrawingMode
            })
        }

        return () => {
            if (fabricRef.current) {
                fabricRef.current.dispose()
                fabricRef.current = null
            }
        }
    }, [backgroundColor, height, isDrawingMode, width])

    const setDrawingMode = (isDrawing: boolean): void => {
        if (fabricRef.current) {
            fabricRef.current.isDrawingMode = isDrawing
        }
    }

    const setBrushColor = (color: string): void => {
        if (fabricRef.current && fabricRef.current.freeDrawingBrush) {
            fabricRef.current.freeDrawingBrush.color = color
        }
    }

    const setBrushWidth = (width: number): void => {
        if (fabricRef.current && fabricRef.current.freeDrawingBrush) {
            fabricRef.current.freeDrawingBrush.width = width
        }
    }

    const addRect = (options = {}): void => {
        if (fabricRef.current) {
            const defaultOptions = {
                left: 100,
                top: 100,
                fill: '#ff0000',
                width: 100,
                height: 100,
                strokeWidth: 2,
                stroke: '#000000'
            }

            const rect = new fabric.Rect({
                ...defaultOptions,
                ...options
            })

            fabricRef.current.add(rect)
            fabricRef.current.setActiveObject(rect)
        }
    }

    const addCircle = (options = {}): void => {
        if (fabricRef.current) {
            const defaultOptions = {
                left: 200,
                top: 200,
                fill: '#00ff00',
                radius: 50,
                strokeWidth: 2,
                stroke: '#000000'
            }

            const circle = new fabric.Circle({
                ...defaultOptions,
                ...options
            })

            fabricRef.current.add(circle)
            fabricRef.current.setActiveObject(circle)
        }
    }

    const addText = (text: string = 'Text', options = {}): void => {
        if (fabricRef.current) {
            const defaultOptions = {
                left: 200,
                top: 100,
                fill: '#000000',
                fontFamily: 'Arial',
                fontSize: 20
            }

            const textObj = new fabric.IText(text, {
                ...defaultOptions,
                ...options
            })

            fabricRef.current.add(textObj)
            fabricRef.current.setActiveObject(textObj)
        }
    }

    const clearCanvas = (): void => {
        if (fabricRef.current) {
            fabricRef.current.clear()
            fabricRef.current.setBackgroundColor(backgroundColor, () => {
                fabricRef.current?.renderAll()
            })
        }
    }

    const deleteSelected = (): void => {
        if (fabricRef.current) {
            const activeObjects = fabricRef.current.getActiveObjects()
            if (activeObjects.length) {
                activeObjects.forEach(obj => {
                    fabricRef.current?.remove(obj)
                })
                fabricRef.current.discardActiveObject()
                fabricRef.current.renderAll()
            }
        }
    }

    const saveToImage = (format: string = 'png', quality: number = 1): void => {
        if (fabricRef.current) {
            const dataURL = fabricRef.current.toDataURL({
                format,
                quality
            })

            const link = document.createElement('a')
            link.href = dataURL
            link.download = `canvas-drawing.${format}`
            link.click()
        }
    }

    return {
        canvasRef,
        fabricCanvas: fabricRef.current,
        setDrawingMode,
        setBrushColor,
        setBrushWidth,
        addRect,
        addCircle,
        addText,
        clearCanvas,
        deleteSelected,
        saveToImage
    }
}