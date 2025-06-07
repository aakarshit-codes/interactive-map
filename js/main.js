import { wonders } from "./data.js";

// Initialize the map and set its view to a specific geographical location and zoom level
const map = L.map('map').setView([20.0, 0.0], 3);

// Load tiles (map graphics) from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);

// Store markers to use in search
const categorisedMarkers = [];

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
  categorisedMarkers.push({
    name: wonder.name.toLowerCase(),
    marker,
    category: wonder.category,
  });
});

const categorySelect = document.getElementById('categorySelect');

function filterWonders() {
  const category = categorySelect.value;
  categorisedMarkers.forEach(({ marker, category: markerCategory }) => {
    if (category === 'All' || markerCategory === category) {
      if (!map.hasLayer(marker)) marker.addTo(map);
    } else {
      if (map.hasLayer(marker)) map.removeLayer(marker);
    }
  });
}

categorySelect.addEventListener('change', filterWonders);

// Search Functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', e => {
  const query = e.target.value.trim().toLowerCase();
  if (query === '') return;

  const match = categorisedMarkers.find(m => m.name.includes(query));
  if (match) {
    map.setView(match.marker.getLatLng(), 6, { animate: true });
    match.marker.openPopup();
  }
});

//Geolocation Functionality
const locateBtn = document.getElementById('locateBtn');

locateBtn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      map.setView([latitude, longitude], 6, { animate: true });

      L.circleMarker([latitude, longitude], {
        radius: 8,
        fillColor: '#3B82F6',
        fillOpacity: 0.7,
        color: '#1D4ED8',
        weight: 2,
      })
        .addTo(map)
        .bindPopup('You are here.')
        .openPopup();

      locateBtn.textContent = '📍';
    },
    () => {
      alert('Unable to retrieve your location.');
      locateBtn.textContent = '📍';
    }
  );
});