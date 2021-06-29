<div>Teachable Machine Audio Model - p5.js and ml5.js</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js"></script>
<script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
<script type="text/javascript">
  
  // Global variable to store the classifier
let classifier;

// Label
let label = 'listening...';

// Teachable Machine model URL:
let soundModel = 'https://teachablemachine.withgoogle.com/models/kRJuc-swa/';

let ax=0;
let ay=0;

var cam;
var x=0;
var y=0;
var q=3;


function preload() {
  // Load the model
  classifier = ml5.soundClassifier(soundModel + 'model.json');
}

function setup() {
  createCanvas(wC = windowWidth, hC = windowHeight);
  // Start classifying
  // The sound model will continuously listen to the microphone
  classifier.classify(gotResult);
  
  button = createButton("start");
  button.size(150, 80);
  button.position(wC/2, hC/2);
  button.mouseClicked(startMIC);
  button.style("font-family", "Helvetica");
  button.style("font-size", "48px");
  
  mic = new p5.AudioIn();
  
   cam = createCapture(VIDEO);
}

function draw() {
  //background(186, 255, 41);
 
  
  cam.loadPixels();
  cam.hide();
  
  var w = cam.width;
  var h = cam.height;
  
  
  
  if (label === 'Background Noise') {
    
    
    copy(cam, 0, 0, w, h, ax, ay, wC, hC);
  
    filter (BLUR);
    
  }
  
  
  if (label === 'breath') {
    
  copy(cam, w/2, 0, w, h, x, y, wC/4, hC/3);

  x = x + 1;
    
  if (x > wC) { x = 0; y = y + 150} ;
  
  if (y > hC) { x = 0; y = 0};
    

  };
  
  if (label ==='speech') {
    
     
  noStroke();
  fill(random(100,247), 203, random(21, 60), 1);
  rect(0, 0, wC, hC);
    
  };
  
  function startMIC() {
  
  getAudioContext();
  userStartAudio();
  button.hide();
  mic.start();
  
}
  



}

// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
}
</script>
