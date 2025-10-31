import '../css/styles.css';
import 'leaflet/dist/leaflet.css'; // We must import the CSS
import Chart from 'chart.js/auto';
import L from 'leaflet';

// --- MOCK COMMUNITY DATA ---
const communityData = {
  communityA: {
    name: 'Sunrise Valley',
    coords: [25.79, -80.22], // Miami Area
    population: 12500,
    riskLevel: 'Low',
    riskClass: 'risk-low',
    riskColor: '#1e8755',
    metrics: { 'Air Quality (AQI)': 30, 'Park Access (%)': 85, 'Clinic Density': 90 }
  },
  communityB: {
    name: 'Downtown Core',
    coords: [25.77, -80.19], // Miami Downtown
    population: 45000,
    riskLevel: 'Medium',
    riskClass: 'risk-mid',
    riskColor: '#f59c00',
    metrics: { 'Air Quality (AQI)': 75, 'Park Access (%)': 40, 'Clinic Density': 60 }
  },
  communityC: {
    name: 'Ironwood District',
    coords: [25.75, -80.2], // Near industrial
    population: 22000,
    riskLevel: 'High',
    riskClass: 'risk-high',
    riskColor: '#d9534f',
    metrics: { 'Air Quality (AQI)': 120, 'Park Access (%)': 15, 'Clinic Density': 25 }
  }
};

// --- DOM ELEMENT SELECTORS ---
const elements = {
  commName: document.getElementById('comm-name'),
  commRisk: document.getElementById('comm-risk'),
  commPop: document.getElementById('comm-pop'),
  btnCommA: document.getElementById('btn-comm-a'),
  btnCommB: document.getElementById('btn-comm-b'),
  btnCommC: document.getElementById('btn-comm-c')
};

// --- STATE ---
let map;
let metricsChart;
let currentRiskCircle;

// --- FUNCTIONS ---

/**
 * Initializes the Leaflet map on page load.
 */
function initMap() {
  map = L.map('map').setView([25.774, -80.2], 12); // Center on Miami

  // Add the base map tile layer (OpenStreetMap)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
}

/**
 * Updates the entire dashboard with data from a community object.
 * @param {object} community - The community data object.
 */
function updateDashboard(community) {
  // 1. Update the info card details
  elements.commName.textContent = community.name;
  elements.commRisk.textContent = community.riskLevel;
  elements.commPop.textContent = community.population.toLocaleString();

  // Update risk class for styling
  elements.commRisk.className = community.riskClass;

  // 2. Update the map view
  map.flyTo(community.coords, 14); // Zoom in on the community

  // Remove the previous risk circle if it exists
  if (currentRiskCircle) {
    currentRiskCircle.remove();
  }

  // Add a new circle representing the risk
  currentRiskCircle = L.circle(community.coords, {
    color: community.riskColor, // Border color
    fillColor: community.riskColor, // Fill color
    fillOpacity: 0.3,
    radius: 1200 // Radius in meters
  })
    .addTo(map)
    .bindPopup(`<b>${community.name}</b><br>Risk: ${community.riskLevel}`)
    .openPopup();

  // 3. Update the bar chart
  updateChart(community.metrics);
}

/**
 * Creates or updates the risk metrics bar chart.
 * @param {object} metrics - The metrics data for the community.
 */
function updateChart(metrics) {
  const ctx = document.getElementById('metricsChart').getContext('2d');
  const labels = Object.keys(metrics);
  const data = Object.values(metrics);

  if (metricsChart) {
    metricsChart.data.labels = labels;
    metricsChart.data.datasets[0].data = data;
    metricsChart.update();
  } else {
    metricsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Risk Factor Score (Higher is worse for AQI)',
            data: data,
            backgroundColor: [
              'rgba(217, 83, 79, 0.6)', // Red for AQI
              'rgba(30, 135, 85, 0.6)', // Green for Parks
              'rgba(0, 123, 255, 0.6)' // Blue for Clinics
            ],
            borderColor: ['rgba(217, 83, 79, 1)', 'rgba(30, 135, 85, 1)', 'rgba(0, 123, 255, 1)'],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        indexAxis: 'y', // Create a horizontal bar chart
        scales: {
          x: {
            beginAtZero: true,
            max: 150 // Set a max for AQI
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
}

// --- EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the map first
  initMap();

  // Load Community A by default
  updateDashboard(communityData.communityA);

  // Set up buttons
  elements.btnCommA.addEventListener('click', () => updateDashboard(communityData.communityA));
  elements.btnCommB.addEventListener('click', () => updateDashboard(communityData.communityB));
  elements.btnCommC.addEventListener('click', () => updateDashboard(communityData.communityC));
});
