"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';

export default function YeuEm() {
    // Thay đổi nội dung bức thư ở đây
    const letterContent = `Hôm nay là 8/3, một ngày thật đặc biệt dành cho em – người con gái anh yêu thương nhất. Anh muốn nhân dịp này để nói với em những điều từ tận đáy lòng mình.
Gửi em chút lạc quan, không muộn phiền, chúc em ngày ngày đều là cô công chúa xinh đẹp :)). Cuộc sống của anh sẽ chẳng còn ý nghĩa nếu thiếu đi em. Em chính là ánh sáng, là niềm vui.

Bên em, anh luôn cảm thấy mình đặc biệt và trọn vẹn mỗi tội chả được bên em :)). Em là điều đẹp đẽ nhất mà anh từng có trong đời. Chẳng biết nói gì ngoài chúc em giàu ú ụ.

Anh yêu em rất nhiều, mãi mãi và hơn thế nữa! 💕

Chúc em ngày 8/3 vui vẻ! Tặng hoa nè 💐❤️`

    // Tốc độ viết chữ. Số càng nhỏ tốc độ càng nhanh. 50 là tốc độ khá phù hợp
    const durationWrite = 50;

    // Hiệu ứng gõ chữ
    const effectWrite = () => {
        const boxLetter = document.querySelector(".letterContent");
        if (!boxLetter) return;

        const letterContentSplited = letterContent.split("");
        boxLetter.innerHTML = "";

        letterContentSplited.forEach((val, index) => {
            setTimeout(() => {
                boxLetter.innerHTML += val;
            }, durationWrite * index);
        });
    };

    useEffect(() => {
        // Khi component được mount
        setTimeout(() => {
            const container = document.querySelector(".container");
            if (container) container.classList.add("active");
        }, 500);

        // Event listener cho nút mở
        const openBtn = document.querySelector(".openBtn");
        if (openBtn) {
            openBtn.addEventListener("click", () => {
                const cardValentine = document.querySelector(".cardValentine");
                const container = document.querySelector(".container");
                if (cardValentine) cardValentine.classList.add("active");
                if (container) container.classList.add("close");
            });
        }

        // Event listener cho thiệp Valentine
        const cardValentine = document.querySelector(".cardValentine");
        if (cardValentine) {
            cardValentine.addEventListener("click", () => {
                cardValentine.classList.toggle("open");

                if (cardValentine.className.indexOf("open") !== -1) {
                    setTimeout(effectWrite, 500);
                } else {
                    setTimeout(() => {
                        const letterContentElement = document.querySelector(".letterContent");
                        if (letterContentElement) letterContentElement.innerHTML = "";
                    }, 1000);
                }
            });
        }

        // Cleanup function khi component unmount
        return () => {
            const openBtn = document.querySelector(".openBtn");
            const cardValentine = document.querySelector(".cardValentine");

            if (openBtn) {
                openBtn.removeEventListener("click", () => { });
            }

            if (cardValentine) {
                cardValentine.removeEventListener("click", () => { });
            }
        };
    }, []);

    return (
        <div className="container">
            <Image
                className="paperHeart paperHeart1"
                style={{ "--time": "0s" } as React.CSSProperties}
                src="/yeu_em/paperHeart.webp"
                alt=""
                width={100}
                height={100}
            />
            <Image
                className="paperHeart paperHeart2"
                style={{ "--time": "1s" } as React.CSSProperties}
                src="/yeu_em/paperHeart.webp"
                alt=""
                width={100}
                height={100}
            />
            <Image
                className="paperHeart paperHeart3"
                style={{ "--time": "2.5s" } as React.CSSProperties}
                src="/yeu_em/paperHeart.webp"
                alt=""
                width={100}
                height={100}
            />
            <Image
                className="paperHeart paperHeart4"
                style={{ "--time": "4s" } as React.CSSProperties}
                src="/yeu_em/paperHeart.webp"
                alt=""
                width={100}
                height={100}
            />
            <Image
                className="paperHeart paperHeart5"
                style={{ "--time": "2s" } as React.CSSProperties}
                src="/yeu_em/paperHeart.webp"
                alt=""
                width={100}
                height={100}
            />
            <Image
                className="paperHeart paperHeart6"
                style={{ "--time": "3s" } as React.CSSProperties}
                src="/yeu_em/paperHeart.webp"
                alt=""
                width={100}
                height={100}
            />

            <div className="boxTitle">
                <p className="firstTitle partTitle">Yêu đương gì chưa</p>
                <p className="secondTitle partTitle">người đẹp</p>
            </div>

            <div className="boxCloud">
                <div className="cloud"></div>
                <div className="cloud1"></div>
                <div className="cloud2"></div>

                <div className="btnBox">
                    <div className="cloudBtn"></div>
                    <button className="openBtn">❤️ Click me! ❤️</button>
                </div>
            </div>

            <div className="cardValentine">
                <div className="left">
                    <div className="leftFront">
                        <div className="boxShadow">
                            <div className="boxTitleCard"></div>
                        </div>

                        <p className="des">Thư tình nè bé</p>
                    </div>
                    <div className="leftBack">
                        <Image className="artHeart" src="/yeu_em/artHeart.webp" alt="" width={200} height={200} />
                    </div>
                </div>

                <div className="right">
                    <div className="rightContent">
                        <p className="letterContent"></p>
                    </div>
                </div>
            </div>
        </div>
    );
}