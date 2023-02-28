
let soundAnalyzer;
let glitch, typeCounter = 0;
p5.disableFriendlyErrors = true;


function setupGlitch(gtype) {
    if (gtype !== "jpg") {
        gtype = "jpg";
    }
	loadImage('music/oldbill.jpg', function(im) {
		glitch.loadType(gtype);
		glitch.loadImage(im);
	});
}

function preload() {
    song = loadSound('music/LLanero.wav');
}

function setup() {
    createCanvas(1080, 1080);
    imageMode(CENTER);

	imageMode(CENTER);

	glitch = new Glitch();
	setupGlitch();
    soundAnalyzer = new SoundAnalyzer(0.9, 16);
}

function draw() {
    glitch.resetBytes();
    var soundVals = soundAnalyzer.getSoundVals();

    console.log(soundVals);
	if(frameCount % 2 === 0 && song.isPlaying()) {

        if (soundVals.low > 79){
            glitch.randomBytes(10);
        } else if (soundVals.med > 34) {
            glitch.randomBytes(10);
        } else if (soundVals.high > 23) {
            glitch.randomBytes(10);
        } else {
            glitch.randomBytes(1);
        }
	}

	image(glitch.image, width / 2, height / 2)
}