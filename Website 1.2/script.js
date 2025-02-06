// Create stars background
function createStars() {
    const stars = document.querySelector('.stars');
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        stars.appendChild(star);
    }
}

// Create planets with scientifically accurate orbital periods (relative to Earth's period)
const planets = [
    { name: 'Mercury', size: 20, distance: 120, color: '#A0522D', period: 0.24 },  // 88 days
    { name: 'Venus', size: 25, distance: 160, color: '#DEB887', period: 0.62 },    // 225 days
    { name: 'Earth', size: 30, distance: 200, color: '#4169E1', period: 1 },       // 365 days
    { name: 'Mars', size: 22, distance: 240, color: '#CD5C5C', period: 1.88 },     // 687 days
    { name: 'Jupiter', size: 60, distance: 320, color: '#DAA520', period: 11.86 }, // 11.86 years
    { name: 'Saturn', size: 50, distance: 400, color: '#F4A460', period: 29.46 },  // 29.46 years
    { name: 'Uranus', size: 35, distance: 460, color: '#87CEEB', period: 84.01 },  // 84.01 years
    { name: 'Neptune', size: 35, distance: 520, color: '#1E90FF', period: 164.79 }, // 164.79 years
    { name: 'Pluto', size: 15, distance: 580, color: '#A0522D', period: 248.09 }   // 248.09 years
];

function createPlanets() {
    const solarSystem = document.querySelector('.solar-system');
    
    planets.forEach(planet => {
        const orbit = document.createElement('div');
        orbit.className = 'orbit';
        orbit.style.width = planet.distance * 2 + 'px';
        orbit.style.height = planet.distance * 2 + 'px';

        const planetDiv = document.createElement('div');
        planetDiv.className = 'planet';
        planetDiv.style.width = planet.size + 'px';
        planetDiv.style.height = planet.size + 'px';
        planetDiv.style.background = planet.color;
        planetDiv.style.left = planet.distance + 'px';
        
        // Base animation speed on Earth's orbital period (10 seconds)
        const baseSpeed = 10; // Earth takes 10 seconds for one orbit
        planetDiv.style.animation = `rotate ${baseSpeed * planet.period}s linear infinite`;

        orbit.appendChild(planetDiv);
        solarSystem.appendChild(orbit);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    createPlanets();
}); 