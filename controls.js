var uinput;
var song;
var lowTxt, medTxt, highTxt;
var canvas;

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
        save(canvas, 'dis0bedience.png');
    }
}

function handleFile(file) {
    print(file);
    song = loadSound(file);
}

function setupSongInput(){
    uinput = createFileInput(handleFile);
    uinput.position(20, 110);
    uinput.parent("controls")
}

function songIsPlaying() {
    return song !== null && song !== undefined && song.isPlaying();
}

function setupAsciiSound() {
    lowTxt = createP('Low: 0');
    lowTxt.position(20,600);
    medTxt = createP('Med: 0');
    medTxt.position(20,620);
    highTxt= createP('High: 0');
    highTxt.position(20,640);
}

function setupGuide() {
    let txt = createDiv();
    txt.id('guide');
    txt.position(20,710);
    var playTxt;
    playTxt = createP('P: Play');
    playTxt.parent('guide')
    reloadTxt = createP('R: Reload (for compiler settings)');
    reloadTxt.parent('guide');
    saveTxt = createP('S: Save image');
    saveTxt.parent('guide');
}

function updateAsciiSound(soundVals){
    lowTxt.html('|'.repeat(soundVals.high));
    medTxt.html('|'.repeat(soundVals.med));
    highTxt.html('|'.repeat(soundVals.low));
}
