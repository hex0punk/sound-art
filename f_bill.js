
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

	// background(0);
	imageMode(CENTER);

	glitch = new Glitch();
	setupGlitch();

    // song.play();
    fft = new p5.FFT(0.9, 16);
}

function mousePressed() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.play();
    }
}

function draw() {
    glitch.resetBytes();
    var soundVals = getSoundVals();

    	// one per second, set single random byte position
	// if(frameCount % 60 === 0) {
	// 	rPosition = random(glitch.bytes.length);
	// }

    console.log(soundVals);
	if(frameCount % 2 === 0 && song.isPlaying()) {

		// if(!mouseIsPressed && song.isPlaying()) {
		// 	glitch.loadImage(vid);
		// }

        if (soundVals.low > 79){
            // setupGlitch();
            glitch.randomBytes(10);
        } else if (soundVals.med > 34) {
            // setupGlitch("webp");
            glitch.randomBytes(10);
        } else if (soundVals.high > 23) {
            // setupGlitch("png");
            glitch.randomBytes(10);
        } else {
            glitch.randomBytes(1);
        }

		// glitch.randomByte(rPosition); // single randome byte
        // if (soundVals.low > 79 || soundVals.med > 40 || soundVals.high > 23) {
        //     // glitch.limitBytes(.20); // limit bytes to branch
        //     // glitch.replaceBytes(10, 25);
        //     glitch.randomBytes(10, 2); // set 10 random bytes
        // }
        glitch.buildImage(function() {
            // background(0); // clear background once image is ready
        });
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