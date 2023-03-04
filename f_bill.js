
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

function setupGlitch(gtype) {
    if (gtype !== "jpg") {
        gtype = "jpg";
    }
    loadImage('images/oldbill.jpg', function(img){
        glitch.loadImage(img);
        glitch.loadType(gtype);
        glitch.loadQuality(.25)
    });
}

function configureArt() {
    canvas = createCanvas(900, 900);
    imageMode(CENTER);
    soundAnalyzer = new SoundAnalyzer(soundSmoothing/100, soundBins);
}

function setup() {
    configureArt();
    if (userReloaded) {
      return;
    }

    glitch = new Glitch();
	setupGlitch('jpg');
    
    setupGuide();
    setupSongInput();

    gui = createGui('Settings').setPosition(20, 180);
    gui.addGlobals('lowThr', 'medThr', 'highThr', 'lowRandBytes', 'medRandBytes', 'highRandBytes', 'baseRandBytes');
    setupSoundGui(240, 180);

    setupAsciiSound();
}

function draw() {
    glitch.resetBytes();
    var soundVals = soundAnalyzer.getSoundVals();
    updateAsciiSound(soundVals);
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