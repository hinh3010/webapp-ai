import React from 'react'

export default function PageEditBarV2() {
    return (
        <body className="bg-gray-100">
            <div className="flex items-center justify-between p-2 bg-white shadow-md">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                        <i className="fas fa-bars text-lg"></i>
                        <span className="text-sm font-semibold">Notes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <i className="fas fa-stopwatch text-lg"></i>
                        <span className="text-sm font-semibold">Timer</span>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                        <span className="text-sm font-semibold">Page 1 / 10</span>
                        <input type="range" min="1" max="10" value="1" className="w-24 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer" />
                    </div>
                    <span className="text-sm font-semibold">55%</span>
                    <i className="fas fa-desktop text-lg"></i>
                    <i className="fas fa-th-large text-lg"></i>
                    <i className="fas fa-expand text-lg"></i>
                    <i className="fas fa-question-circle text-lg"></i>
                </div>
            </div>
        </body>
    )
}
