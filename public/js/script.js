const socket = io();


// Get user's location and send it to the server

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position) => {
        console.log(position.coords);
        const {longitude, latitude} = position.coords;
        
        socket.emit("sendLocation", {longitude, latitude})
    }, (error) => {
        console.error("Error getting location: ", error);
    },
    {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }
    
);

}

// Get Map and set view to user's location
const map = L.map("map").setView([0, 0], 10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

/*
// Light
const light = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png");

// Dark
const dark = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"); */
// User location marker
const markers = {};

socket.on("recievedLocation", (data) => {
    const {id, longitude, latitude} = data;
    map.setView([latitude, longitude], 10);
    if(markers[id]){
        markers[id].setLatLng([latitude, longitude]);
    }
    else{
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
});