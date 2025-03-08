import React from 'react'

export default function BulkCreateBarV2() {
    return (
        <div className="bg-white p-4">
            <div className="max-w-md mx-auto">
                <div className="flex items-center mb-4">
                    <i className="fas fa-arrow-left text-lg"></i>
                    <span className="ml-2 font-semibold">Bulk create</span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center">1</div>
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center">2</div>
                    <div className="w-6 h-6 border border-gray-400 text-gray-400 rounded-full flex items-center justify-center">3</div>
                </div>
                <h1 className="text-xl font-semibold mb-2">Connect data to your elements</h1>
                <p className="text-gray-600 mb-4">Right click an element in your page to connect it to your data below</p>
                <p className="text-gray-600 mb-4">No data fields added</p>
                <div className="space-y-4">
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <i className="fas fa-font text-lg"></i>
                            <span className="ml-2 font-semibold">Name</span>
                        </div>
                        <p>John Smith, Jane Jones</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <i className="fas fa-font text-lg"></i>
                            <span className="ml-2 font-semibold">Email</span>
                        </div>
                        <p>jsmith@test.com, jjones@test.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
