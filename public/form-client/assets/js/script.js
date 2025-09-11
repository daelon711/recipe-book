import { logging, logout, registering } from "./form-component/handler.js";
import { login, register } from "./form-component/renderer.js";
import { loadProfile, submitRecipe } from "./recipe-component/handler.js";

function init() {
    const registerForm = document.querySelector("#register-form");
    const loginForm = document.querySelector("#login-form");
    const recipeForm = document.querySelector("#add-recipe-form");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const info = register(); // from renderer.js
            registering(info);
        });
    }
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            console.log("login");
            const info = login(); // defined like register()
            logging(info);
        });
    }

    if (window.location.pathname.includes("profile.html")) {
        loadProfile();

        const btn = document.querySelector("#logout-btn");
        console.log(btn);
        if (btn) {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                console.log(btn);
                logout(); // from handler.js
            });
        }

        if (recipeForm) {
            const form = document.querySelector("#add-recipe-form");
            form.reset();
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                submitRecipe();
            });
        } //fix submit updating  the loadprofile
    }
}

init();
