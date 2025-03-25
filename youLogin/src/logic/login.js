document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const emailInput = document.querySelector("input[type='email']");
    const passwordInput = document.querySelector("input[type='password']");

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
        if (password.length < 6) {
            errors.push("Password must be at least 6 characters long.");
        }

        // Display errors or submit form
        const errorContainer = document.querySelector(".error-messages");
        errorContainer.innerHTML = "";

        if (errors.length > 0) {
            errors.forEach(error => {
                const errorMsg = document.createElement("p");
                errorMsg.textContent = error;
                errorMsg.style.color = "red";
                errorContainer.appendChild(errorMsg);
            });
        } else {
            alert("Login successful!");
            form.submit(); // You can replace this with actual authentication logic
        }
    });
});