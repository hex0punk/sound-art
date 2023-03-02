
let soundAnalyzer;
let gradient;
var cnv;
let gui;
const colors = ['#C55D55', '#da8569', '#f1e1aa', '#f1f4da', '#aabff1', '#8492df', '#6b8ada', '#77a8f2'];

var lowMultiplier = 1.5;
var medMultiplier = 2.5;
var highMultiplier = 3;

function setup() {
    cnv = createCanvas(1080, 1080);
    setupSongInput();
    gradient = createRadialGradient(height / 3, height - (height / 12), width / 2, height / 2 + (height / 4));
    gradient.colors(0, "#ffdcbd", 0.5, "#8bd1fb", 1, "#699be0");
    glitch = new Glitch();

    gui = createGui('Settings').setPosition(20, 180);
    gui.addGlobals('lowMultiplier', 'medMultiplier', 'highMultiplier');

    soundAnalyzer = new SoundAnalyzer(0.9, 16);
}

function draw() {
    var soundVals = soundAnalyzer.getSoundVals();

    backgroundGradient(gradient);
    noStroke();

    for(let i = 8; i > 0; i--) {
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