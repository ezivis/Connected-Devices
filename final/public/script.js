/*
  WebSocket connection Script
  Uses standard W3C WebSocket API, not socket.io API
  Connects to a local websocket server

  created 7 Jan 2021
  modified 11 Nov 2021
  by Tom Igoe
*/
// get the server URL from the window.location:
// change 'wss' to 'ws' for running without SSL):\

let serverURL = 'ws://' + window.location.host;
// the webSocket connection:
let socket;
// variables for the DOM elements:
let incomingSpan;
let outgoingText;
let connectionSpan;
let connectButton;
let allvalue;
let myImage;

function setup() {
  // get all the DOM elements that need listeners:
  incomingSpan = document.getElementById('incoming');
  outgoingText = document.getElementById('outgoing');
  connectionSpan = document.getElementById('connection');
  connectButton = document.getElementById('connectButton');
  myImage = document.getElementById("mainImage");
  // set the listeners:
  outgoingText.addEventListener('change', sendMessage);
  connectButton.addEventListener('click', changeConnection);
  openSocket(serverURL);
  console.log(window.location.host);            
}

function openSocket(url) {
  // open the socket:
  socket = new WebSocket(url);
  socket.addEventListener('open', openConnection);
  socket.addEventListener('close', closeConnection);
  socket.addEventListener('message', readIncomingMessage);
}


function changeConnection(event) {
  // open the connection if it's closed, or close it if open:
  if (socket.readyState === WebSocket.CLOSED) {
    openSocket(serverURL);
  } else {
    socket.close();
  }
}

function openConnection() {
  // display the change of state:
  connectionSpan.innerHTML = "true";
  connectButton.value = "Disconnect";
}

function closeConnection() {
  // display the change of state:
  connectionSpan.innerHTML = "false";
  connectButton.value = "Connect";
}

function readIncomingMessage(event) {
  // display the incoming message:
  incomingSpan.innerHTML = event.data;
  allvalue = event.data;
  console.log(allvalue);
  if (allvalue<20){
    PickRandomWord(document.WordForm);
  }
}

function sendMessage() {
  //if the socket's open, send a message:
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(outgoingText.value);
  }
}

// add a listener for the page to load:
window.addEventListener('load', setup);



var NumberOfWords = 7

var words = new BuildArray(NumberOfWords)

words[1] = "Dry"
words[2] = "Zeshu"
words[3] = "Meijie"
words[4] = "hao gan"
words[5] = "hao re"
words[6] = "hao men"
words[7] = "xxxxx"


function BuildArray(size){
this.length = size
for (var i = 1; i <= size; i++){
this[i] = null}
return this
}

function PickRandomWord(frm) {
var rnd = Math.ceil(Math.random() * NumberOfWords)
incomingSpan.innerHTML = "I'm so" + " " +  words[rnd] + " " + allvalue
}



const imageArray = ["/img/1.jpg","/img/2.jpg","/img/3.jpg",
  "/img/4.jpg","/img/5.jpg"];

var imageIndex = 0; 
function changeImage() {
  // myImage.setAttribute("src",imageArray[imageIndex]);
  document.body.style.backgroundImage ="url"+"(" +imageArray[imageIndex] + ")"
  document.body.style.backgroundSize = "cover";
  imageIndex = (imageIndex + 1) % imageArray.length;
  console.log(imageArray[imageIndex]);
  console.log(stoptime);
}

function setInterval_function() {
  length = imageArray.length;
  stoptime = length*1000;
  setInterval_ID = setInterval(changeImage, 1000);
  setTimeout(stop_interval, stoptime);
}


  function stop_interval()
  {
    clearInterval(setInterval_ID);
    console.log("stop!!")
  }
