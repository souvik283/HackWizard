
const btnLogin = document.querySelector(".btn-login");
const btnSignup = document.querySelector(".btn-signup");
const toggleLinkSignup = document.querySelector(".toggle-link-signup");
const toggleLinkLogin = document.querySelector(".toggle-link-login");
function validateLogin() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const errorMessage = document.getElementById("login-error-message");
    if (username === "admin" && password === "password123") {
        alert("Login successful!");
        errorMessage.textContent = "";
    } else {
        errorMessage.textContent = "Invalid username or password";
        document.getElementById("login-username").value = "";
        document.getElementById("login-password").value = "";
    }
}
btnLogin.addEventListener("click", validateLogin);
toggleLinkSignup.addEventListener("click", showSignUp);

function validateSignUp() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("signup-confirm-password").value;
    const errorMessage = document.getElementById("signup-error-message");

    if (username === "" || password === "" || confirmPassword === "") {
        errorMessage.textContent = "All fields are required";
       document.getElementById("signup-username").value="";
       document.getElementById("signup-password").value=""; document.getElementById("signup-confirm-password").value="";
        return;
    }    

    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match";
        document.getElementById("signup-username").value="";
       document.getElementById("signup-password").value=""; 
       document.getElementById("signup-confirm-password").value="";
        return;
    }
    alert("Sign up successful!");
    errorMessage.textContent = "";
    showLogin();
}
function showSignUp() {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("signup-container").style.display = "block";
}
toggleLinkLogin.addEventListener("click", showLogin);
function showLogin() {
    document.getElementById("signup-container").style.display = "none";
    document.getElementById("login-container").style.display = "block";
}
btnSignup.addEventListener("click", validateSignUp);
