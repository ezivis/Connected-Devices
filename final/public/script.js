/*
  WebSocket connection Script
  Uses standard W3C WebSocket API, not socket.io API
  Connects to a local websocket server

  created 7 Jan 2021
  modified 11 Nov 2021
  by Tom Igoe
*/
// get the server URL from the window.location:
// change 'wss' to 'ws' for running without SSL):
let serverURL = 'ws://' + window.location.host;
// the webSocket connection:
let socket;
// variables for the DOM elements:
let incomingSpan;
let outgoingText;
let connectionSpan;
let connectButton;

function setup() {
  // get all the DOM elements that need listeners:
  incomingSpan = document.getElementById('incoming');
  outgoingText = document.getElementById('outgoing');
  connectionSpan = document.getElementById('connection');
  connectButton = document.getElementById('connectButton');
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
  connectionSpan.innerHTML = "false";
  connectButton.value = "Connect";
}

function readIncomingMessage(event) {
  incomingSpan.innerHTML = event.data;
  allvalue = event.data;
  console.log(allvalue);
  if (allvalue<20){
    PickRandomWord(document.WordForm);
  }
}

function sendMessage() {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(outgoingText.value);
  }
}

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
incomingSpan.innerHTML = "I'm so" + " " +  words[rnd]
}
