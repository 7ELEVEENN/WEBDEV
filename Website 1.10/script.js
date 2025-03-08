// DOM Elements
const colorButton = document.getElementById('colorButton');
const contactForm = document.getElementById('contactForm');

// Random color generator
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Button click event handler
colorButton.addEventListener('click', () => {
    document.body.style.backgroundColor = getRandomColor();
});

// Form submission handler
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    if (name && email) {
        alert(`Thank you ${name}! We'll contact you at ${email}`);
        contactForm.reset();
    } else {
        alert('Please fill in all fields');
    }
});

// Navigation smooth scroll
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
});
