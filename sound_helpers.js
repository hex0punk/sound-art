var soundBins = [16, 32, 64, 128, 256, 512, 1024];
var soundSmoothing = 90;
var guiSound;

class Ampper {
    constructor(l, m, h) {
      this.low = l;
      this.med = m;
      this.high = h;
    }
}

class SoundAnalyzer {
    constructor(smoothing, bins) {
      if (Array.isArray(bins)) {
        bins = bins[0];
      }
      this.fft = new p5.FFT(smoothing, bins);
    }

    average = array => array.reduce((a, b) => a + b) / array.length;

    getSoundVals() {
        var spectrum = this.fft.analyze();
      
        var nl = floor(spectrum.length / 3);
        var low = [];
        var med = [];
        var high = [];
        for (let i = 0; i < spectrum.length; i++) {
            var amp = spectrum[i];
            var ampsi = map(amp, 0, 256, 1, 100); 
            if (i < nl * 1.2){
                low.push(ampsi);
            } else if (i < nl*1.5) {
                med.push(ampsi);
            } else if (i < nl*1.8) {
                high.push(ampsi);
            }
        }
        
        var lavg = ceil(this.average(low));
        var mavg = ceil(this.average(med));
        var havg = ceil(this.average(high));
    
        let av = new Ampper(lavg, mavg, havg);
        return av;
    }
}

function setupSoundGui(x, y) {
    guiSound = createGui('Sound settings (must reload)').setPosition(x, y);
    guiSound.addGlobals('soundSmoothing', 'soundBins');
    sliderRange(0, 1, 100);
}