import React from 'react'

export default function LeftBarV2() {
    return (

        <div className="bg-white font-sans">
            <div className="flex h-screen">
                <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
                    <div className="mb-4">
                        <input type="text" placeholder="Search Canva apps" className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <nav>
                        <ul>
                            <li className="mb-4">
                                <a href="#" className="flex items-center text-gray-700 hover:text-blue-500">
                                    <i className="fas fa-paint-brush mr-2"></i>
                                    Design
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="flex items-center text-gray-700 hover:text-blue-500">
                                    <i className="fas fa-shapes mr-2"></i>
                                    Elements
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="flex items-center text-gray-700 hover:text-blue-500">
                                    <i className="fas fa-font mr-2"></i>
                                    Text
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="flex items-center text-gray-700 hover:text-blue-500">
                                    <i className="fas fa-crown mr-2"></i>
                                    Brand
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="flex items-center text-gray-700 hover:text-blue-500">
                                    <i className="fas fa-upload mr-2"></i>
                                    Uploads
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="flex items-center text-gray-700 hover:text-blue-500">
                                    <i className="fas fa-pencil-alt mr-2"></i>
                                    Draw
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="flex items-center text-gray-700 hover:text-blue-500">
                                    <i className="fas fa-folder mr-2"></i>
                                    Projects
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="flex items-center text-gray-700 hover:text-blue-500">
                                    <i className="fas fa-th-large mr-2"></i>
                                    Apps
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="flex items-center text-gray-700 hover:text-blue-500">
                                    <i className="fas fa-magic mr-2"></i>
                                    Magic Media
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="flex items-center text-gray-700 hover:text-blue-500">
                                    <i className="fas fa-layer-group mr-2"></i>
                                    Bulk create
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="flex items-center text-gray-700 hover:text-blue-500">
                                    <i className="fas fa-copy mr-2"></i>
                                    Easy Mockup
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="flex items-center text-gray-700 hover:text-blue-500">
                                    <i className="fas fa-images mr-2"></i>
                                    Mockups
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="flex items-center text-gray-700 hover:text-blue-500">
                                    <i className="fas fa-desktop mr-2"></i>
                                    Screen
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold mb-2">Discover</h2>
                        <div className="flex space-x-2 mb-4">
                            <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded">For you</button>
                            <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded">AI-powered</button>
                            <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded">Create something new</button>
                        </div>
                        <h3 className="text-md font-semibold mb-2">Featured</h3>
                        <div className="mb-4">
                            <div className="relative">
                                <img src="https://placehold.co/300x150" alt="A castle on a floating island in the sky with clouds around it" className="w-full rounded" />
                                <div className="absolute bottom-2 left-2 bg-white p-1 rounded text-xs">AI Image Gen</div>
                            </div>
                            <p className="mt-2 text-sm text-gray-700">Generate stunning images with any prompt</p>
                        </div>
                        <h3 className="text-md font-semibold mb-2">Trending</h3>
                        <div className="mb-4">
                            <div className="relative">
                                <img src="https://placehold.co/300x150" alt="A lighthouse on a coast with a sunset in the background" className="w-full rounded" />
                                <div className="absolute bottom-2 left-2 bg-yellow-400 p-1 rounded text-xs">Haylie</div>
                            </div>
                            <p className="mt-2 text-sm text-gray-700">Merge photos seamlessly with Image Blender</p>
                        </div>
                        <div className="mb-4">
                            <div className="relative">
                                <img src="https://placehold.co/300x150" alt="A colorful abstract design with various shapes" className="w-full rounded" />
                                <div className="absolute bottom-2 left-2 bg-green-400 p-1 rounded text-xs">Omar</div>
                            </div>
                            <p className="mt-2 text-sm text-gray-700">Make your designs pop with Gen</p>
                        </div>
                        <h3 className="text-md font-semibold mb-2">More from Canva</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-center">
                                <i className="fas fa-chart-bar text-2xl mb-2"></i>
                                <span className="text-sm">Charts</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <i className="fas fa-image text-2xl mb-2"></i>
                                <span className="text-sm">Photos</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <i className="fas fa-layer-group text-2xl mb-2"></i>
                                <span className="text-sm">Bulk create</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <i className="fas fa-database text-2xl mb-2"></i>
                                <span className="text-sm">Data autofill</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <i className="fas fa-music text-2xl mb-2"></i>
                                <span className="text-sm">Audio</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <i className="fas fa-image text-2xl mb-2"></i>
                                <span className="text-sm">Backgrounds</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <i className="fas fa-video text-2xl mb-2"></i>
                                <span className="text-sm">Videos</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <i className="fas fa-language text-2xl mb-2"></i>
                                <span className="text-sm">Translate</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <i className="fas fa-magic text-2xl mb-2"></i>
                                <span className="text-sm">Magic Media</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <i className="fas fa-closed-captioning text-2xl mb-2"></i>
                                <span className="text-sm">Captions</span>
                            </div>
                        </div>
                        <h3 className="text-md font-semibold mt-4">Popular</h3>
                        <div className="mt-2">
                            <img src="https://placehold.co/300x150" alt="Popular item image" className="w-full rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
