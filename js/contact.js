document.addEventListener('DOMContentLoaded', () => {

    // --- Page Load Animations using GSAP ---
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.page-title', { opacity: 0, y: 30, duration: 0.8 })
      .from('.page-subtitle', { opacity: 0, y: 30, duration: 0.8 }, '-=0.6')
      .from('.contact-card', { 
          opacity: 0, 
          y: 50, 
          duration: 0.6, 
          stagger: 0.2 
        }, '-=0.5')
      .to('.map-container', { opacity: 1, duration: 1 }, '-=0.5');


    // --- Leaflet.js Interactive Map Initialization ---
    // Coordinates for Silicon Valley (example location)
    const mapCoordinates = [37.3861, -122.0839]; 
    
    // Initialize the map
    const map = L.map('map').setView(mapCoordinates, 13);

    // Add a dark-themed tile layer (from CartoDB)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Add a marker for the company location
    const marker = L.marker(mapCoordinates).addTo(map);

    // Add a popup to the marker
    marker.bindPopup("<b>Aegis Auto Security HQ</b><br>Your vehicle's fortress.").openPopup();

});
