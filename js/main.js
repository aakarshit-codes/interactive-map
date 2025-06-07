import { wonders } from "./data.js";

// Initialize the map and set its view to a specific geographical location and zoom level
const map = L.map('map').setView([20.0, 0.0], 2);

// Load tiles (map graphics) from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);

wonders.forEach(wonder => {
  L.marker(wonder.coords)
    .addTo(map)
    .bindPopup(`<h2 class="text-lg font-bold">${wonder.name}</h2>`);
});