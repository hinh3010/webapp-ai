import { useEffect, useRef, useState } from 'react';
import { Application, Assets, Sprite, Text, SCALE_MODES, TextStyle, FillGradient, Color } from 'pixi.js';

const PixiApp = () => {
    const pixiContainer = useRef<HTMLDivElement>(null);
    const [app, setApp] = useState<Application | null>(null);

    useEffect(() => {
        (async () => {
            if (!pixiContainer.current) return;

            // Khởi tạo ứng dụng Pixi.js
            const newApp = new Application();
            await newApp.init({ background: '#1099bb', resizeTo: window });

            // Thêm canvas vào container
            pixiContainer.current.appendChild(newApp.canvas as HTMLCanvasElement);
            setApp(newApp);

            // Tải texture bunny
            const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
            texture.baseTexture.scaleMode = SCALE_MODES.NEAREST; // Giữ pixelation

            // Tạo sprite bunny
            const newBunny = new Sprite(texture);
            newBunny.anchor.set(0.5);
            newBunny.x = newApp.screen.width / 2;
            newBunny.y = newApp.screen.height / 2;
            newBunny.scale.set(3); // Phóng to bunny

            // Kích hoạt tính năng tương tác
            newBunny.eventMode = 'static';
            newBunny.cursor = 'pointer';

            // Gắn sự kiện kéo
            newBunny.on('pointerdown', onDragStart, newBunny);

            // Thêm bunny vào stage
            newApp.stage.addChild(newBunny);

            // Thiết lập stage để nhận sự kiện
            newApp.stage.eventMode = 'static';
            newApp.stage.hitArea = newApp.screen;
            newApp.stage.on('pointerup', onDragEnd);
            newApp.stage.on('pointerupoutside', onDragEnd);

            // Biến theo dõi đối tượng đang kéo
            let dragTarget: Sprite | null = null;

            // Hàm xử lý di chuyển khi kéo
            function onDragMove(event: any) {
                if (dragTarget) {
                    dragTarget.parent.toLocal(event.global, null, dragTarget.position);
                }
            }

            // Hàm bắt đầu kéo
            function onDragStart(this: Sprite) {
                this.alpha = 0.5; // Giảm độ mờ khi kéo
                dragTarget = this;
                newApp.stage.on('pointermove', onDragMove);
            }

            // Hàm kết thúc kéo
            function onDragEnd() {
                if (dragTarget) {
                    newApp.stage.off('pointermove', onDragMove);
                    dragTarget.alpha = 1; // Khôi phục độ mờ
                    dragTarget = null;
                }
            }

            // Thêm ticker để xoay bunny khi không kéo
            newApp.ticker.add(() => {
                if (!dragTarget) {
                    newBunny.rotation += 0.01; // Chỉ xoay khi không kéo
                }
            });
        })();
    }, []);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!app) return;
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                const dataUrl = reader.result as string;
                const texture = await Assets.load(dataUrl);
                const sprite = new Sprite(texture);

                sprite.anchor.set(0.5);
                sprite.x = app.screen.width / 2;
                sprite.y = app.screen.height / 2;
                sprite.eventMode = 'static'; // Kích hoạt kéo cho sprite mới
                sprite.cursor = 'pointer';

                // Biến theo dõi đối tượng đang kéo, chỉ áp dụng cho sprite này
                let dragTarget: Sprite | null = null;

                // Hàm xử lý di chuyển khi kéo
                const onDragMove = (event: any) => {
                    if (dragTarget) {
                        dragTarget.parent.toLocal(event.global, null, dragTarget.position);
                    }
                };

                // Hàm bắt đầu kéo
                const onDragStart = function (this: Sprite) {
                    this.alpha = 0.5; // Giảm độ mờ khi kéo
                    dragTarget = this;
                    app.stage.on('pointermove', onDragMove);
                };

                // Hàm kết thúc kéo
                const onDragEnd = () => {
                    if (dragTarget) {
                        app.stage.off('pointermove', onDragMove);
                        dragTarget.alpha = 1; // Khôi phục độ mờ
                        dragTarget = null;
                    }
                };

                // Gắn sự kiện cho sprite
                sprite.on('pointerdown', onDragStart, sprite);

                // Gắn sự kiện pointerup và pointerupoutside cho stage chỉ một lần cho sprite này
                sprite.on('pointerup', onDragEnd);
                sprite.on('pointerupoutside', onDragEnd);

                app.stage.addChild(sprite);
            };
            reader.readAsDataURL(file);
        }
    };
    // const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (!app) return;
    //     const file = event.target.files?.[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = async () => {
    //             const dataUrl = reader.result as string;
    //             const texture = await Assets.load(dataUrl);
    //             const sprite = new Sprite(texture);
    //             sprite.anchor.set(0.5);
    //             sprite.x = app.screen.width / 2;
    //             sprite.y = app.screen.height / 2;
    //             sprite.eventMode = 'static'; // Kích hoạt kéo cho sprite mới
    //             sprite.cursor = 'pointer';
    //             sprite.on('pointerdown', onDragStart, sprite); // Thêm sự kiện kéo
    //             app.stage.addChild(sprite);
    //         };
    //         reader.readAsDataURL(file);
    //     }

    //     app.stage.on('pointerup', onDragEnd);
    //     app.stage.on('pointerupoutside', onDragEnd);

    //     // Biến theo dõi đối tượng đang kéo
    //     let dragTarget: Sprite | null = null;

    //     // Hàm xử lý di chuyển khi kéo
    //     function onDragMove(event: any) {
    //         if (dragTarget) {
    //             dragTarget.parent.toLocal(event.global, null, dragTarget.position);
    //         }
    //     }

    //     // Hàm bắt đầu kéo
    //     function onDragStart(this: Sprite) {
    //         this.alpha = 0.5; // Giảm độ mờ khi kéo
    //         dragTarget = this;
    //         app.stage.on('pointermove', onDragMove);
    //     }

    //     // Hàm kết thúc kéo
    //     function onDragEnd() {
    //         if (dragTarget) {
    //             app.stage.off('pointermove', onDragMove);
    //             dragTarget.alpha = 1; // Khôi phục độ mờ
    //             dragTarget = null;
    //         }
    //     }
    // };

    const handleBackgroundUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!app) return;
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                const dataUrl = reader.result as string;
                const texture = await Assets.load(dataUrl);
                const backgroundSprite = new Sprite(texture);
                backgroundSprite.width = app.screen.width;
                backgroundSprite.height = app.screen.height;
                backgroundSprite.x = 0;
                backgroundSprite.y = 0;

                app.stage.children.forEach(child => {
                    if (child !== app.stage.children[app.stage.children.length - 1]) {
                        child.destroy();
                    }
                });
                app.stage.addChildAt(backgroundSprite, 0);
            };
            reader.readAsDataURL(file);
        }
    };

    const changeBackgroundColor = (color: string) => {
        if (app) {
            app.renderer.background.color = parseInt(color.replace('#', '0x'), 16);
        }
    };

    const [textStyle, setTextStyle] = useState<string>('basic'); // Trạng thái để theo dõi kiểu text

    // Các kiểu text từ ví dụ Pixi.js
    const textStyles = {
        basic: new TextStyle({
            fontSize: 36,
            fill: '#ffffff',
        }),
        rich: (() => {
            const fill = new FillGradient(0, 0, 0, 10);
            const colors = [0xffffff, 0x00ff99].map((color) => Color.shared.setValue(color).toNumber());
            colors.forEach((number, index) => {
                const ratio = index / colors.length;
                fill.addColorStop(ratio, number);
            });
            return new TextStyle({
                fontFamily: 'Arial',
                fontSize: 36,
                fontStyle: 'italic',
                fontWeight: 'bold',
                fill: { fill },
                stroke: { color: '#4a1850', width: 5, join: 'round' },
                dropShadow: {
                    color: '#000000',
                    blur: 4,
                    angle: Math.PI / 6,
                    distance: 6,
                },
                wordWrap: true,
                wordWrapWidth: 440,
            });
        })(),
        skew: new TextStyle({
            fontFamily: 'Arial',
            dropShadow: {
                alpha: 0.8,
                angle: 2.1,
                blur: 4,
                color: '0x111111',
                distance: 10,
            },
            fill: '#ffffff',
            stroke: { color: '#004620', width: 12, join: 'round' },
            fontSize: 60,
            fontWeight: 'lighter',
        }),
    };

    const handleAddText = () => {
        if (!app) return;

        const selectedStyle = textStyles[textStyle as keyof typeof textStyles];
        const text = new Text({
            text: "Click to edit",
            style: selectedStyle,
        });

        text.anchor.set(0.5);
        text.x = app.screen.width / 2;
        text.y = app.screen.height / 2;
        text.eventMode = 'static';
        text.cursor = 'pointer';

        // Áp dụng thêm thuộc tính skew nếu là kiểu "skew"
        if (textStyle === 'skew') {
            text.skew.set(0.65, -0.3);
            text.anchor.set(0.5, 0.5);
        }

        // Sự kiện chỉnh sửa text (tùy chọn, hiện đang bị comment)
        text.on("pointerdown", () => {
            const newText = prompt("Enter new text:", text.text);
            if (newText !== null) {
                text.text = newText;
            }
        });

        app.stage.addChild(text);
    };

    return (
        <div className="w-full h-full relative">
            <div ref={pixiContainer} className="w-full h-full" />
            <div className="absolute top-4 left-4 flex gap-4">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="upload" />
                <label htmlFor="upload" className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">Upload Image</label>

                <input type="file" accept="image/*" onChange={handleBackgroundUpload} className="hidden" id="upload-bg" />
                <label htmlFor="upload-bg" className="px-4 py-2 bg-purple-500 text-white rounded cursor-pointer">Upload Background</label>

                <button onClick={handleAddText} className="px-4 py-2 bg-yellow-500 text-white rounded">Add Text</button>
                <select
                    value={textStyle}
                    onChange={(e) => setTextStyle(e.target.value)}
                    className="px-4 py-2 bg-gray-200 rounded"
                >
                    <option value="basic">Basic</option>
                    <option value="rich">Rich</option>
                    <option value="skew">Skew</option>
                </select>

                <button onClick={() => changeBackgroundColor('#ff0000')} className="px-4 py-2 bg-red-500 text-white rounded">Red Background</button>
                <button onClick={() => changeBackgroundColor('#00ff00')} className="px-4 py-2 bg-green-500 text-white rounded">Green Background</button>
            </div>
        </div>
    );
};

export default PixiApp;