function register() {
    return {
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
        password_confirmation: document.querySelector("#password_confirmation")
            .value,
    };
}

function login() {
    return {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
    };
}
//rename this helper js cuz we're rendering nothing

export { register, login };
