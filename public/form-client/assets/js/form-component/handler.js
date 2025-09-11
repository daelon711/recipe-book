import { apiRequest } from "../fetcher.js";

// registers user creates in db gets back with cookie and returns api user
function registering(body) {
    // registering + logging in
    //FIRST get csrf cookie
    apiRequest("/sanctum/csrf-cookie")
        .then(() => {
            // 2. THEN make your POST request to login/register
            return apiRequest("/api/register", "POST", body);
        })
        .then(() => {
            window.location.href = "profile.html";
            //theres function for that jhtml on domcontent loaded
        })

        .catch((err) => {
            window.location.href = "login.html";

            alert(
                "Registration failed: " + (err.message || JSON.stringify(err))
            );
        });
}

function logging(body) {
    apiRequest("/sanctum/csrf-cookie")
        .then(() => {
            return apiRequest("/api/login", "POST", body);
        })
        .then(() => {
            return apiRequest("/api/user"); // <--- confirm login worked
        })
        .then((user) => {
            console.log("Logged in as:", user);
            localStorage.setItem("user", JSON.stringify(user));
            window.location.href = "profile.html";
        })
        .catch((err) =>
            alert("Login failed: " + (err.message || JSON.stringify(err)))
        );
}

function logout() {
    apiRequest("/api/logout", "POST")
        .then(() => {
            localStorage.removeItem("user");
            window.location.href = "index.html";
        })
        .catch((err) =>
            alert("Logout error: " + (err.message || JSON.stringify(err)))
        );
}

export { registering, logging, logout };
