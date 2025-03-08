import React from 'react'

export default function BulkCreateBar() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex flex-col space-y-4">
                        <button className="bg-purple-500 text-white py-2 px-4 rounded-lg text-center">Enter data manually</button>
                        <button className="border border-gray-300 text-black py-2 px-4 rounded-lg text-center">Upload data</button>
                    </div>
                    <p className="text-center text-gray-500 mt-4">Supported file types: XLSX, CSV, TSV</p>
                </div>
            </div>
        </div>
    )
}
