let config = {
    x: 0,
    y: 0,
    speed: 20,
    recording: false,
    mediaRecorder: null,
    recordedChunks: [],
    canvasStream: null,
    sizeHand: 150,
    brushSize: 80,
    lastDrawX: -1,
    lastDrawY: -1
};

let img, hand, maskedImg, scaledImg;
let canvas;
let scaledImgWidth, scaledImgHeight;

function preload() {
    img = loadImage('adu.png');
    hand = loadImage('hand.png');
}

function setup() {
    // Tạo canvas với kích thước 80vw 80vh
    let canvasWidth = windowWidth * 0.8;
    let canvasHeight = windowHeight * 0.8;

    canvas = createCanvas(canvasWidth, canvasHeight);
    // Căn giữa canvas
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    canvas.position(x, y);

    background(255);

    // Tính toán kích thước ảnh scaled = 1/4 kích thước canvas
    scaledImgWidth = width / 2;
    scaledImgHeight = height / 2;

    // Tạo một bản copy đã scale của ảnh gốc
    scaledImg = createImage(scaledImgWidth, scaledImgHeight);
    scaledImg.copy(img, 0, 0, img.width, img.height, 0, 0, scaledImgWidth, scaledImgHeight);

    // Điều chỉnh kích thước brush và hand theo tỷ lệ mới
    let scaleFactor = scaledImgWidth / img.width;
    config.brushSize = config.brushSize * scaleFactor;
    config.sizeHand = config.sizeHand * scaleFactor;
    config.speed = max(5, config.speed * scaleFactor);

    // Tạo đồ họa mặt nạ với kích thước bằng 1/4 canvas ở góc trên bên trái
    maskedImg = createGraphics(scaledImgWidth, scaledImgHeight);
    maskedImg.background(255);

    setupRecording();
}

function draw() {
    background(255);

    if (config.y < scaledImgHeight) {
        if (config.lastDrawX !== config.x || config.lastDrawY !== config.y) {
            // Sao chép từ ảnh đã scale sẵn sang maskedImg
            maskedImg.copy(
                scaledImg,
                config.x, config.y, config.brushSize, config.brushSize,
                config.x, config.y, config.brushSize, config.brushSize
            );

            config.lastDrawX = config.x;
            config.lastDrawY = config.y;
        }

        fillGapsBetweenPositions();
        // Vẽ maskedImg vào canvas (ở góc trên bên trái)
        image(maskedImg, 0, 0);
        // Vẽ hình tay
        image(hand, config.x - (config.sizeHand / 4), config.y - (config.sizeHand / 4), config.sizeHand, config.sizeHand);

        config.x += config.speed;
        if (config.x >= scaledImgWidth - config.brushSize) {
            config.x = 0;
            config.y += config.brushSize / 1.5;
        }
    } else {
        image(maskedImg, 0, 0);
        if (config.recording) {
            stopRecording();
        }
    }

    // Vẽ viền quanh khu vực hình ảnh để rõ ràng hơn
    noFill();
    stroke(0);
    strokeWeight(1);
    rect(0, 0, scaledImgWidth, scaledImgHeight);
}

function fillGapsBetweenPositions() {
    if (config.lastDrawX === 0 && config.x === config.speed) return;
    if (config.x === 0 && config.lastDrawY > 0) {
        let prevX = scaledImgWidth - config.brushSize;
        let prevY = config.y - config.brushSize / 1.5;

        for (let fillX = prevX + config.brushSize / 2; fillX < scaledImgWidth; fillX += config.brushSize / 2) {
            maskedImg.copy(
                scaledImg,
                fillX, prevY, config.brushSize / 2, config.brushSize / 2,
                fillX, prevY, config.brushSize / 2, config.brushSize / 2
            );
        }

        for (let fillY = prevY + config.brushSize / 2; fillY < config.y; fillY += config.brushSize / 2) {
            maskedImg.copy(
                scaledImg,
                0, fillY, config.brushSize / 2, config.brushSize / 2,
                0, fillY, config.brushSize / 2, config.brushSize / 2
            );
        }
        return;
    }

    let prevX = config.x - config.speed;
    let steps = max(1, floor(config.speed / (config.brushSize / 4)));
    let stepSize = config.speed / steps;

    for (let i = 1; i < steps; i++) {
        let fillX = prevX + i * stepSize;
        maskedImg.copy(
            scaledImg,
            fillX, config.y, config.brushSize / 4, config.brushSize / 4,
            fillX, config.y, config.brushSize / 4, config.brushSize / 4
        );
    }
}

