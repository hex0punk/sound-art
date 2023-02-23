let shapes = [];
let imagePattern;
let graphicsPattern;

var highVal = 400;
var medVal = 200;
var lowVal = 100;
var strokeColor = "#3A4750";


var gui;

function preload() {
    song = loadSound('media/Medusa.wav');
}


function mousePressed() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.play();
    }
}

function setup() {
  createCanvas(1080, 1080);
  let w = width;
  for (let i = 0; i < 30; i++) {
    let buffer = createGraphics(random(5, 20), random(5, 20));
    buffer.pixelDensity(1);
    var col, val;
    if (i == 0) {
        buffer.background("#3A4750");
        col = "#1B2430"
    } else if (i % 3 == 0) {
        buffer.background("#393c49");
        col = "#393c49";
    } else if (i % 3 == 1) {
        buffer.background("#29435C"); // thus
        col ="#044A42";
    } else {
        buffer.background("#5C5470"); //now this
        col = "#748B9C";
    }
    buffer.stroke(col);
    buffer.strokeWeight(1);
    buffer.line(random(5), random(5), random(5), random(5));
    buffer.ellipse(0, 0, random(5), random(5));

    shapes.push({
      pattern: createPattern(buffer),
      w: w,
      speed: random(500, 1000),
      high: i % 3,
    });
    w -= 25;
  }
  fft = new p5.FFT(0.9, 16);
  gui = createGui('Have fun')
  gui.addGlobals('highVal', 'medVal', 'lowVal', 'strokeColor');
  //sliderRange(0, 50, 1);
}

function draw() {
  var soundVals = getSoundVals();
  backgroundPattern(shapes[0].pattern);

  for (let s of shapes) {
    fillPattern(s.pattern);
    noStroke();
    push();
    translate(width / 2, height / 2);
    if (s.high == 2){
        rotate(frameCount / s.speed);
        ellipse(highVal, soundVals.low, s.w +soundVals.low, s.w + soundVals.low);
    } else if (s.high == 1) {
        rotate((frameCount / s.speed)*-1);
        ellipse(medVal, soundVals.med, s.w + (soundVals.med * 1.5), s.w + (soundVals.med * 1.5));
    } else {
        stroke(strokeColor);
        fillPattern(s.pattern);
        rotate((frameCount / s.speed));
        ellipse(lowVal, soundVals.high, s.w + (soundVals.high * 2), s.w + (soundVals.high * 2));
    }
    pop();
  }
}

class Ampper {
    constructor(l, m, h) {
      this.low = l;
      this.med = m;
      this.high = h;
    }
}