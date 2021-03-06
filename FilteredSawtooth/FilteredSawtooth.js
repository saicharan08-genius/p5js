var osc;
var oscFreqSlider;
var filterQslider, filterFreqResponseSlider;
var lpFilter;

var freqLabel, filterQLabel, filterFreqResLabel, titleLabel;
var button;

function setup() {
  createCanvas(280, 310);

  titleLabel = createElement('p', 'fitered sawtooth by christopher konopka');
  titleLabel.position(10, 0);

  // Oscillator frequency slider/label
  freqLabel = createElement('p', 'sawtooth frequency');
  freqLabel.position(10, 35);
  
  oscFreqSlider = createSlider(0, 880, 100);
  oscFreqSlider.position(150, 52);

  // Q slider/label
  filterQLabel = createElement('p', 'filter Q');
  filterQLabel.position(10, 70);

  filterQslider = createSlider(0, 5000, 255);
  filterQslider.position(150, 87);  

  // Frequency response slider
  filterFreqResLabel = createElement('p', 'filter resonance');
  filterFreqResLabel.position(10, 105);

  filterFreqResponseSlider = createSlider(0, 25, 255);
  filterFreqResponseSlider.position(150, 122);  

  // Create LowPass Filter
  filter1 = new p5.LowPass();       

  // Create Oscillator
  osc = new p5.Oscillator('sawtooth');
  osc.amp(.2);

  // Start Oscillator
  osc.start();

  // Disonenct oscillator, plug into filter
  osc.disconnect();
  osc.connect(filter1);

  // FFT of the audio filtered signal
  fft = new p5.FFT();
  fft.setInput(filter1);
}

function draw() {
  background(255);
  
  var spectrum = fft.analyze();

  beginShape();

    for (i = 0; i<spectrum.length; i++) {
      vertex(i, map(spectrum[i], 0, 512, height, 0) );
    }

  endShape(); 

  var filterQ = filterQslider.value();
  var filterFreqResponse = filterFreqResponseSlider.value();    
  var oscFreq = oscFreqSlider.value();

  osc.freq(oscFreq);

  filter1.set(filterQ, filterFreqResponse);
}



