# Want to use your <img src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Fitbit_logo16.svg" width="90" alt="fitbit" /> smart watch to control your smart home?



Here is a sample how I integrated my smart watch via a webservice

## HowTo

* Get a account on (https://studio.fitbit.com/)
* clone this repository to you local machine
* Upload the files into the sdk by drag and drop
* modify the URL of your webservice in the companion/nodeRedAdapter.js file
* Use the sample app :-)

## My smart home setup
* IOBroker for general IO control :-)
* node-red to connect the different IOs and actors
* node-red to provide the UI for my smart home
* node-red to provide a webservice that is called from the smart watch

## More information on the technical implementation of this app
* The fitbit app runs on the smartwatch to interact with the user
* The fitbit companion app (also included in the files above) controls the communication with the webservice and runs on the smartphone
* So the fitbit app communicates with the companion app. The companion app communicate with the webservice and vice versa
