document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const emailInput = document.querySelector("input[type='email']");
    const passwordInput = document.querySelector("input[type='password']");
    // Create error container reference
    const errorContainer = document.querySelector(".error-messages");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let errors = [];

        // Email validation
        const email = emailInput.value.trim();
        if (!email.includes("@") || !email.includes(".")) {
            errors.push("Invalid email format. Make sure it includes '@' and a '.'");
        }

        // Password validation
        const password = passwordInput.value.trim();
        if (password.length < 1) { // Changed to allow shorter passwords like in your JSON file
            errors.push("Password cannot be empty.");
        }

        // Display errors or authenticate
        errorContainer.innerHTML = "";

        if (errors.length > 0) {
            errors.forEach(error => {
                const errorMsg = document.createElement("p");
                errorMsg.textContent = error;
                errorMsg.style.color = "red";
                errorContainer.appendChild(errorMsg);
            });
        } else {
            // Authenticate against loginInfo.json
            authenticateUser(email, password);
        }
    });

    // Function to authenticate user against loginInfo.json
    function authenticateUser(email, password) {
        fetch('../logic/loginInfo.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                return response.json();
            })
            .then(data => {
                // Check if user exists and credentials match
                let isAuthenticated = false;
                
                // Loop through each user in the JSON file
                for (const username in data) {
                    if (data[username].email === email && data[username].password === password) {
                        isAuthenticated = true;
                        break;
                    }
                }
                
                if (isAuthenticated) {
                    // Save authentication state if needed
                    sessionStorage.setItem('isAuthenticated', 'true');
                    sessionStorage.setItem('userEmail', email);
                    
                    // Redirect to success page
                    window.location.href = '../templating/success.html';
                } else {
                    // Failed login
                    const errorMsg = document.createElement("p");
                    errorMsg.textContent = "Invalid email or password";
                    errorMsg.style.color = "red";
                    errorContainer.appendChild(errorMsg);
                }
            })
            .catch(error => {
                console.error('Authentication error:', error);
                const errorMsg = document.createElement("p");
                errorMsg.textContent = "Authentication error. Please try again later.";
                errorMsg.style.color = "red";
                errorContainer.appendChild(errorMsg);
            });
    }
});