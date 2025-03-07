// app/layout.tsx
import { Metadata } from "next";
import { Inter } from "next/font/google";
import './main.css';

import { Dancing_Script, Pacifico } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const dancingScript = Dancing_Script({
    subsets: ["latin"],
    variable: "--font-dancing-script",
});
const pacifico = Pacifico({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-pacifico",
});

export const metadata: Metadata = {
    title: "Yêu em",
    description: "Chào mừng em vào thế giới của anh!",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Protest+Riot&family=Rubik+Glitch+Pop&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className={`${inter.className} ${dancingScript.variable} ${pacifico.variable}`}>
                {children}
            </body>
        </html>
    );
}
