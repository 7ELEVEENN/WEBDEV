document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignupButton = document.getElementById('show-signup');
    const showLoginButton = document.getElementById('show-login');
    const signupButton = signupForm.querySelector('button[type="submit"]');

    showSignupButton.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        loginForm.classList.remove('visible');
        signupForm.classList.remove('hidden');
        setTimeout(() => {
            signupForm.classList.add('visible');
        }, 10);
    });

    showLoginButton.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.add('hidden');
        signupForm.classList.remove('visible');
        loginForm.classList.remove('hidden');
        setTimeout(() => {
            loginForm.classList.add('visible');
        }, 10);
    });

    // Handle form submissions
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your login logic here
    });

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Disable submit button to prevent multiple submissions
        signupButton.disabled = true;
        signupButton.textContent = 'Signing up...';
        
        const firstName = document.getElementById('firstname').value;
        const lastName = document.getElementById('lastname').value;
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const address = document.getElementById('address').value;
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;

        // Basic validation
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            signupButton.disabled = false;
            signupButton.textContent = 'Sign Up';
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    username,
                    email,
                    password,
                    address,
                    age,
                    gender
                })
            });

            const data = await response.json();
            
            if (response.ok) {
                alert('Registration successful!');
                signupForm.reset(); // Reset form fields
                signupForm.classList.add('hidden');
                signupForm.classList.remove('visible');
                loginForm.classList.remove('hidden');
                setTimeout(() => {
                    loginForm.classList.add('visible');
                }, 10);
            } else {
                alert('Registration failed: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during registration');
        } finally {
            // Re-enable submit button regardless of outcome
            signupButton.disabled = false;
            signupButton.textContent = 'Sign Up';
        }
    });
});
