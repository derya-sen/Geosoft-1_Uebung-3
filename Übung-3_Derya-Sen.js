"use strict"

//Website mithilfe von DOM-Manipulation einen Titel vergeben.
let title = document.createElement('title');
title.id = 'content';
title.innerHTML = 'Geosoftware 1';
document.body.appendChild(title);

// Umrechnung von Grad-Koordinaten nach Koordinaten im Bogenmaß. Die Funktion wurde in eine Arrow-Funktion umgeschrieben.
let deg2rad = deg => {
  return deg * (Math.PI / 180);
}

// Berechnung der Distanz von 2 Koordinatenpunketen in Km mit der 'Haversine'-Formel
function getDistance(point1, point2) {
  var R = 6371; //Erdradius in km
  var dLat = deg2rad(point2[1] - point1[1]); //Umrechnung Breitengrad in Bogenmaß-Koordinaten
  var dLon = deg2rad(point2[0] - point1[0]); //Umrechnung Längengrad in Bogenmaß-Koordinaten
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(point1[1])) * Math.cos(deg2rad(point2[1])) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2); // Berechnet Quadrat der halben Sehnlänge zwischen den Punkten
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); //Berechnet Winkelabstand im Bogenmaß
  var d = Math.round((R * c) * 100) / 100; //Berechnung Distanz in km und Rundung auf 2 Nachkommastellen
  //console.log(d);
  return d;
}



/* Ich habe hier 2 verschiedene fillTable funktionen, die erste war meine Funktion, die ich in den anderen Übungen
auch verwendet habe und die auch funktioniert hatte. Aber jetzt funktioniert sie auch.
Mit der zweiten fillTable Funktion lässt sich nur eine Bushaltestelle darstellen, dafür aber mehrfach. 
Dieses Problem konnte ich nicht beheben.*/

/* Die Funktion 'fillTable()' iteriert durch die im HTML-Teil generierte Tabelle und füllt diese mit 
dem Namen der Stadt, dem zugeörigen Längen- und Breitengrad und dem berechneten Abstand
function fillTable(features) {
  var table = document.getElementById("mytable");
  for (var i = 0; i < features.length; i++) {
    let feature = features[i];
    var Row = table.insertRow(1);
    var Zelle = Row.insertCell(0);
    Zelle.innerHTML =  feature[0]
    var Zelle2 = Row.insertCell(1);
    Zelle2.innerHTML = feature[1]
    var Zelle3 = Row.insertCell(2);
    Zelle3.innerHTML = feature[2]
  }
}
*/

function fillTable() {
  var table = document.getElementById("mytable");
  var Row = table.insertRow(1);
  var Zelle = Row.insertCell(0);
  Zelle.innerHTML = bushaltestelle[0]
  var Zelle2 = Row.insertCell(1);
  Zelle2.innerHTML = bushaltestelle[1]
  var Zelle4 = Row.insertCell(2);
  Zelle4.innerHTML = bushaltestelle[2]
}

// Im Folgenden wird die erstellte Tabelle sortiert.

/* Die Funktion 'getCellValue' dient zum Abruf des Inhalts einer Zelle mit dem Tabellezeilen- und 
Spaltenindex. Dabei kann man mit 'x.children[i]' die ith-Spalte aufrufen und mit 'innerText' oder 
'textContent' den Inhalt erhalten. */
const getCellValue = (tableRow, columnIndex) => tableRow.children[columnIndex].innerText ||
  tableRow.children[columnIndex].textContent;


/* Die Funktion 'comparer' wird genutz, um zwei Werte einer Tabelle miteinander zu vergleichen.
Dabei wird zuerst geprüft, ob beide Werte gültige Ganzzahlen oder Strings sind und anschließend verglichen, 
um die richtige Reihenfolge zu finden*/
const comparer = (idx, asc) => (r1, r2) => ((el1, el2) =>
  el1 !== '' && el2 !== '' && !isNaN(el1) && !isNaN(el2) ? el1 - el2 : el1.toString().localeCompare(el2)
)(getCellValue(asc ? r1 : r2, idx), getCellValue(asc ? r2 : r1, idx));


// Folgender Algorithmus sortiert die HTML-Tabelle mit Hilfe der 'getCellValue'- und 'comparer'-Funktionen
document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => { // macht alle Kopfzeilen in der Tabelle anklickbar
  const table = th.closest('table'); // Alle Zeilen (ohne Kopfzeile) in der ausgewählten Spalte finden
  Array.from(table.querySelectorAll('tr:nth-child(n+2)')) // sortiert mit der sort-Funktion und der comparer-Funktion
    .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
    .forEach(tr => table.appendChild(tr)); // fügt sortierte Zeilen wieder in Tabelle ein
})));


//Im Folgenden kann man seinen Standort als GeoJSON eingeben oder abfragen

var standort;

document.getElementById("koordinaten").addEventListener("click", getCoordinatesFromJSON)
//Eingegebene GeoJson-Koordinaten erhalten und umschreiben
function getCoordinatesFromJSON() {
  const input = document.querySelector('input');
  let object = JSON.parse(input.value);
  standort = [object.geometry.coordinates[0], object.geometry.coordinates[1]]
  console.log(standort); //Gibt die Koordinaten des eingegebenen JSON-Objekts wieder.
  return standort;
}

//Browserstandort abfragen
var x = document.getElementById("location");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  // x.innerHTML = "Längengrad: "  + position.coords.longitude +
  // "<br> Breitengrad: " + position.coords.latitude ;
  standort = [position.coords.longitude, position.coords.latitude];
  console.log(standort);
  return standort;
}





