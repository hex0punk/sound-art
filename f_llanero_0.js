
let gradient;
const colors = ['#C55D55', '#da8569', '#f1e1aa', '#f1f4da', '#aabff1', '#8492df', '#6b8ada', '#77a8f2']


function mousePressed() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.play();
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        capturer.start();
      } else if (keyCode === RIGHT_ARROW) {
        capturer.stop();
        capturer.save();
      }
  }

function preload() {
    song = loadSound('music/LLanero.wav');
}

function setup() {
    createCanvas(900, 900);
    gradient = createRadialGradient(height / 3, height - (height / 12), width / 2, height / 2 + (height / 4));
    gradient.colors(0, "#ffdcbd", 0.5, "#8bd1fb", 1, "#699be0");
    song.play();
    glitch = new Glitch();
    fft = new p5.FFT(0.9, 16);
}

function draw() {
    var soundVals = getSoundVals();

    backgroundGradient(gradient);
    noStroke();

    for(let i = 8; i > 0; i--) {
        let color = colors[i-1];

        fill(color);
        let l = 90 * i;
        if (i > 5){
            ellipse(width / 2, height/ 2, l + soundVals.low * 1.5);
        } else if (i > 3) {
            ellipse(width / 2, height/ 2, l + soundVals.med * 2.5);
        } else {
            ellipse(width / 2, height/ 2, l + soundVals.high * 3);
        }
    }

    // if (frameCount < 10300) {
    //     capturer.capture(canvas);
    // } else if (framecount === 10300) {
    //     capturer.stop();
    //     capturer.save();
    // }
}

class Ampper {
    constructor(l, m, h) {
      this.low = l;
      this.med = m;
      this.high = h;
    }
}