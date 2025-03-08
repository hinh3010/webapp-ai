'use client'

import Container from "@/components/common/container";
import Ui from "./_components/wrapper";
import Header from "./_components/header";
import EditBar from "./_components/edit-bar";
import LeftBar from "./_components/left-bar";
import LibraryBar from "./_components/library-bar";
import LeftBarV2 from "./_components/left-bar-v2";
import Canvas from "./_components/canvas-v3";

export default function Home() {

    return (
        <div>
            {/* <Header />
            <LeftBar />
            <LibraryBar />
            <LeftBarV2 />
            <br />
            <EditBar />
            <br /> */}
            <Container>
                {/* <Ui /> */}
                <Canvas />
            </Container>
        </div>
    );
}
