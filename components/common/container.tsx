import React from 'react'

export default function Container({
    children,
    classes = ''
}: Readonly<{
    children: React.ReactNode;
    classes?: string
}>) {
    return (
        <div className={`max-w-7xl w-full m-auto h-full p-2 ${classes}`}>
            {children}
        </div>
    )
}
