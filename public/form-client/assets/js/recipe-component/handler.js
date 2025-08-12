import { apiRequest } from "../fetcher.js";
import { renderProfile, renderRecipes, addInput } from "./renderer.js";

function loadProfile() {
    // recipe owns both user and recipes in index function of    controller

    apiRequest("/api/user")
        .then((user) => {
            renderProfile(user);
            addInput();
            return apiRequest("/api/recipes");
        })
        .then((recipes) => {
            renderRecipes(recipes.recipes);
        })
        .catch(() => {
            window.location.href = "login.html";
        });
}

function grabData() {
    const title = document.querySelector("#title").value;
    const description = document.querySelector("#recipe-description").value;
    const ingredients = Array.from(
        document.querySelectorAll("#ingredients li input")
    ).map((input) => input.value); // make sure inputs values get here
    const instructions = document.querySelector("#recipe-instructions").value;

    return {
        title: title,
        description: description,
        ingredients: ingredients,
        instructions: instructions,
    };
}

function submitRecipe() {
    const form = document.querySelector("#add-recipe-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = grabData();
        apiRequest("/api/recipes", "POST", data)
            .then((recipe) => {
                console.log("Recipe added:", recipe);
            })
            .catch((error) => {
                console.error("Error adding recipe:", error);
            });
    });
}

export { loadProfile, grabData, submitRecipe };
