import { deleteRecipe } from "./handler.js";

function renderProfile(user) {
    document.querySelector("#username-display").textContent = user.name;
    document.querySelector("#email-display").textContent = user.email;
}

function renderForm() {
    document.querySelector(
        "form"
    ).innerHTML = `<label for="recipe-input">Add a new recipe:</label>
            <input type="text" id="title" placeholder="Enter recipe name" required>
            <label for="recipe-description">Add a description:</label>

            <input type="text" id="recipe-description" placeholder="Enter description" required>

<div>
            <label for="ingredients">ingredients</label>
            <button type='button' id='add-ingredient'>+</button></div>
            <!-- add button "+" where input inside li is added so that values are sent in an array -->
            <!--  btn  while loaded and add it at the last li input of the list  -->
            <ul id="ingredients">
                <li> <input type="text" placeholder="Enter ingredients" required>
                    <input type="text" placeholder="enter amount" required>
                    <button type='button' id='remove-ingredient'>-</button>
                </li>
            </ul>
            <label for="recipe-instructions">Add instructions:</label>
            <input type="text" id="recipe-instructions" placeholder="Enter instructions" required>
            <!-- make sure this is in backend also -->
            <button type="submit" id="add-recipe-btn">Add Recipe</button>`;

    addInput();
}

function renderRecipes(recipes) {
    const $container = document.querySelector("#recipe-list");
    $container.innerHTML = ""; // clear first

    recipes.forEach((recipe) => {
        const ingredientsArray = recipe.ingredients
            .map(
                (item) =>
                    `<input type="checkbox" name="${item.ingredient}" value="${item.ingredient}">${item.ingredient} — ${item.amount}</input>`
            )
            .join("");
        //fix li list of ingredients here
        const item = `
        <li>
            <h3>${recipe.title}</h3>
            <p>${recipe.description}</p>

            <ul>
                ${ingredientsArray}
            </ul>
            <p>${recipe.instructions}</p>
            <button type="button" class="delete-recipe-btn" data-id="${recipe.id}">Delete</button>
        </li>`;

        $container.insertAdjacentHTML("beforeend", item);

        deleteRecipe(recipe.id);
    });
}

function addInput() {
    console.log("add-input works");
    const $ul = document.querySelector("#ingredients");
    const addBtn = document.querySelector("#add-ingredient");

    addBtn.addEventListener("click", function () {
        const li = `<li> <input type="text" placeholder="Enter ingredient " required>
                    <input type="text" placeholder="enter amount" required>
                        <button type='button' id='remove-ingredient'>-</button>
                    </li>`;
        $ul.insertAdjacentHTML("beforeend", li);
        removeInput();
    });
}

function removeInput() {
    const removeBtn = document.querySelectorAll("#remove-ingredient");
    removeBtn.forEach((btn) => {
        btn.addEventListener("click", function () {
            const li = btn.closest("li");
            li.remove();
        });
    });
}

function grabData() {
    const ingredients = Array.from(
        document.querySelectorAll("#ingredients li")
    ).map((li) => {
        const inputs = li.querySelectorAll("input");
        return {
            ingredient: inputs[0].value,
            amount: inputs[1].value,
        }; //theres each li that was added to ul
    });
    console.log("data grabbed");
    return {
        title: document.querySelector("#title").value,
        description: document.querySelector("#recipe-description").value,
        ingredients: ingredients,
        instructions: document.querySelector("#recipe-instructions").value,
    };
}

function renderRecipe(recipes) {
    const $ul = document.querySelector("#recipe-list");
    recipes.forEach((recipe) => {
        const li = `<li>${recipe.title}</li>`;
        $ul.insertAdjacentHTML("beforeend", li);
    });
}

export {
    renderProfile,
    renderRecipes,
    addInput,
    grabData,
    renderRecipe,
    renderForm,
};
