import { wonders } from "./data.js";

// Initialize the map and set its view to a specific geographical location and zoom level
const map = L.map('map').setView([20.0, 0.0], 3);

// Load tiles (map graphics) from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);

// Store markers to use in search
const markers = [];

// Loop through wonders and show name + description in popup
wonders.forEach(wonder => {
  const popupHTML = `
    <div class="p-2 max-w-[240px]">
      <img src="${wonder.image}" alt="${wonder.name}" class="w-full h-32 object-cover rounded-lg mb-2 shadow-md" />
      <h2 class="text-xl font-semibold text-gray-800">${wonder.name}</h2>
      <p class="mt-1 text-sm text-gray-600">${wonder.description}</p>
    </div>
  `;

  const marker = L.marker(wonder.coords)
    .addTo(map)
    .bindPopup(popupHTML);

  // Save reference for search
  markers.push({ name: wonder.name.toLowerCase(), marker });
});

// Search Functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', e => {
  const query = e.target.value.trim().toLowerCase();
  if (query === '') return;

  const match = markers.find(m => m.name.includes(query));
  if (match) {
    map.setView(match.marker.getLatLng(), 6, { animate: true });
    match.marker.openPopup();
  }
});