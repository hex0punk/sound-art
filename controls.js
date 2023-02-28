var uinput;

function keyPressed() {
    switch (keyCode) {
        case 80:
            if (song.isPlaying()) {
                song.pause();
            } else {
                song.play();
            }
            break;
        case 82:
            setup();
            break;
    }
}

function keyTyped() {
    if (key === 's') {
        save(cnv, 'llanero.png');
    }
}

function handleFile(file) {
    print(file);
    song = loadSound(file);
}

function setupSongInput(){
    uinput = createFileInput(handleFile);
    uinput.position(100, 60);
}
