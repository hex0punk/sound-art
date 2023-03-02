
let soundAnalyzer;
let glitch, typeCounter = 0;
let gui;
p5.disableFriendlyErrors = true;

var lowThr = 79;
var medThr = 34;
var highThr = 23;

var lowRandBytes = 10;
var medRandBytes = 10;
var highRandBytes = 10;
var baseRandBytes = 1;

var lowTxt, medTxt, highTxt;

function setupGlitch(gtype) {
    if (gtype !== "jpg") {
        gtype = "jpg";
    }
    loadImage('media/oldbill.jpg', function(img){
        glitch.loadImage(img);
        glitch.loadType(gtype);
        glitch.loadQuality(.25)
    });
}


function setup() {
    createCanvas(1080, 1080);
    setupSongInput();
    
    imageMode(CENTER);

    gui = createGui('Settings').setPosition(20, 180);
    gui.addGlobals('lowThr', 'medThr', 'highThr', 'lowRandBytes', 'medRandBytes', 'highRandBytes', 'baseRandBytes');

	glitch = new Glitch();
	setupGlitch('jpg');
    soundAnalyzer = new SoundAnalyzer(0.9, 16);
    
    lowTxt = createP('Low: 0');
    lowTxt.position(20,600);
    medTxt = createP('Med: 0');
    medTxt.position(20,620);
    highTxt= createP('High: 0');
    highTxt.position(20,640);
}

function updateText(soundVals){
    lowTxt.html('|'.repeat(soundVals.high));
    medTxt.html('|'.repeat(soundVals.med));
    highTxt.html('|'.repeat(soundVals.low));
}

function draw() {
    glitch.resetBytes();
    var soundVals = soundAnalyzer.getSoundVals();
    updateText(soundVals);
	if(songIsPlaying()) {
        if (soundVals.low > lowThr){
            glitch.randomBytes(lowRandBytes);
        } else if (soundVals.med > medThr) {
            glitch.randomBytes(medRandBytes);
        } else if (soundVals.high > highThr) {
            glitch.randomBytes(highRandBytes);
        } else {
            glitch.randomBytes(baseRandBytes);
        }
	}
    glitch.buildImage();
	image(glitch.image, width / 2, height / 2)
}