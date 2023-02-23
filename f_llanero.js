
let glitch, vid, rPosition = 1000;
p5.disableFriendlyErrors = true;

function preload() {
    vid = createVideo('music/sped2.mp4', function() {
		vid.hide();
		vid.volume(0);
		vid.loop();
	});
    song = loadSound('music/LLanero.wav');
}

function setup() {
    createCanvas(1080, 1080);
    imageMode(CENTER);

	glitch = new Glitch();
    glitch.loadType('jpg');
	glitch.pixelate(1);
    glitch.errors(false);

    fft = new p5.FFT(0.9, 16);
}

function mousePressed() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.play();
        vid.loop();
    }
}

function draw() {
    var soundVals = getSoundVals();

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

class Ampper {
    constructor(l, m, h) {
      this.low = l;
      this.med = m;
      this.high = h;
    }
}