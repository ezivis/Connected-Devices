let serverURL = 'ws://' + window.location.host;
// the webSocket connection:
let socket;
// variables for the DOM elements:
let incominglightSpan;
let incomingTempSpan;
let incomingDoorSpan;
let checkdooropen = false;
let checkdooropencheck = false;
let outgoingText;
let connectionSpan;
let connectButton;
let allvalue;
let allvaluetemp;
let allvaluetempshow;
let allvaluedoorshow;
let myIvid;
let myIvid2;
let myIvid3;
var imageIndex = 0;
let interval = false;
var wfd,wfd2;
const element1 = document.getElementById("livedata");
const element2 = document.getElementById("livedata2");
const element3 = document.getElementById("livedata3");

function setup() {
  // get all the DOM elements that need listeners:
  incominglightSpan = document.getElementById('incominglight');
  incomingTempSpan = document.getElementById('incomingTemp');
  incomingDoorSpan = document.getElementById('incomingDoor')

  outgoingText = document.getElementById('outgoing');
  connectionSpan = document.getElementById('connection');
  connectButton = document.getElementById('connectButton');
  myIvid = document.getElementById("myVideo");
  myIvid2 = document.getElementById("myVideo2");
  myIvid3 = document.getElementById("myVideo3");
  waitdatajs = document.getElementById("waitdata");
  waitdatajs2 = document.getElementById("waitdata2");
  wfd = document.getElementById("waitdatatext")
  wfd2 = document.getElementById("waitdatatext2")
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

const lightarray = [
  "vid/light/l1.mp4",
  "vid/light/l2.mp4",
  "vid/light/l3.mp4",
  "vid/light/l4.mp4",
  "vid/light/l5.mp4",
  "vid/light/l6.mp4",
  "vid/light/l7.mp4",
  "vid/light/l8.mp4",
  "vid/light/l9.mp4",
  "vid/light/l10.mp4",
  "vid/light/l11.mp4",
  "vid/light/l12.mp4",
  "vid/light/l13.mp4",
  "vid/light/l14.mp4",
  "vid/light/l15.mp4"
];

const darkarray = [
  "vid/dark/1.mp4",
  "vid/dark/2.mp4",
  "vid/dark/3.mp4",
  "vid/dark/4.mp4",
  "vid/dark/5.mp4",
  "vid/dark/6.mp4",
  "vid/dark/7.mp4",
  "vid/dark/8.mp4",
  "vid/dark/9.mp4",
  "vid/dark/10.mp4",
  "vid/dark/11.mp4",
  "vid/dark/12.mp4",
  "vid/dark/13.mp4",
  "vid/dark/14.mp4",
  "vid/dark/15.mp4"
];

const coldarray = [
  "vid/light/l1.mp4",
  "vid/light/l2.mp4",
  "vid/light/l3.mp4",
  "vid/light/l4.mp4",
  "vid/light/l5.mp4",
  "vid/light/l6.mp4",
  "vid/light/l7.mp4",
  "vid/light/l8.mp4",
  "vid/light/l9.mp4",
  "vid/light/l10.mp4",
  "vid/light/l11.mp4",
  "vid/light/l12.mp4",
  "vid/light/l13.mp4",
  "vid/light/l14.mp4",
  "vid/light/l15.mp4"
];

const hotarray = [
  "vid/dark/1.mp4",
  "vid/dark/2.mp4",
  "vid/dark/3.mp4",
  "vid/dark/4.mp4",
  "vid/dark/5.mp4",
  "vid/dark/6.mp4",
  "vid/dark/7.mp4",
  "vid/dark/8.mp4",
  "vid/dark/9.mp4",
  "vid/dark/10.mp4",
  "vid/dark/11.mp4",
  "vid/dark/12.mp4",
  "vid/dark/13.mp4",
  "vid/dark/14.mp4",
  "vid/dark/15.mp4"
];


const offarray = [
  "vid/light/l1.mp4",
  "vid/light/l2.mp4",
  "vid/light/l3.mp4",
  "vid/light/l4.mp4",
  "vid/light/l5.mp4",
  "vid/light/l6.mp4",
  "vid/light/l7.mp4",
  "vid/light/l8.mp4",
  "vid/light/l9.mp4",
  "vid/light/l10.mp4",
  "vid/light/l11.mp4",
  "vid/light/l12.mp4",
  "vid/light/l13.mp4",
  "vid/light/l14.mp4",
  "vid/light/l15.mp4"
];

const onarray = [
  "vid/dark/1.mp4",
  "vid/dark/2.mp4",
  "vid/dark/3.mp4",
  "vid/dark/4.mp4",
  "vid/dark/5.mp4",
  "vid/dark/6.mp4",
  "vid/dark/7.mp4",
  "vid/dark/8.mp4",
  "vid/dark/9.mp4",
  "vid/dark/10.mp4",
  "vid/dark/11.mp4",
  "vid/dark/12.mp4",
  "vid/dark/13.mp4",
  "vid/dark/14.mp4",
  "vid/dark/15.mp4"
];

var lightwords = [
  "The sun obscured by the moon emits light",
  "Starlight shines in the dark night",
  "Colorful photons leaping",
  "Flashing light gradually harsh",
  "Light surrounds me",
  "Light leaps around me",
  "The light illuminates the lonely me in the forest",
  "The white sprite dances around me",
  "I am in a space full of bright light",
  "The light gradually illuminates my room",
  "The white shining Milky Way travels through the stars",
  "The shining photons gradually grow larger",
  "The colored light gradually surrounded me",
  "L9",
  "L9",
];
var darkwords = [
  "The black cowboy is staring the sky.",
  "Black eyes were staring at me.",
  "The black night sky kept drawing me in.",
  "As the night sky continues to unfold I see the dark messenger",
  "As the night sky continues to unfold I see the dark messenger",
  "Abyss of black clouds",
  "The bubble of lonely darkness",
  "The shimmering light of the dark forest",
  "Black staff in dark spaces",
  "My Ember in the Darkness",
  "The dark eyes in the abyss",
  "Mother Starry Sky Embraces Black Holes",
  "Falling through a black hole",
  "Things swallowed by a black hole",
  "Falling into the dark abyss",
];
var hot = ["热死了","好烧啊","浑身是汗","好他妈热啊","开下空调谢谢"];
var cold = ["冻死了","好冷啊","我在北极","冷死了","给点温暖"];
var on = ["呛死了","开下抽风机","你在抽烟吗","咳咳咳","好大的烟啊"]
var off = ["赞美空气","清新空气","谢谢氧气","我好了","好纯洁啊"]


function openConnection() {
  // display the change of state:
  connectionSpan.innerHTML = "true";
  connectButton.value = "Disconnect";
    changetext()
    disconnectButtondoor.style.visibility = "hidden"
    connectButtondoor.style.visibility = "visible"
}


function closeConnection() {
  // display the change of state:
  connectionSpan.innerHTML = "false";
  connectButton.value = "Connect";
  incomingDoorSpan.innerHTML ="[" + " " + "Door is Closing" + " " + "]";
  myIvid3.setAttribute("src", "vid/Dark1.mp4");
  element3.innerHTML = "off";
  disconnectButtondoor.style.visibility = "visible"
  connectButtondoor.style.visibility = "hidden"
  tempcoverred.style.opacity =0;
}

var data1;
var data2;
var data3;
var videocheck = false;
var randomnum = 0;
var randomnumtemp = 0;
var randomnumdoor = 0;

function changetext() {
  // 这是lightsensor的
  // var randomnum = Math.floor(Math.random() * darkwords.length);
  // var randomnumtemp = Math.floor(Math.random() * cold.length);


  // console.log(randomnum);
  if (allvalue < 1024) {
    data1 = allvalue;
    if (data1 < 100) {
      incominglightSpan.innerHTML = "[" + " " +darkwords[randomnum]+ " " + "]";
      myIvid.setAttribute("src", darkarray[randomnum]);
    } else if (data1 > 100) {
      incominglightSpan.innerHTML = "[" + " " + lightwords[randomnum] + " " + "]";
      myIvid.setAttribute("src", lightarray[randomnum]);
    }
  }
  
    if (allvaluetempshow < 20) {
      incomingTempSpan.innerHTML = cold[randomnumtemp];
      myIvid2.setAttribute("src", coldarray[randomnumtemp]);
    } else if (allvaluetempshow > 20) {
      incomingTempSpan.innerHTML = "[" + " " + hot[randomnumtemp] + " " + "]";
      myIvid2.setAttribute("src", hotarray[randomnumtemp]);
    }


  videocheck = true;
  if(randomnum == darkwords.length){
    randomnum = 0;
  }else{
    randomnum = randomnum+1;
  }

  if(randomnumtemp == cold.length){
    randomnumtemp = 0;
  }else{
    randomnumtemp = randomnumtemp+1;
  }
}

function readIncomingMessage(event) {
  if (event.data < 1024) {
    allvalue = Math.floor(Math.random() * (event.data - (event.data - 1000) + 1) + (event.data - 1000))
    element1.innerHTML = "Light Value:" + "{" + event.data + "}";
    lightcoverblack.style.opacity = 8/event.data;
    lightcoverwhite.style.opacity = event.data/2048
  }

  if (event.data > 2048 && event.data < 3072) {
    allvaluetemp = Math.random() * (event.data - (event.data - 30) + 1) + (event.data - 30);
    allvaluetempshow = Math.round((event.data-2048) * 100) / 100;
    element2.innerHTML = allvaluetempshow + "°C";
    tempcoverred.style.opacity =allvaluetempshow * (1/150);
  }

  if (event.data > 10000) {
    allvaluedoorshow = Math.floor(event.data-10001);
    if (allvaluedoorshow ==1){
      allvaluedoorshowtext = "on";
      checkdooropen = true;
    }else{
      allvaluedoorshowtext = "off";
      checkdooropen = false;
    }
  }

  if (checkdooropen == true && checkdooropen!=checkdooropencheck) {
    // var randomnumdoor = Math.floor(Math.random() * on.length);

    incomingDoorSpan.innerHTML ="[" + " " + on[randomnumdoor] + " " + "]";
    myIvid3.setAttribute("src", onarray[randomnumdoor]);
    element3.innerHTML = allvaluedoorshowtext;
    checkdooropencheck = true;
    if(randomnumdoor == on.length){
      randomnumdoor = 0;
    }else{
      randomnumdoor = randomnumdoor+1;
    }
    console.log(randomnumdoor);
  }else if(checkdooropen == false && checkdooropen!=checkdooropencheck){
    // var randomnumdoor = Math.floor(Math.random() * on.length);

    incomingDoorSpan.innerHTML ="[" + " " + "Door is Closing" + " " + "]";
    myIvid3.setAttribute("src", "vid/Dark1.mp4");
    element3.innerHTML = allvaluedoorshowtext;
    checkdooropencheck = false;
  }
  // console.log(allvalue);
  if (videocheck === false) {
    changetext()
  }
}

var setIntervalgloab = setInterval(changetext, 60000);
var livedatacount = 0;
var datacheck;
var checkifdataincome = setInterval(function checkdata() {
  if (datacheck == allvalue) {
    // console.log("The value hasn't changed.");
    wfd.style.visibility = "visible";
    waitdatajs.style.visibility = "visible";
    incominglightSpan.style.visibility = "hidden"
    disconnectButtonlight.style.visibility = "visible"
    connectButtonlight.style.visibility = "hidden"
    element1.style.visibility = "hidden";
    myIvid.style.display = "none";

  } else {
    // console.log("The value has changed");
    datacheck = allvalue;
    waitdatajs.style.visibility = "hidden";

    wfd.style.visibility = "hidden";
    disconnectButtonlight.style.visibility = "hidden"
    connectButtonlight.style.visibility = "visible"
    incominglightSpan.style.visibility = "visible";
    element1.style.visibility = "visible";
    myIvid.style.display = "block";
  }
}, 1500);


var datacheck2;
var checkifdataincome2 = setInterval(function checkdata2() {
  if (datacheck2 == allvaluetemp) {
    console.log("The Temp value hasn't changed.");
    element2.style.visibility = "hidden";
    waitdatajs2.style.visibility = "visible";
    wfd2.style.visibility = "visible";
    disconnectButtontemp.style.visibility = "visible"
    connectButtontemp.style.visibility = "hidden"
    myIvid2.style.display = "none";
    incomingTempSpan.style.visibility = "hidden"
    tempcoverred.style.opacity =0;

  } else {
    console.log("The Temp value has changed");
    datacheck2 = allvaluetemp;
    element2.style.visibility = "visible";
    waitdatajs2.style.visibility = "hidden";
    wfd2.style.visibility = "hidden";
    disconnectButtontemp.style.visibility = "hidden"
    connectButtontemp.style.visibility = "visible"
    myIvid2.style.display = "block";
    incomingTempSpan.style.visibility = "visible";
  }
}, 1500);

function sendMessage() {
  //if the socket's open, send a message:
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(outgoingText.value);
  }
}

// add a listener for the page to load:
window.addEventListener('load', setup);
