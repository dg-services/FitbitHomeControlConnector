import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import * as messaging from "messaging";

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  myLabel.text = `${hours}:${mins}`;
}

const onButton = document.getElementById("btn-on");
const offButton = document.getElementById("btn-off");

onButton.onclick = function(evt) {
  //console.log("Schalter An!");
  sendMessage("AN");
}
offButton.onclick = function(evt) {
  //console.log("Schalter Aus!");
  sendMessage("AUS");
}


messaging.peerSocket.onopen = function() {
}

messaging.peerSocket.onmessage = (evt) => {
  console.log(JSON.stringify(evt.data));
  
  if(evt.data.pumpStatus === 'ON'){
    onButton.value = 1;
  } else {
    offButton.value = 1;
  } 
    
}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);
}

// Send a message to the peer
function sendMessage(dataToSend) {

  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send the data to peer as a message
    messaging.peerSocket.send(dataToSend);
  }
}