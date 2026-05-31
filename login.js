document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    // Basic validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Password validation (at least 6 characters)
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }

    // If remember me is checked, store email in localStorage
    if (remember) {
        localStorage.setItem('rememberedEmail', email);
    } else {
        localStorage.removeItem('rememberedEmail');
    }

    // Here you would typically send the login data to your server
    console.log('Login attempt with:', { email, password, remember });
    alert('Login successful! (This is a demo)');

    // Clear form
    this.reset();
});

// Load remembered email on page load
window.addEventListener('DOMContentLoaded', function() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('remember').checked = true;
    }
});
