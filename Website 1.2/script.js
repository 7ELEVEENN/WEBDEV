// Create stars with different sizes and twinkle effects
function createStars() {
    const stars = document.querySelector('.stars');
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = `${Math.random() * 1}s`;
        stars.appendChild(star);
    }
}

// Updated planets data with more accurate relative sizes and real textures
const planets = [
    { 
        name: 'Mercury', 
        size: 10, 
        distance: 120, 
        color: 'linear-gradient(90deg, #A0522D, #8B4513)', 
        period: 0.24,
        tilt: 0.03
    },
    { 
        name: 'Venus', 
        size: 15, 
        distance: 160, 
        color: 'linear-gradient(90deg, #DEB887, #D2691E)', 
        period: 0.62,
        tilt: 177.3
    },
    { 
        name: 'Earth', 
        size: 16, 
        distance: 200, 
        color: 'linear-gradient(90deg, #4169E1, #1E90FF)', 
        period: 1,
        tilt: 23.5
    },
    { 
        name: 'Mars', 
        size: 12, 
        distance: 240, 
        color: 'linear-gradient(90deg, #CD5C5C, #8B0000)', 
        period: 1.88,
        tilt: 25.2
    },
    { 
        name: 'Jupiter', 
        size: 40, 
        distance: 320, 
        color: 'linear-gradient(90deg, #DAA520, #CD853F)', 
        period: 11.86,
        tilt: 3.1
    },
    { 
        name: 'Saturn', 
        size: 35, 
        distance: 400, 
        color: 'linear-gradient(90deg, #F4A460, #DEB887)', 
        period: 29.46,
        tilt: 26.7
    },
    { 
        name: 'Uranus', 
        size: 25, 
        distance: 460, 
        color: 'linear-gradient(90deg, #87CEEB, #4169E1)', 
        period: 84.01,
        tilt: 97.8
    },
    { 
        name: 'Neptune', 
        size: 24, 
        distance: 520, 
        color: 'linear-gradient(90deg, #1E90FF, #0000CD)', 
        period: 164.79,
        tilt: 28.3
    },
    { 
        name: 'Pluto', 
        size: 8, 
        distance: 580, 
        color: 'linear-gradient(90deg, #A0522D, #8B4513)', 
        period: 248.09,
        tilt: 122.5
    }
];

// Add moon data
const moon = {
    size: 4,
    distance: 20,
    color: '#D3D3D3',
    period: 0.073 // 27.3 days relative to Earth's year
};

// Add asteroid belt configuration
const asteroidBelt = {
    minRadius: 280,
    maxRadius: 300,
    numAsteroids: 200
};

function createPlanets() {
    const solarSystem = document.querySelector('.solar-system');
    
    planets.forEach((planet) => {
        const orbit = document.createElement('div');
        orbit.className = 'orbit';
        orbit.style.width = `${planet.distance * 2}px`;
        orbit.style.height = `${planet.distance * 2}px`;

        const planetDiv = document.createElement('div');
        planetDiv.className = 'planet';
        planetDiv.style.width = `${planet.size}px`;
        planetDiv.style.height = `${planet.size}px`;
        planetDiv.style.background = planet.color;

        // Set CSS variables for the planet
        planetDiv.style.setProperty('--size', `${planet.size}px`);
        planetDiv.style.setProperty('--orbit-radius', `${planet.distance}px`);
        planetDiv.style.setProperty('--start-angle', `${Math.random() * 360}deg`);

        // Add planet label
        const label = document.createElement('div');
        label.className = 'planet-label';
        label.textContent = planet.name;
        planetDiv.appendChild(label);

        // Set animation
        const baseSpeed = 10; // Earth's orbital period in seconds
        const duration = baseSpeed * planet.period;
        planetDiv.style.animation = `orbit ${duration}s linear infinite`;

        // Add click event for info card
        planetDiv.addEventListener('click', () => showPlanetInfo(planet));

        // Add Saturn's rings
        if (planet.name === 'Saturn') {
            const rings = document.createElement('div');
            rings.className = 'saturn-rings';
            rings.style.width = `${planet.size * 2.2}px`;
            rings.style.height = `${planet.size * 0.5}px`;
            planetDiv.appendChild(rings);
        }

        // Add Moon to Earth
        if (planet.name === 'Earth') {
            const moonOrbit = document.createElement('div');
            moonOrbit.style.position = 'absolute';
            moonOrbit.style.width = `${moon.distance * 2}px`;
            moonOrbit.style.height = `${moon.distance * 2}px`;
            
            const moonDiv = document.createElement('div');
            moonDiv.className = 'moon';
            moonDiv.style.setProperty('--orbit-radius', `${moon.distance}px`);
            moonDiv.style.setProperty('--start-angle', `${Math.random() * 360}deg`);
            moonDiv.style.animation = `orbit ${moon.period * baseSpeed}s linear infinite`;
            
            moonOrbit.appendChild(moonDiv);
            planetDiv.appendChild(moonOrbit);
        }

        orbit.appendChild(planetDiv);
        solarSystem.appendChild(orbit);
    });

    createAsteroidBelt();
}

