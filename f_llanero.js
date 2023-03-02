
let soundAnalyzer;
let glitch, vid, rPosition = 1000;
p5.disableFriendlyErrors = true;

function preload() {
    song = loadSound('music/LLanero.wav');
}

function setup() {
    createCanvas(1080, 1080);
    imageMode(CENTER);

	glitch = new Glitch();
    glitch.loadType('jpg');
	glitch.pixelate(1);
    glitch.errors(false);

    soundAnalyzer = new SoundAnalyzer(0.9, 16);
}

function draw() {
    var soundVals = soundAnalyzer.getSoundVals();

	if(frameCount % 2 === 0) {

		if(!mouseIsPressed && song.isPlaying()) {
			glitch.loadImage(vid);
		}

        if (soundVals.low > 79 || soundVals.med > 40 || soundVals.high > 23) {
            glitch.limitBytes(.20); // limit bytes to branch
            glitch.randomBytes(10, 2); // set 10 random bytes
        }
		glitch.buildImage();
	}

	image(glitch.image, width / 2, height / 2)
}