function windowResized() {
    // Cập nhật kích thước canvas khi cửa sổ thay đổi kích thước
    let canvasWidth = windowWidth * 0.8;
    let canvasHeight = windowHeight * 0.8;

    resizeCanvas(canvasWidth, canvasHeight);

    // Căn giữa lại canvas
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    canvas.position(x, y);

    // Cập nhật kích thước hình ảnh được scale
    scaledImgWidth = width / 2;
    scaledImgHeight = height / 2;

    // Tạo lại ảnh đã scale
    scaledImg = createImage(scaledImgWidth, scaledImgHeight);
    scaledImg.copy(img, 0, 0, img.width, img.height, 0, 0, scaledImgWidth, scaledImgHeight);

    // Tạo lại maskedImg với kích thước mới
    maskedImg = createGraphics(scaledImgWidth, scaledImgHeight);
    maskedImg.background(255);

    // Đặt lại các giá trị vẽ
    let scaleFactor = scaledImgWidth / img.width;
    config.brushSize = 80 * scaleFactor;
    config.sizeHand = 150 * scaleFactor;
    config.speed = max(5, 20 * scaleFactor);

    // Đặt lại vị trí vẽ
    Object.assign(config, { x: 0, y: 0, lastDrawX: -1, lastDrawY: -1 });
}

function setupRecording() {
    let canvas = document.querySelector('canvas');
    config.canvasStream = canvas.captureStream(60);
    config.mediaRecorder = new MediaRecorder(config.canvasStream, { mimeType: 'video/webm; codecs=vp9' });
    config.mediaRecorder.ondataavailable = (event) => config.recordedChunks.push(event.data);
    config.mediaRecorder.onstop = saveRecording;
}

function startRecording() {
    if (config.mediaRecorder && config.mediaRecorder.state !== 'recording') {
        Object.assign(config, { x: 0, y: 0, lastDrawX: -1, lastDrawY: -1, recordedChunks: [] });
        maskedImg.background(255);
        config.mediaRecorder.start();
        config.recording = true;
        console.log('Bắt đầu ghi...');
    }
}

function stopRecording() {
    if (config.mediaRecorder && config.mediaRecorder.state === 'recording') {
        config.mediaRecorder.stop();
        config.recording = false;
        console.log('Đã dừng ghi.');
    }
}

function saveRecording() {
    if (config.recordedChunks.length === 0) {
        console.log('Không có dữ liệu video để lưu');
        return;
    }
    let blob = new Blob(config.recordedChunks, { type: 'video/webm' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'drawing-animation.webm';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
}

// Thêm CSS để đặt canvas vào giữa
function addCenteringCSS() {
    let style = document.createElement('style');
    style.textContent = `
        body {
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100vw;
            overflow: hidden;
        }
        canvas {
            display: block;
        }
        #controls {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 100;
        }
    `;
    document.head.appendChild(style);
}

window.onload = function () {
    addCenteringCSS();

    // Tạo div chứa các nút điều khiển
    let controls = document.createElement('div');
    controls.id = 'controls';

    // Tạo các nút điều khiển
    let startButton = document.createElement('button');
    startButton.id = 'start-record';
    startButton.textContent = 'Bắt đầu ghi';

    let stopButton = document.createElement('button');
    stopButton.id = 'stop-record';
    stopButton.textContent = 'Dừng ghi';

    // Thêm nút vào div
    controls.appendChild(startButton);
    controls.appendChild(stopButton);

    // Thêm div vào body
    document.body.appendChild(controls);

    document.getElementById('start-record').addEventListener('click', startRecording);
    document.getElementById('stop-record').addEventListener('click', stopRecording);
};