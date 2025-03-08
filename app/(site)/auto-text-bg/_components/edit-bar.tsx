import React from 'react'

export default function EditBar() {
    return (
        <div className="bg-gray-100 p-4">
            <div className="flex items-center space-x-4 bg-white p-2 rounded-lg shadow-md">
                <i className="fas fa-sync-alt text-gray-600"></i>
                <i className="fas fa-trash text-gray-600"></i>
                <span className="text-gray-600">|</span>
                <i className="fas fa-edit text-gray-600"></i>
                <span className="text-gray-600">|</span>
                <span className="text-gray-600">BG Remover <i className="fas fa-smile text-yellow-500"></i></span>
                <span className="text-gray-600">|</span>
                <i className="fas fa-palette text-gray-600"></i>
                <span className="text-gray-600">|</span>
                <i className="fas fa-crop text-gray-600"></i>
                <span className="text-gray-600">Flip</span>
                <span className="text-gray-600">|</span>
                <i className="fas fa-th text-gray-600"></i>
                <span className="text-gray-600">5.0s</span>
                <span className="text-gray-600">|</span>
                <span className="text-gray-600">Position</span>
                <i className="fas fa-paint-roller text-gray-600"></i>
            </div>
        </div>
    )
}
