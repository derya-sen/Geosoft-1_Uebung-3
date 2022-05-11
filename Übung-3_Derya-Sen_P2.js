"use strict"
// XMLHttpRequest 
/** 
* @function loadDoc
* @desc Requests data from the website
**/
function loadDoc() {
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let res = JSON.parse(this.responseText)
            //console.log(res)

            getStation(res.features)
        }
    }
    xhttp.open("GET", "https://rest.busradar.conterra.de/prod/haltestellen", true)
    xhttp.send()
}

let bushaltestelle = [];
let distance = [];

function getStation(features) {
    var Abstand = 0;
    for (var i = 0; i < features.length; i++) {
        let feature = features[i]
        var longitude = feature.geometry.coordinates[0]
        var latitude = feature.geometry.coordinates[1]
        var coordinate = [longitude, latitude]
        var stationName = feature.properties.lbez
        var nr = feature.properties.nr
        Abstand = getDistance(coordinate, standort);
        distance.push(Abstand);
        bushaltestelle.push(stationName, coordinate, distance[i]);
        console.log(nr);
        console.log(bushaltestelle);
        fillTable(bushaltestelle);

    }
}


// Meine Überlegung die Bushaltestellen, die am nächsten sind zu filtern.
/*
//let nextBusStation = nextStation(bushaltestelle);
function nextStation(features) {
    for (var i = 0; i < features.length; i++) {
        let feature = features[i];
        if (feature[2] > 1.00) {
            feature.splice(i, 1);
            i--;
        }
    }
}
*/

class busstation {
    constructor(lbez, coordinates, nr) {
        this.lbez = lbez
        this.coordinates = coordinates
        this.nr = nr
    }
}

