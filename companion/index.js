import * as messaging from "messaging";
import { NodeRedAdapter } from "./nodeRedAdapter.js"

let nodeRedAdapter = new NodeRedAdapter();

function getStatusPump(){
  nodeRedAdapter.getStatus("Status", messaging);
}


messaging.peerSocket.onopen = () => {
  console.log("Ready");
  setInterval(getStatusPump,10000);
}

messaging.peerSocket.onerror = (err) => {
  console.log(`Connection error: ${err.code} - ${err.message}`);
}

messaging.peerSocket.onmessage = (evt) => {
  console.log(JSON.stringify(evt.data));
  switch (evt.data) {
    case 'AN':
      //console.log("Schalte Pumpe AN");  
      nodeRedAdapter.getStatus("Start", messaging);
      break;
    case 'AUS':
      //console.log("Schalte Pumpe AUS");  
      nodeRedAdapter.getStatus("Stop", messaging);
      break;
    default:
      console.log("Status undefiniert");  
  }
   

}

function sendMessage(dataToSend) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send the data to peer as a message
    //console.log("Nachricht: " +  JSON.stringify(dataToSend));
    messaging.peerSocket.send(dataToSend);
  }
}