function createAsteroidBelt() {
    const solarSystem = document.querySelector('.solar-system');
    const belt = document.createElement('div');
    belt.className = 'asteroid-belt';

    for (let i = 0; i < asteroidBelt.numAsteroids; i++) {
        const distance = asteroidBelt.minRadius + Math.random() * (asteroidBelt.maxRadius - asteroidBelt.minRadius);
        const asteroid = document.createElement('div');
        asteroid.className = 'asteroid';
        asteroid.style.width = `${Math.random() * 2 + 1}px`;
        asteroid.style.height = asteroid.style.width;
        
        // Set CSS variables for the asteroid
        asteroid.style.setProperty('--orbit-radius', `${distance}px`);
        asteroid.style.setProperty('--start-angle', `${Math.random() * 360}deg`);
        
        // Random orbital period between 20 and 30 seconds
        asteroid.style.animation = `orbit ${20 + Math.random() * 10}s linear infinite`;
        
        belt.appendChild(asteroid);
    }

    solarSystem.appendChild(belt);
}

function showPlanetInfo(planet) {
    let infoCard = document.querySelector('.info-card');
    if (!infoCard) {
        infoCard = document.createElement('div');
        infoCard.className = 'info-card';
        document.body.appendChild(infoCard);
    }

    const info = getPlanetInfo(planet);
    infoCard.innerHTML = `
        <h3>${planet.name}</h3>
        <p>Orbital Period: ${planet.period} Earth years</p>
        <p>Axial Tilt: ${planet.tilt}°</p>
        <p>${info}</p>
    `;

    infoCard.style.display = 'block';
    
    // Position card near cursor
    document.addEventListener('mousemove', moveInfoCard);
}

function moveInfoCard(e) {
    const infoCard = document.querySelector('.info-card');
    if (infoCard) {
        infoCard.style.left = `${e.clientX + 20}px`;
        infoCard.style.top = `${e.clientY + 20}px`;
    }
}

// Add speed controls
function createControls() {
    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.innerHTML = `
        <button onclick="adjustSpeed(0.5)">Slower</button>
        <button onclick="adjustSpeed(1)">Normal</button>
        <button onclick="adjustSpeed(2)">Faster</button>
    `;
    document.body.appendChild(controls);
}

function adjustSpeed(factor) {
    document.querySelectorAll('.planet, .moon, .asteroid').forEach(element => {
        const currentDuration = parseFloat(element.style.animationDuration);
        element.style.animationDuration = `${currentDuration / factor}s`;
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    setTimeout(() => {
        createPlanets();
        createControls();
    }, 500);
});

// Close info card when clicking outside
document.addEventListener('click', (e) => {
    const infoCard = document.querySelector('.info-card');
    if (infoCard && !e.target.closest('.planet') && !e.target.closest('.info-card')) {
        infoCard.style.display = 'none';
        document.removeEventListener('mousemove', moveInfoCard);
    }
});

// Add planet information
function getPlanetInfo(planet) {
    const info = {
        Mercury: "The smallest and innermost planet in the Solar System.",
        Venus: "The hottest planet, with surface temperatures reaching 462°C.",
        Earth: "Our home planet, the only known planet with life.",
        Mars: "The Red Planet, named after the Roman god of war.",
        Jupiter: "The largest planet in our Solar System.",
        Saturn: "Famous for its prominent ring system.",
        Uranus: "An ice giant with a tilted rotation axis.",
        Neptune: "The windiest planet, with speeds reaching 2,100 km/h.",
        Pluto: "A dwarf planet in the Kuiper belt."
    };
    return info[planet.name];
}

// Add resize handler for responsiveness
window.addEventListener('resize', () => {
    const scale = Math.min(
        window.innerWidth / 1200,
        window.innerHeight / 800
    );
    document.documentElement.style.setProperty('--scale-factor', scale);
}); 