'use strict';

let map;
let bounds;


let currentOpenWindow = null;
let gMarkers = [];
let gWindows = [];

let blue;
let red;
let brown;

let i = 0;

let refreshTime = 10000;

setInterval(function(){
    refreshMap();
},refreshTime);

function refreshMap(){
   // clearMarkers();
    getBlueLine();
}

function clearMarkers(){
    let len = gMarkers.length;
    for(let i = 0; i < len; i ++){
        gMarkers[i].setMap(null);
    }
}

/**
 * Google Api initMap Function (gets called onLoad)
 */
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: new google.maps.LatLng(41.95793, -87.73813),
        mapTypeId: 'roadmap'
    });

    bounds  = new google.maps.LatLngBounds();
    Promise.resolve('success').then(getBlueLine());
}


function getBlueLine(){
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: "/getBlueLine",
            contentType: "application/json; charset=utf-8",
            success: function (msg) {
                blue = msg;
                addMarkersToMap(blue, 'blue', '/images/blueLine.png');
            }
        });
        Promise.resolve('success').then(getBrownLine());
}

function getBrownLine(){
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: "/getBrownLine",
            contentType: "application/json; charset=utf-8",
            success: function (msg) {
                brown = msg;
                addMarkersToMap(brown, 'brown', '/images/brownLine.png');
            }
        });
        Promise.resolve('success').then(getRedLine());
}

function getRedLine(){
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: "/getRedLine",
            contentType: "application/json; charset=utf-8",
            success: function (msg) {
                red = msg;
                addMarkersToMap(red, 'red', '/images/redLine.png');
            }
        });
        Promise.resolve('Success');
}

function addMarkersToMap(trains, lineColor, markerIcon){
    let markers = [];

    for (let i = 0; i < trains.length; i++){
        let lat = parseFloat(trains[i].lat);
        let lon = parseFloat(trains[i].lon);
        let type = trains[i].nextStaNm;
        let tmp = new google.maps.LatLng(lat, lon);
        bounds.extend(tmp);
        markers.push({
            position: tmp,
            type: type,
            nextStaNm: trains[i].nextStaNm,
            arrT: trains[i].arrT,
            destNm: trains[i].destNm,
            rn : trains[i].rn
        });
    }

    markers.forEach(function(feature) {

        if((lineColor + feature.rn) in gMarkers){
            gMarkers[lineColor + feature.rn].setPosition(feature.position);
            gWindows[lineColor + feature.rn].setContent("<p>Next Stop : " + feature.nextStaNm + "</p><p>Direction : " + feature.destNm + "</p><p> Arrival Time : " + feature.arrT.substr(11) + "</p><p>Run Number : " + feature.rn + "</p>");
        }

        else {
            gMarkers[lineColor + feature.rn] = new google.maps.Marker({
                position: feature.position,
                icon: markerIcon,
                map: map
            });

            gWindows[lineColor + feature.rn] = new google.maps.InfoWindow({
                content: "<p>Next Stop : " + feature.nextStaNm + "</p><p>Direction : " + feature.destNm + "</p><p> Arrival Time : " + feature.arrT.substr(11) + "</p><p>Run Number : " + feature.rn + "</p>"
            });

            let infoWindow = gWindows[lineColor + feature.rn];
            let marker = gMarkers[lineColor + feature.rn];


            marker.addListener('click', function () {

                if (currentOpenWindow !== null) {
                    currentOpenWindow.close();
                }

                infoWindow.open(map, marker);
                currentOpenWindow = infoWindow;
            });
        }
    });
    if(i === 0){
        map.fitBounds(bounds);
        map.panToBounds(bounds);
    }
    i++;

}