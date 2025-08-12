function returnUrl() {
    return `https://form-server.test`;
}

function getCookie(name) {
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1];
}

export { returnUrl, getCookie };
