document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignupButton = document.getElementById('show-signup');
    const showLoginButton = document.getElementById('show-login');

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

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your signup logic here
    });
});
