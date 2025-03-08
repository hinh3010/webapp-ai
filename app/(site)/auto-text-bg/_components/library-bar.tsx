import React from 'react'

export default function LibraryBar() {
    return (
        <div className="bg-white">
            <div className="w-full max-w-xs mx-auto p-4">
                <div className="relative mb-4">
                    <input className="w-full p-2 pl-10 border border-gray-300 rounded-lg" placeholder="Search Canva apps" type="text" />
                    <i className="fas fa-search absolute left-3 top-3 text-gray-400">
                    </i>
                </div>
                <div className="flex mb-4">
                    <button className="flex-1 py-2 text-center text-purple-600 border-b-2 border-purple-600">
                        Discover
                    </button>
                    <button className="flex-1 py-2 text-center text-gray-600">
                        Your apps
                    </button>
                </div>
                <div className="flex mb-4">
                    <button className="flex-1 py-2 text-center text-white bg-purple-600 rounded-lg">
                        For you
                    </button>
                    <button className="flex-1 py-2 text-center text-gray-600">
                        AI-powered
                    </button>
                    <button className="flex-1 py-2 text-center text-gray-600">
                        Create something new
                    </button>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-2">
                        Featured
                    </h2>
                    <div className="relative">
                        <img alt="A stunning image of a castle on a floating island in the sky" className="w-full rounded-lg" height="200" src="https://storage.googleapis.com/a1aa/image/NOZqkpnRSY_gynCwixGwzippCC4WhWXD4NPFcuVvVdQ.jpg" width="300" />
                        <div className="absolute bottom-0 left-0 p-4">
                            <p className="text-white text-lg font-semibold">
                                Generate stunning images with any prompt
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center mt-2">
                        <img alt="AI Image Gen logo" className="w-10 h-10 rounded-full" height="40" src="https://storage.googleapis.com/a1aa/image/WaQ9aKGb1O3wOpIygr0Prmc5kNzPZoG6NeDAfxFfHhI.jpg" width="40" />
                        <div className="ml-2">
                            <p className="text-sm font-semibold">
                                AI Image Gen
                            </p>
                            <p className="text-xs text-gray-500">
                                Image generator
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-2">
                        Trending
                    </h2>
                    <div className="flex space-x-2">
                        <div className="relative w-1/2">
                            <img alt="A lighthouse with a sunset background" className="w-full rounded-lg" height="100" src="https://storage.googleapis.com/a1aa/image/JTnOuHdNAmqELtvimq5jiiFmFeT0CAdZYP6obvetOs0.jpg" width="150" />
                            <div className="absolute bottom-0 left-0 p-2 bg-purple-600 rounded-lg">
                                <p className="text-white text-sm">
                                    Merge photos seamlessly with Image Blender
                                </p>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full">
                                Haylie
                            </div>
                        </div>
                        <div className="relative w-1/2">
                            <img alt="A colorful abstract image" className="w-full rounded-lg" height="100" src="https://storage.googleapis.com/a1aa/image/ZN4WjoBUkknXDBiV5IwSs0jZ5NYpwpJlteKxgkXakbI.jpg" width="150" />
                            <div className="absolute bottom-0 left-0 p-2 bg-blue-400 rounded-lg">
                                <p className="text-white text-sm">
                                    Make your designs pop with Gen
                                </p>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-green-400 text-black text-xs px-2 py-1 rounded-full">
                                Omar
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-2">
                        More from Canva
                    </h2>
                    <div className="grid grid-cols-4 gap-2">
                        <div className="flex flex-col items-center">
                            <i className="fas fa-chart-bar text-2xl text-gray-600">
                            </i>
                            <p className="text-xs text-gray-600 mt-1">
                                Charts
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <i className="fas fa-image text-2xl text-gray-600">
                            </i>
                            <p className="text-xs text-gray-600 mt-1">
                                Photos
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <i className="fas fa-layer-group text-2xl text-gray-600">
                            </i>
                            <p className="text-xs text-gray-600 mt-1">
                                Bulk create
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <i className="fas fa-database text-2xl text-gray-600">
                            </i>
                            <p className="text-xs text-gray-600 mt-1">
                                Data autofill
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <i className="fas fa-music text-2xl text-gray-600">
                            </i>
                            <p className="text-xs text-gray-600 mt-1">
                                Audio
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <i className="fas fa-paint-brush text-2xl text-gray-600">
                            </i>
                            <p className="text-xs text-gray-600 mt-1">
                                Backgrounds
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <i className="fas fa-video text-2xl text-gray-600">
                            </i>
                            <p className="text-xs text-gray-600 mt-1">
                                Videos
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <i className="fas fa-language text-2xl text-gray-600">
                            </i>
                            <p className="text-xs text-gray-600 mt-1">
                                Translate
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <i className="fas fa-magic text-2xl text-gray-600">
                            </i>
                            <p className="text-xs text-gray-600 mt-1">
                                Magic Media
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <i className="fas fa-closed-captioning text-2xl text-gray-600">
                            </i>
                            <p className="text-xs text-gray-600 mt-1">
                                Captions
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-2">
                        Popular
                    </h2>
                    <div className="flex space-x-2">
                        <div className="w-1/3">
                            <img alt="Popular app 1" className="w-full rounded-lg" height="100" src="https://storage.googleapis.com/a1aa/image/2bnB-ex0pMY-jUPBK6q3DX-vinNcoGnvPBPKUEKnwXI.jpg" width="100" />
                        </div>
                        <div className="w-1/3">
                            <img alt="Popular app 2" className="w-full rounded-lg" height="100" src="https://storage.googleapis.com/a1aa/image/FUW4sDSPf50tYFAy79YxKVgukNt8nOZv7htZqq2NYF4.jpg" width="100" />
                        </div>
                        <div className="w-1/3">
                            <img alt="Popular app 3" className="w-full rounded-lg" height="100" src="https://storage.googleapis.com/a1aa/image/CmdpBsXXruqMauhPKtbsfEQglt2DqLw3nrAa9OxDv6M.jpg" width="100" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
