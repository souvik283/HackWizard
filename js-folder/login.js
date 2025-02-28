
const btnLogin = document.querySelector(".btn-login");
const btnSignup = document.querySelector(".btn-signup");
const toggleLinkSignup = document.querySelector(".toggle-link-signup");
const toggleLinkLogin = document.querySelector(".toggle-link-login");
function validateLogin() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const errorMessage = document.getElementById("login-error-message");
    if (email=== "admin@gmail.com" && password === "password123") {
        alert("Login successful!");
        errorMessage.textContent = "";
    } else {
        errorMessage.textContent = "Invalid username or password";
        document.getElementById("login-email").value = "";
        document.getElementById("login-password").value = "";
    }
}
btnLogin.addEventListener("click", validateLogin);
toggleLinkSignup.addEventListener("click", showSignUp);

function validateSignUp() {
    const password = document.getElementById("signup-password").value;
    const fullname=document.getElementById("signup-fullname").value;
    const email=document.getElementById("signup-email").value;
    const mobile=document.getElementById("signup-mobile").value;
    const address=document.getElementById("signup-address").value;
    const confirmPassword = document.getElementById("signup-confirm-password").value;
    const errorMessage = document.getElementById("signup-error-message");

    if (password === "" || confirmPassword === "" || fullname === "" || email === "" || mobile === "" || address === "") {
       errorMessage.textContent = "All fields are required";
       document.getElementById("signup-password").value=""; 
       document.getElementById("signup-confirm-password").value="";
       document.getElementById("signup-fullname").value="";
       document.getElementById("signup-email").value=""; 
       document.getElementById("signup-mobile").value="";
       document.getElementById("signup-address").value="";
        return;
    }    

    if (password !== confirmPassword) {
       errorMessage.textContent = "Passwords do not match";
       document.getElementById("signup-password").value=""; 
       document.getElementById("signup-confirm-password").value="";
       document.getElementById("signup-fullname").value="";
       document.getElementById("signup-email").value="";
       document.getElementById("signup-mobile").value="";
       document.getElementById("signup-address").value="";
        return;
    }
    alert(`Welcome ${fullname}! Your account has been created successfully`);
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
