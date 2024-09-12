
document.addEventListener('DOMContentLoaded', function() {
    
    const savedEmail = localStorage.getItem('rememberMe');
    if (savedEmail) {
        document.getElementById('email').value = savedEmail;
        document.getElementById('rememberMe').checked = true;
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const errorMessage = document.getElementById('errorMessage');
    const spinner = document.getElementById('spinner');
    const loginButton = document.getElementById('loginButton');

    let valid = true;

    
    emailError.style.display = 'none';
    passwordError.style.display = 'none';
    errorMessage.textContent = '';

    
    if (!validateEmail(email)) {
        emailError.style.display = 'block';
        emailError.textContent = 'Please enter a valid email address.';
        valid = false;
    }

    
    if (password.length < 6) {
        passwordError.style.display = 'block';
        passwordError.textContent = 'Password must be at least 6 characters long.';
        valid = false;
    }

    if (valid) {
        
        spinner.style.display = 'block';
        loginButton.disabled = true;

        
        login(email, password).finally(() => {
            
            spinner.style.display = 'none';
            loginButton.disabled = false;
        });
    }
});


function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}


function login(email, password) {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // API URL

    
    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            username: email, 
            password: password 
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Login failed');
        }
    })
    .then(data => {
        
        alert('Login successful!');
        console.log('Response data:', data);
        
        if (document.getElementById('rememberMe').checked) {
            localStorage.setItem('rememberMe', email);
        } else {
            localStorage.removeItem('rememberMe');
        }
    })
    .catch(error => {
        
        document.getElementById('errorMessage').textContent = 'Invalid username or password.';
        console.error('Error:', error);
    });
}

function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const toggleButton = document.querySelector('.toggle-password');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleButton.textContent = 'Hide';
    } else {
        passwordField.type = 'password';
        toggleButton.textContent = 'Show';
    }
}
