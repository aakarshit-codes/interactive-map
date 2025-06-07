import { wonders } from "./data.js";

// Initialize the map and set its view to a specific geographical location and zoom level
const map = L.map('map').setView([20.0, 0.0], 2);

// Load tiles (map graphics) from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);

// Loop through wonders and show name + description in popup
wonders.forEach(wonder => {
  const popupHTML = `
    <div class="p-2 max-w-[240px]">
      <img src="${wonder.image}" alt="${wonder.name}" class="w-full h-32 object-cover rounded-lg mb-2 shadow-md" />
      <h2 class="text-xl font-semibold text-gray-800">${wonder.name}</h2>
      <p class="mt-1 text-sm text-gray-600">${wonder.description}</p>
    </div>
  `;

  L.marker(wonder.coords)
    .addTo(map)
    .bindPopup(popupHTML);
});