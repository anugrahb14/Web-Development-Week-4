function validateEmail() {
    const email = document.getElementById("emailInput").value;
    const result = document.getElementById("result");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(email)) {
        result.textContent = "Valid email address.";
    } else {
        result.textContent = "Invalid email address.";
    }
}
