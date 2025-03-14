import { useEffect, useRef, useState } from 'react';
import { Application, Assets, Sprite } from 'pixi.js';

const PixiApp = () => {
    const pixiContainer = useRef<HTMLDivElement>(null);
    const [app, setApp] = useState<Application | null>(null);
    const [bunny, setBunny] = useState<Sprite | null>(null);

    useEffect(() => {
        (async () => {
            if (!pixiContainer.current) return;

            const newApp = new Application();
            await newApp.init({ background: '#1099bb', resizeTo: window });

            pixiContainer.current.appendChild(newApp.canvas as HTMLCanvasElement);
            setApp(newApp);

            const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
            const newBunny = new Sprite(texture);
            newBunny.anchor.set(0.5);
            newBunny.x = newApp.screen.width / 2;
            newBunny.y = newApp.screen.height / 2;
            newApp.stage.addChild(newBunny);
            setBunny(newBunny);

            newApp.ticker.add(() => {
                newBunny.rotation += 0.01;
            });
        })();
    }, []);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!app) return;
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            const texture = await Assets.load(url);
            app.stage.children.forEach(child => child !== bunny && child.destroy());
            const sprite = new Sprite(texture);
            sprite.anchor.set(0.5);
            sprite.x = app.screen.width / 2;
            sprite.y = app.screen.height / 2;
            app.stage.addChild(sprite);
        }
    };

    const changeBackgroundColor = (color: string) => {
        if (app) {
            app.renderer.background.color = parseInt(color.replace('#', '0x'), 16);
        }
    };

    return (
        <div className="w-full h-full relative">
            <div ref={pixiContainer} className="w-full h-full" />
            <div className="absolute top-4 left-4 flex gap-4">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="upload" />
                <label htmlFor="upload" className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">Upload Image</label>
                <button onClick={() => changeBackgroundColor('#ff0000')} className="px-4 py-2 bg-red-500 text-white rounded">Red Background</button>
                <button onClick={() => changeBackgroundColor('#00ff00')} className="px-4 py-2 bg-green-500 text-white rounded">Green Background</button>
            </div>
        </div>
    );
};

export default PixiApp;
