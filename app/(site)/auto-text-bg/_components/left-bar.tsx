import React from 'react'

export default function LeftBar() {
    return (
        <div className="bg-white">
            <div className="flex flex-col items-center py-4 space-y-4">
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex flex-col items-center space-y-2">
                        <i className="fas fa-th-large text-gray-600 text-2xl"></i>
                        <span className="text-gray-600 text-sm">Design</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <i className="fas fa-th text-gray-600 text-2xl"></i>
                        <span className="text-gray-600 text-sm">Elements</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <i className="fas fa-font text-gray-600 text-2xl"></i>
                        <span className="text-gray-600 text-sm">Text</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <i className="fas fa-crown text-gray-600 text-2xl"></i>
                        <span className="text-gray-600 text-sm">Brand</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <i className="fas fa-cloud-upload-alt text-gray-600 text-2xl"></i>
                        <span className="text-gray-600 text-sm">Uploads</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <i className="fas fa-pencil-alt text-gray-600 text-2xl"></i>
                        <span className="text-gray-600 text-sm">Draw</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <i className="fas fa-folder text-gray-600 text-2xl"></i>
                        <span className="text-gray-600 text-sm">Projects</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <div className="bg-blue-100 p-2 rounded">
                            <i className="fas fa-th-large text-blue-500 text-2xl"></i>
                        </div>
                        <span className="text-blue-500 text-sm">Apps</span>
                    </div>
                </div>
                <hr className="w-10 border-gray-300" />
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex flex-col items-center space-y-2">
                        <i className="fas fa-magic text-gray-600 text-2xl"></i>
                        <span className="text-gray-600 text-sm">Magic Media</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <i className="fas fa-layer-group text-gray-600 text-2xl"></i>
                        <span className="text-gray-600 text-sm">Bulk create</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <i className="fas fa-cube text-gray-600 text-2xl"></i>
                        <span className="text-gray-600 text-sm">Easy Mockup</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <i className="fas fa-file-alt text-gray-600 text-2xl"></i>
                        <span className="text-gray-600 text-sm">Mockups</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <i className="fas fa-desktop text-gray-600 text-2xl"></i>
                        <span className="text-gray-600 text-sm">Screen</span>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="bg-blue-500 p-4 rounded-full">
                        <i className="fas fa-magic text-white text-2xl"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
