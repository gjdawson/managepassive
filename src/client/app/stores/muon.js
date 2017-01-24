var Muon = require("muonjs");
var muon = Muon.client({port: 9898});

var loadtime = new Date().getTime();

var history = [];
var current = [];


muon.subscribe('stream://photon/stream', {"stream-name":"test-stream"},
    function(terp) {

        if(terp['event-time'] < loadtime) {
            console.log('Saving historical sensor:' + terp.payload.sensorid);
            history.push(terp);
        } else {
            console.log('Current sensor: ' + terp.payload.sensorid);
            console.dir(terp.payload);
            current.push(terp);
        }
    },
    function(error) {
        console.log("Errored...");
        console.dir(error)
    },
    function() {
        console.log("COMPLETED STREAM")
    }
);