class Ampper {
    constructor(l, m, h) {
      this.low = l;
      this.med = m;
      this.high = h;
    }
}

class SoundAnalyzer {
    constructor(smoothing, bins) {
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
            var ampsi = map(amp, 0, 256, 20, 100); 
            if (i < nl){
                low.push(ampsi);
            } else if (i < nl*2) {
                med.push(ampsi);
            } else if (i < nl*3) {
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