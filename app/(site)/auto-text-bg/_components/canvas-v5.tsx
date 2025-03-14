'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';

interface PixiAppProps {
    width?: number;
    height?: number;
    backgroundColor?: number;
}

const PixiApp: React.FC<PixiAppProps> = ({
    width = 800,
    height = 600,
    backgroundColor = 0x1099bb,
}) => {
    const pixiContainer = useRef<HTMLDivElement>(null);
    const [app, setApp] = useState<PIXI.Application | null>(null);

    useEffect(() => {
        // Tạo ứng dụng PIXI mới
        if (!pixiContainer.current || app) return;

        // Khởi tạo ứng dụng PIXI
        const pixiApp = new PIXI.Application({
            width,
            height,
            backgroundColor,
            antialias: true,
            resolution: window.devicePixelRatio || 1,
        });

        // Gắn canvas vào container
        pixiContainer.current.appendChild(pixiApp.canvas);
        setApp(pixiApp);

        // Thêm khung hình chính
        const stage = pixiApp.stage;

        // Khởi tạo sprite
        const createSprite = () => {
            // Tạo một sprite hình tròn
            const graphics = new PIXI.Graphics();
            graphics.beginFill(0xff0000);
            graphics.drawCircle(0, 0, 50);
            graphics.endFill();

            const texture = pixiApp.renderer.generateTexture(graphics);
            const sprite = new PIXI.Sprite(texture);

            // Đặt vị trí và các thuộc tính khác
            sprite.x = width / 2;
            sprite.y = height / 2;
            sprite.anchor.set(0.5);
            sprite.interactive = true;

            // Thêm tính năng tương tác
            sprite.on('pointerdown', () => {
                sprite.tint = Math.random() * 0xffffff;
                sprite.scale.x *= 1.1;
                sprite.scale.y *= 1.1;
            });

            return sprite;
        };

        // Tạo text
        const createText = () => {
            const textStyle = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 24,
                fill: 0xffffff,
                align: 'center',
            });

            const text = new PIXI.Text('Click vào hình tròn', textStyle);
            text.x = width / 2;
            text.y = 50;
            text.anchor.set(0.5, 0);

            return text;
        };

        // Thêm tương tác với bàn phím
        const setupKeyboardEvents = () => {
            // Sử dụng đối tượng để lưu trạng thái các phím
            const keys: { [key: string]: boolean } = {};

            window.addEventListener('keydown', (e) => {
                keys[e.key] = true;
            });

            window.addEventListener('keyup', (e) => {
                keys[e.key] = false;
            });

            return keys;
        };

        // Tạo một container để nhóm các sprites
        const container = new PIXI.Container();
        stage.addChild(container);

        // Thêm các sprites và text vào container
        const sprite = createSprite();
        const text = createText();
        container.addChild(sprite);
        container.addChild(text);

        // Thiết lập sự kiện bàn phím
        const keys = setupKeyboardEvents();

        // Tạo animation
        pixiApp.ticker.add(() => {
            // Hiệu ứng xoay
            sprite.rotation += 0.01;

            // Di chuyển sprite theo bàn phím
            if (keys['ArrowUp']) sprite.y -= 3;
            if (keys['ArrowDown']) sprite.y += 3;
            if (keys['ArrowLeft']) sprite.x -= 3;
            if (keys['ArrowRight']) sprite.x += 3;
        });

        // Tạo một particle system
        const createParticleSystem = () => {
            const particles = new PIXI.ParticleContainer(1000, {
                scale: true,
                position: true,
                rotation: true,
                uvs: true,
                alpha: true,
            });

            stage.addChild(particles);

            // Tạo texture cho particle
            const particleGraphics = new PIXI.Graphics();
            particleGraphics.beginFill(0xffffff);
            particleGraphics.drawCircle(0, 0, 5);
            particleGraphics.endFill();
            const particleTexture = pixiApp.renderer.generateTexture(particleGraphics);

            // Tạo mảng particles
            const particleArray: PIXI.Sprite[] = [];

            // Thêm một số particle
            for (let i = 0; i < 100; i++) {
                const particle = new PIXI.Sprite(particleTexture);
                particle.x = Math.random() * width;
                particle.y = Math.random() * height;
                particle.alpha = Math.random() * 0.5 + 0.5;
                particle.scale.set(Math.random() * 0.5 + 0.1);

                // Thêm vận tốc
                (particle as any).vx = Math.random() * 2 - 1;
                (particle as any).vy = Math.random() * 2 - 1;

                particles.addChild(particle);
                particleArray.push(particle);
            }

            // Cập nhật particles
            pixiApp.ticker.add(() => {
                for (const particle of particleArray) {
                    particle.x += (particle as any).vx;
                    particle.y += (particle as any).vy;

                    // Xử lý va chạm với biên
                    if (particle.x < 0 || particle.x > width) {
                        (particle as any).vx *= -1;
                    }

                    if (particle.y < 0 || particle.y > height) {
                        (particle as any).vy *= -1;
                    }

                    // Giảm dần alpha
                    particle.alpha -= 0.001;
                    if (particle.alpha <= 0) {
                        particle.alpha = Math.random() * 0.5 + 0.5;
                        particle.x = Math.random() * width;
                        particle.y = Math.random() * height;
                    }
                }
            });
        };

        createParticleSystem();

        // Xử lý thay đổi kích thước màn hình
        const handleResize = () => {
            pixiApp.renderer.resize(width, height);
            sprite.x = width / 2;
            sprite.y = height / 2;
            text.x = width / 2;
        };

        window.addEventListener('resize', handleResize);

        // Hàm dọn dẹp
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('keydown', () => { });
            window.removeEventListener('keyup', () => { });
            pixiApp.destroy(true, true);
        };
    }, [width, height, backgroundColor]);

    return (
        <div className="pixi-container" ref={pixiContainer}>
            {/* PIXI canvas sẽ được thêm vào đây */}
        </div>
    );
};

// Tạo một component bọc để thêm các điều khiển
const PixiAppWrapper: React.FC = () => {
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(600);
    const [backgroundColor, setBackgroundColor] = useState(0x1099bb);

    return (
        <div className="pixi-app-wrapper">
            <div className="controls" style={{ marginBottom: '10px' }}>
                <button onClick={() => setBackgroundColor(Math.random() * 0xffffff)}>
                    Đổi màu nền
                </button>
                <button onClick={() => {
                    setWidth(width + 50);
                    setHeight(height + 50);
                }}>
                    Tăng kích thước
                </button>
                <button onClick={() => {
                    setWidth(Math.max(400, width - 50));
                    setHeight(Math.max(300, height - 50));
                }}>
                    Giảm kích thước
                </button>
            </div>

            <PixiApp
                width={width}
                height={height}
                backgroundColor={backgroundColor}
            />
        </div>
    );
};

export default PixiAppWrapper;