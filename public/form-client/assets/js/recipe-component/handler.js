import { apiRequest } from "../fetcher.js";
import {
    renderProfile,
    renderRecipes,
    grabData,
    renderForm,
} from "./renderer.js";

function loadProfile() {
    // recipe owns both user and recipes in index function of    controller

    apiRequest("/api/user")
        .then((user) => {
            renderProfile(user);
            renderForm();
            return apiRequest("/api/recipes");
        })
        .then((recipes) => {
            renderRecipes(recipes.recipes);
        })
        .catch(() => {
            window.location.href = "login.html";
        });
}

function submitRecipe() {
    const data = grabData();
    console.log(data);
    apiRequest("/api/recipes", "POST", data)
        .then((recipes) => {
            console.log("Recipe added:", recipes);
            clearInput();
            loadProfile();
        })
        .catch((error) => {
            console.error("Error adding recipe:", error);
        });
}

function clearInput() {
    document.querySelector("#title").value = "";
    document.querySelector("#recipe-description").value = "";
    document.querySelector(
        "#ingredients"
    ).innerHTML = `<li> <input type="text" placeholder="Enter ingredients" required>
                    <input type="text" placeholder="enter amount" required>
                    <button type='button' id='remove-ingredient'>-</button>
                </li>`;
    document.querySelector("#recipe-instructions").value = "";
}

function deleteRecipe(id) {
    const btn = document.querySelector(`button[data-id='${id}']`);
    if (!btn) return; // button not in DOM yet
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        const li = btn.closest("li");
        li.remove();
        apiRequest(`/api/recipes/${id}`, "DELETE")
            .then(() => {
                console.log("Recipe deleted:", id);
                loadProfile();
            })
            .catch((error) => {
                console.error("Error deleting recipe:", error);
            });
    });
}

export { loadProfile, submitRecipe, deleteRecipe };
