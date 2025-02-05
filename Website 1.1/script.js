// Copy email functionality
document.querySelector('.copy-email').addEventListener('click', function() {
    const email = 'your.email@example.com'; // Replace with your email
    navigator.clipboard.writeText(email).then(() => {
        this.innerHTML = 'Copied! <i class="fas fa-check"></i>';
        setTimeout(() => {
            this.innerHTML = 'Copy email <i class="fas fa-copy"></i>';
        }, 2000);
    });
});

// Form submission
document.querySelector('.subscribe-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    // Add your newsletter subscription logic here
    console.log('Subscribed:', email);
    this.querySelector('input').value = '';
}); 