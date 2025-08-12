function renderProfile(user) {
    document.querySelector("#username-display").textContent = user.name;
    document.querySelector("#email-display").textContent = user.email;
}

function renderRecipes(recipes) {
    const $container = document.querySelector("#recipe-list");
    $container.innerHTML = ""; // clear first
    recipes.forEach((recipe) => {
        //fix li list of ingredients here
        const item = `
        <li>
        <h3>${recipe.title}</h3>
        <ul>
        <li>ingredients:\n ${recipe.ingredients}</li>
        </ul>
        <p>description:\n ${recipe.description}</p>
        </li>`; //fix the listing of ingredients
        $container.insertAdjacentHTML("beforeend", item);
    });
}

function addInput() {
    console.log("add-input works");
    const $ul = document.querySelector("#ingredients");
    const addBtn = document.querySelector("#add-ingredient");

    addBtn.addEventListener("click", function () {
        const li = `<li> <input type="text" placeholder="Enter ingredient" >
                        <button type='button' id='remove-ingredient'>-</button>
                    </li>`;
        $ul.insertAdjacentHTML("beforeend", li);
        removeInput();
    });
}

function removeInput() {
    const removeBtn = document.querySelectorAll("#remove-ingredient");
    removeBtn.forEach((btn) => {
        console.log(btn);
        btn.addEventListener("click", function () {
            const li = btn.closest("li");
            li.remove();
        });
    });
}

export { renderProfile, renderRecipes, addInput };
