import React from 'react'

export default function PageEditBar() {
    return (

        <div className="bg-gray-100">
            <div className="flex items-center justify-between p-4 bg-gray-100">
                <div className="flex items-center">
                    <span className="font-bold text-gray-800">Page 1</span>
                    <span className="text-gray-500 ml-2">- Add page title</span>
                </div>
                <div className="flex items-center space-x-4">
                    <i className="fas fa-eye text-gray-500"></i>
                    <i className="fas fa-copy text-gray-500"></i>
                    <i className="fas fa-trash text-gray-500"></i>
                    <i className="fas fa-share-alt text-gray-500"></i>
                </div>
            </div>
        </div>
    )
}
