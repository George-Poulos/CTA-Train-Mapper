'use strict';
let map;
let bounds;


let currentOpenWindow = null;
let gMarkers = [];
let blue;
let red;
let brown;

setInterval(function(){
    refreshMap();
},5000);

function refreshMap(){
    clearMarkers();
    getBlueLine();
}

function clearMarkers(){
    let len = gMarkers.length;
    for(let i = 0; i < len; i ++){
        gMarkers[i].setMap(null);
    }
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: new google.maps.LatLng(41.95793, -87.73813),
        mapTypeId: 'roadmap'
    });

    bounds  = new google.maps.LatLngBounds();
    Promise.resolve('success').resolve(getBlueLine());
}


function getBlueLine(){
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: "/getBlueLine",
            contentType: "application/json; charset=utf-8",
            success: function (msg) {
                console.log(msg);
                blue = msg;
                addMarkersToMap(blue, '/images/blueLine.png');
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
                console.log(msg);
                brown = msg;
                addMarkersToMap(brown, '/images/brownLine.png');
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
                console.log(msg);
                red = msg;
                addMarkersToMap(red, '/images/redLine.png');
            }
        });
        Promise.resolve('Success');
}

function addMarkersToMap(blue, markerIcon){
    let markers = [];
    for (let i = 0; i < blue.length; i++){
        let lat = parseFloat(blue[i].lat);
        let lon = parseFloat(blue[i].lon);
        let type = blue[i].nextStaNm;
        let tmp = new google.maps.LatLng(lat, lon);
        bounds.extend(tmp);
        markers.push({
            position: tmp,
            type: type,
            nextStaNm: blue[i].nextStaNm,
            arrT: blue[i].arrT,
            destNm: blue[i].destNm
        });
    }

    // Create markers.
    markers.forEach(function(feature) {
        let marker = new google.maps.Marker({
            position: feature.position,
            icon: markerIcon,
            map: map
        });
        gMarkers.push(marker);
        let infoWindow = new google.maps.InfoWindow({
            content : "<p>Next Stop : " + feature.nextStaNm + "</p><p>Direction : " + feature.destNm + "</p><p> Arrival Time : " + feature.arrT.substr(11) + "</p>"
        });
        marker.addListener('click', function() {

            if(currentOpenWindow !== null) {
                currentOpenWindow.close();
            }

            infoWindow.open(map, marker);
            currentOpenWindow = infoWindow;
        });
    });
    map.fitBounds(bounds);
    map.panToBounds(bounds);
}