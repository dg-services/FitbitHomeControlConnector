export function NodeRedAdapter() {
};

NodeRedAdapter.prototype.getStatus = function(methode, messaging) {
  let self = this;
  return new Promise(function() {
    let url = "http://192.168.0.201:1880/pumpControl"+methode;

    
    fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      'exec': 'status'
    } // body data type must match "Content-Type" header
  }).then(function(response) {
      return response.json();
    }).then(function(retval) {
     // console.log("Got JSON response from server:" + JSON.stringify(retval));
       if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
          messaging.peerSocket.send(retval);
       }
    }).catch(function (error) {
      console.log("Error:" + error);
    });
  });
}