const image = document.getElementById('bouncing-image');
let posX = 0;
let posY = 0;
let speedX = 2;
let speedY = 2;

// 画像の初期位置を設定
function initPosition() {
    posX = Math.floor(Math.random() * (window.innerWidth - image.clientWidth));
    posY = Math.floor(Math.random() * (window.innerHeight - image.clientHeight));
    image.style.left = posX + 'px';
    image.style.top = posY + 'px';
}

// 画像を移動させる関数
function moveImage() {
    posX += speedX;
    posY += speedY;

    // 画像が画面の端に達したら、逆方向に動かす
    if (posX > window.innerWidth - image.clientWidth || posX < 0) {
        speedX = -speedX;
    }
    if (posY > window.innerHeight - image.clientHeight || posY < 0) {
        speedY = -speedY;
    }

    // 画像の新しい位置を適用
    image.style.left = posX + 'px';
    image.style.top = posY + 'px';
}

// 画像が読み込まれたら、初期位置を設定
image.onload = function() {
    initPosition();
}

// 画像を一定間隔で移動させる
setInterval(moveImage, 10);

// 爆発エフェクト用の要素を取得
const explosion = document.getElementById('explosion');

// 爆発エフェクトを表示する関数
function showExplosion() {
    explosion.style.left = posX + 'px';
    explosion.style.top = posY + 'px';
    explosion.style.display = 'block';
}

// 爆発エフェクトを非表示にする関数
function hideExplosion() {
    explosion.style.display = 'none';
}

// 画像がクリックされたときの処理
image.onclick = function() {
    // 爆発エフェクトを表示
    playGif('explosion.gif', explosion); // ここでGIFを制御する関数を呼び出す
    showExplosion();
    // 画像を一時的に非表示にする
    image.style.display = 'none';
    // 3秒後に爆発エフェクトを非表示にし、画像を再表示する
    setTimeout(function() {
        hideExplosion();
        initPosition();
        image.style.display = 'block';
    }, 1200);
};

// 画像にポインターイベントを適用
image.style.pointerEvents = 'auto';

// gif.jsを使ってGIFアニメーションを制御する関数
function playGif(gifUrl, target) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', gifUrl, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function() {
        const arrayBuffer = xhr.response;
        const gif = new GIF({
            workers: 2,
            quality: 10,
            workerScript: 'gif.worker.js',
        });

        gif.on('finished', function(blob) {
            target.src = URL.createObjectURL(blob);
        });

        gif.load(arrayBuffer);
    };
    xhr.send();
}