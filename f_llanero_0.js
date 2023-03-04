
let soundAnalyzer;
let gradient;
let gui;
const colors = ['#C55D55', '#da8569', '#f1e1aa', '#f1f4da', '#aabff1', '#8492df', '#6b8ada', '#77a8f2'];

// var color1 = '#C55D55';
// var color2 = '#da8569';
// var color3 = '#f1e1aa';
// var color4 = '#f1f4da';
// var color5 = '#aabff1';
// var color6 = '#8492df';
// var color7 = '#6b8ada';
// var color8 = '#77a8f2';

var lowMultiplier = 1.5;
var medMultiplier = 2.5;
var highMultiplier = 3;

var ringNum = 8;

function setup() {
    canvas = createCanvas(1080, 1080);
    setupGuide();
    setupSongInput();
    gradient = createRadialGradient(height / 3, height - (height / 12), width / 2, height / 2 + (height / 4));
    gradient.colors(0, "#ffdcbd", 0.5, "#8bd1fb", 1, "#699be0");
    glitch = new Glitch();

    gui = createGui('Settings').setPosition(20, 180);
    gui.addGlobals('ringNum', 'lowMultiplier', 'medMultiplier', 'highMultiplier');

    soundAnalyzer = new SoundAnalyzer(0.9, 16);
    setupAsciiSound();
}

function draw() {
    updateColors();
    var soundVals = soundAnalyzer.getSoundVals();
    updateAsciiSound(soundVals);
    backgroundGradient(gradient);
    noStroke();

    for(let i = ringNum; i > 0; i--) {
        let color = colors[i-1];

        fill(color);
        let l = 90 * i;
        if (i > 5){
            ellipse(width / 2, height/ 2, l + soundVals.low * lowMultiplier);
        } else if (i > 3) {
            ellipse(width / 2, height/ 2, l + soundVals.med * medMultiplier);
        } else {
            ellipse(width / 2, height/ 2, l + soundVals.high * highMultiplier);
        }
    }
}

function getRandomColor(){ 
    return  '#' + Math.floor(Math.random()*16777215).toString(16);
}

function updateColors() {
    var colDif = colors.length - ringNum;
    if (colDif > 0) {
        for(let i = 0; i <= colDif; i++){
            colors.pop();
        }

        for(let i = 0; i < colDif; i++){
            colors.push(getRandomColor());
        }
    }

    if (colDif < 0) {
        for(let i = colDif; i < 0; i++){
            colors.push(getRandomColor());
        }
    }
}