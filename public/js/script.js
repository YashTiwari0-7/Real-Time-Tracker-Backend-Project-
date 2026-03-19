const socket = io();

let username = "";
let joined = false;

const joinBtn = document.getElementById("joinBtn");
const usernameInput = document.getElementById("username");

// Join event
joinBtn.addEventListener("click", () => {
    username = usernameInput.value.trim();

    if (!username) {
        alert("Please enter your name");
        return;
    }

    console.log("JOIN CLICKED");

    socket.emit("join", { username });
    joined = true;

    document.querySelector(".join-container").style.display = "none";

    //  MOVE LOCATION HERE
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("sendLocation", { latitude, longitude });

        }, (error) => {
            console.error("Location error:", error);
        }, {
            enableHighAccuracy: true
        });
    }
});

// Initialize Map
const map = L.map("map").setView([20, 0], 2);

// English tile layer (Carto)
L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap &copy; CARTO"
}).addTo(map);

const markers = {};
const paths = {};
let centered = false;


// Receive all users data
socket.on("users:update", (users) => {

    // Remove disconnected users
    Object.keys(markers).forEach((id) => {
        if (!users[id]) {
            map.removeLayer(markers[id]);
            map.removeLayer(paths[id]);
            delete markers[id];
            delete paths[id];
        }
    });

    // Update users
    Object.keys(users).forEach((id) => {
        const user = users[id];

        if (!user.latitude) return;

        const latlng = [user.latitude, user.longitude];

        // Marker
        if (markers[id]) {
            markers[id].setLatLng(latlng);
        } else {
            markers[id] = L.marker(latlng)
                .addTo(map)
                .bindPopup(user.username)
                .bindTooltip(user.username, { permanent: true });
        }

        // Path
        if (paths[id]) {
            paths[id].addLatLng(latlng);
        } else {
            paths[id] = L.polyline([latlng], { weight: 4 })
                .addTo(map);
        }

        // Center map only once
        if (!centered) {
            map.setView(latlng, 13);
            centered = true;
        }
    });
});