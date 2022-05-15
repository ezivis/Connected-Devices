var express = require('express');			    // include express.js
// a local instance of express:
var server = express();
// instance of the websocket server:
var wsServer = require('express-ws')(server);
// list of client connections:
var clients = new Array;
let knownClients1 = ["::ffff:192.168.3.113"];
let knownClients2 = ["::ffff:192.168.3.114"];
let knownClients3 = ["::ffff:192.168.3.115"];
// serve static files from /public:
server.use('/', express.static('public'));
// this runs after the server successfully starts:
function serverStart() {
  var port = this.address().port;
  console.log('Server listening on port ' + port);
}

function handleClient(thisClient, request) {
  console.log("New Connection");        // you have a new client
  clients.push(thisClient);    // add this client to the clients array
  

  function endClient() {
    // when a client closes its connection
    // get the client's position in the array
    // and delete it from the array:
    var position = clients.indexOf(thisClient);
    clients.splice(position,0); 
    console.log("connection closed");
  }

  thisClient.on('close', endClient);

  // if a client sends a message, print it out:
  function clientResponse(data) {
    console.log(request.connection.remoteAddress + ' : ' + data);
    if (knownClients1.includes(request.connection.remoteAddress)) {
      console.log("Hi I'm light snesor");
      broadcast(data);
    }
    if (knownClients2.includes(request.connection.remoteAddress)) {
      console.log("Hello,I'm 2");
      broadcast(+data + 2048);
    }
    if (knownClients3.includes(request.connection.remoteAddress)) {
      console.log("Hello,I'm door");
      broadcast(+data + 10001);
    }
  }

  // set up client event listeners:
  thisClient.on('message', clientResponse);
}

// This function broadcasts messages to all webSocket clients
function broadcast(data) {
  // iterate over the array of clients & send data to each
  for (let c in clients) {
    clients[c].send(data);
  }
}

// start the server:
server.listen(process.env.PORT || 3000, serverStart);
// listen for websocket connections:
server.ws('/', handleClient);
