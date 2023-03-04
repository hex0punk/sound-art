var soundAnalyzer;
let shapes = [];
let imagePattern;
let graphicsPattern;

var highVal = 400;
var medVal = 200;
var lowVal = 100;
var lowMultiplier = 1;
var medMultiplier = 1.5;
var highMultiplier = 2;

var baseBg = "#3A4750";
var baseStroke = "#1B2430";
var highBg = "#5C5470";
var highStroke = "#748B9C";
var medBg = "#29435C";
var medStroke = "#044A42";
var lowBg = "#3A4750";
var lowStroke = "#1B2430";

var gui, guiCom;

function configureArt() {
    canvas = createCanvas(700, 700);
    let w = width;
    for (let i = 0; i < 40; i++) {
      let buffer = createGraphics(random(5, 20), random(5, 20));
      buffer.pixelDensity(1);
      var col, bg;
      if (i == 0) {
          bg = baseBg;
          col = baseStroke;
      } else if (i % 3 == 0) {
          bg = lowBg;
          col = lowStroke;
      } else if (i % 3 == 1) {
          bg = medBg;
          col = medStroke;
      } else {
          bg = highBg; //now this
          col = highStroke;
      }
      buffer.background(bg);
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
    
    soundAnalyzer = new SoundAnalyzer(soundSmoothing/100, soundBins);
}

function setup() {
  configureArt();
  if (userReloaded) {
    return;
  }
  setupGuide();
  setupSongInput();
  
  gui = createGui('Runtime settings').setPosition(20, 180);
  gui.addGlobals('highVal', 'medVal', 'lowVal', 'lowMultiplier', 'medMultiplier', 'highMultiplier');

  guiCom = createGui('Compile time settings').setPosition(300, 180);
  guiCom.addGlobals('highBg', 'highStroke', 'medBg', 'medStroke', 'lowBg', 'lowStroke');
  setupSoundGui(300, 540);
  
  setupAsciiSound();
}

function draw() {
  var soundVals = soundAnalyzer.getSoundVals();
  updateAsciiSound(soundVals);
  backgroundPattern(shapes[0].pattern);

  for (let s of shapes) {
    fillPattern(s.pattern);
    noStroke();
    push();
    translate(width / 2, height / 2);
    if (s.high == 2){
        rotate(frameCount / s.speed);
        ellipse(highVal, soundVals.low, s.w + (soundVals.low * lowMultiplier), s.w + (soundVals.low * lowMultiplier));
    } else if (s.high == 1) {
        rotate((frameCount / s.speed)*-1);
        ellipse(medVal, soundVals.med, s.w + (soundVals.med * medMultiplier), s.w + (soundVals.med * medMultiplier));
    } else {
        fillPattern(s.pattern);
        rotate((frameCount / s.speed));
        ellipse(lowVal, soundVals.high, s.w + (soundVals.high * highMultiplier), s.w + (soundVals.high * highMultiplier));
    }
    pop();
  }
}