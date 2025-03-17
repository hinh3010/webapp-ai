"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Application, Assets, Sprite, Text, SCALE_MODES, TextStyle, FillGradient, Color } from "pixi.js";

type TextStyleType = "basic" | "rich" | "skew";

// Utility function để gắn drag logic vào sprite
const attachDrag = (app: Application, sprite: Sprite) => {
    let dragTarget: Sprite | null = null;

    const onDragMove = (event: any) => {
        if (dragTarget) {
            dragTarget.parent.toLocal(event.global, null, dragTarget.position);
        }
    };

    const onDragStart = function (this: Sprite) {
        this.alpha = 0.5;
        dragTarget = this;
        app.stage.on("pointermove", onDragMove);
    };

    const onDragEnd = () => {
        if (dragTarget) {
            app.stage.off("pointermove", onDragMove);
            dragTarget.alpha = 1;
            dragTarget = null;
        }
    };

    sprite.eventMode = "static";
    sprite.cursor = "pointer";
    sprite.on("pointerdown", onDragStart, sprite);
    sprite.on("pointerup", onDragEnd);
    sprite.on("pointerupoutside", onDragEnd);
};

// Custom hook để quản lý Pixi Application
const usePixiApp = (containerRef: React.RefObject<HTMLDivElement>) => {
    const [app, setApp] = useState<Application | null>(null);

    useEffect(() => {
        let mounted = true;

        (async () => {
            if (!containerRef.current || !mounted) return;

            const newApp = new Application();
            await newApp.init({ background: "#1099bb", resizeTo: window });
            containerRef.current.appendChild(newApp.canvas as HTMLCanvasElement);

            if (mounted) setApp(newApp);

            return () => {
                mounted = false;
                newApp.destroy(true, { children: true });
            };
        })();

        return () => {
            mounted = false;
        };
    }, [containerRef]);

    return app;
};

const PixiApp = () => {
    const pixiContainer = useRef<HTMLDivElement>(null);
    const app = usePixiApp(pixiContainer);
    const [textStyles, setTextStyles] = useState<Record<TextStyleType, TextStyle> | null>(null);
    const [textStyle, setTextStyle] = useState<TextStyleType>("basic");

    // Khởi tạo text styles và bunny
    useEffect(() => {
        if (!app) return;

        (async () => {
            const initializedTextStyles: Record<TextStyleType, TextStyle> = {
                basic: new TextStyle({ fontSize: 36, fill: "#ffffff" }),
                rich: (() => {
                    const fill = new FillGradient(0, 0, 0, 10);
                    [0xffffff, 0x00ff99].forEach((color, index) => {
                        fill.addColorStop(index / 1, Color.shared.setValue(color).toNumber());
                    });
                    return new TextStyle({
                        fontFamily: "Arial",
                        fontSize: 36,
                        fontStyle: "italic",
                        fontWeight: "bold",
                        fill: { fill },
                        stroke: { color: "#4a1850", width: 5, join: "round" },
                        dropShadow: { color: "#000000", blur: 4, angle: Math.PI / 6, distance: 6 },
                        wordWrap: true,
                        wordWrapWidth: 440,
                    });
                })(),
                skew: new TextStyle({
                    fontFamily: "Arial",
                    dropShadow: { alpha: 0.8, angle: 2.1, blur: 4, color: "0x111111", distance: 10 },
                    fill: "#ffffff",
                    stroke: { color: "#004620", width: 12, join: "round" },
                    fontSize: 60,
                    fontWeight: "lighter",
                }),
            };
            setTextStyles(initializedTextStyles);

            const texture = await Assets.load("https://pixijs.com/assets/bunny.png");
            texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

            const bunny = new Sprite(texture);
            bunny.anchor.set(0.5);
            bunny.scale.set(3);
            bunny.x = app.screen.width / 2;
            bunny.y = app.screen.height / 2;

            app.stage.eventMode = "static";
            app.stage.hitArea = app.screen;
            app.stage.addChild(bunny);

            attachDrag(app, bunny);

            app.ticker.add(() => {
                if (!bunny.listeners("pointermove").length) bunny.rotation += 0.01;
            });
        })();
    }, [app]);

    // Xử lý upload ảnh
    const handleImageUpload = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            if (!app || !event.target.files?.[0]) return;

            const file = event.target.files[0];
            const dataUrl = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
            });

            const texture = await Assets.load(dataUrl);
            const sprite = new Sprite(texture);
            sprite.anchor.set(0.5);
            sprite.x = app.screen.width / 2;
            sprite.y = app.screen.height / 2;

            app.stage.addChild(sprite);
            attachDrag(app, sprite);
        },
        [app]
    );

    // Xử lý upload background
    const handleBackgroundUpload = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            if (!app || !event.target.files?.[0]) return;

            const file = event.target.files[0];
            const dataUrl = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
            });

            const texture = await Assets.load(dataUrl);
            const backgroundSprite = new Sprite(texture);
            backgroundSprite.width = app.screen.width;
            backgroundSprite.height = app.screen.height;
            backgroundSprite.position.set(0, 0);

            app.stage.removeChildren(0, app.stage.children.length - 1);
            app.stage.addChildAt(backgroundSprite, 0);
        },
        [app]
    );

    // Thay đổi màu nền
    const changeBackgroundColor = useCallback(
        (color: string) => {
            if (app) app.renderer.background.color = parseInt(color.replace("#", "0x"), 16);
        },
        [app]
    );

    // Thêm text
    const handleAddText = useCallback(() => {
        if (!app || !textStyles) return;

        const text = new Text({
            text: "Click to edit",
            style: textStyles[textStyle],
        });
        text.anchor.set(0.5);
        text.x = app.screen.width / 2;
        text.y = app.screen.height / 2;
        if (textStyle === "skew") text.skew.set(0.65, -0.3);

        app.stage.addChild(text);
        attachDrag(app, text);
    }, [app, textStyles, textStyle]);

    return (
        <div className="relative w-full h-full">
            <div ref={pixiContainer} className="w-full h-full" />
            <div className="absolute top-4 left-4 flex gap-4">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="upload" />
                <label htmlFor="upload" className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white">
                    Upload Image
                </label>

                <input type="file" accept="image/*" onChange={handleBackgroundUpload} className="hidden" id="upload-bg" />
                <label htmlFor="upload-bg" className="cursor-pointer rounded bg-purple-500 px-4 py-2 text-white">
                    Upload Background
                </label>

                <button onClick={handleAddText} className="rounded bg-yellow-500 px-4 py-2 text-white">
                    Add Text
                </button>

                <select
                    value={textStyle}
                    onChange={(e) => setTextStyle(e.target.value as TextStyleType)}
                    className="rounded bg-gray-200 px-4 py-2"
                >
                    <option value="basic">Basic</option>
                    <option value="rich">Rich</option>
                    <option value="skew">Skew</option>
                </select>

                <button onClick={() => changeBackgroundColor("#ff0000")} className="rounded bg-red-500 px-4 py-2 text-white">
                    Red Background
                </button>
                <button onClick={() => changeBackgroundColor("#00ff00")} className="rounded bg-green-500 px-4 py-2 text-white">
                    Green Background
                </button>
            </div>
        </div>
    );
};

export default PixiApp;