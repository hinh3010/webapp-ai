import React from 'react'

export default function Header() {
    return (

        <nav className="bg-gradient-to-r from-teal-400 to-purple-600 p-2 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <button className="text-white text-xl"><i className="fas fa-bars"></i></button>
                <a href="#" className="text-white">File</a>
                <a href="#" className="text-white"><i className="fas fa-crown"></i> Resize</a>
                <a href="#" className="text-white"><i className="fas fa-pencil-alt"></i> Editing <i className="fas fa-caret-down"></i></a>
                <button className="text-white text-xl"><i className="fas fa-undo"></i></button>
                <button className="text-white text-xl"><i className="fas fa-redo"></i></button>
                <button className="text-white text-xl"><i className="fas fa-cloud-upload-alt"></i></button>
            </div>
            <div className="flex items-center space-x-4">
                <span className="text-white truncate">Groovy Winter Daily Agenda Classroom Slides Presenta...</span>
                <button className="text-white text-xl"><i className="fas fa-plus"></i></button>
                <button className="text-white text-xl"><i className="fas fa-chart-bar"></i></button>
                <button className="text-white text-xl"><i className="fas fa-comment-alt"></i></button>
                <button className="text-white bg-purple-700 px-4 py-1 rounded-full">Send to teacher</button>
                <button className="text-white text-xl"><i className="fas fa-share"></i> Share</button>
            </div>
        </nav>
    )
}
