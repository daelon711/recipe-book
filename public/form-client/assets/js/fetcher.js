import { returnUrl, getCookie } from "./config.js";

function apiRequest(path, method = "GET", body = null) {
    console.log("Calling API:", returnUrl(), path, buildOptions(method, body)); // <--- add this

    return fetch(`${returnUrl()}${path}`, buildOptions(method, body))
        .then((response) => {
            if (response.status === 204) {
                // No Content, just return null or empty object
                return null;
            }
            return response.json();
        })
        .then((json) => {
            if (json && "errors" in json) {
                throw json;
            } else {
                return json; // returns the JSONified obj
            }
        });
}

function buildOptions(method, body) {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json",
        },
        credentials: "include",
    };

    if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
        //method.toUpperCase()
        const token = getCookie("XSRF-TOKEN");
        if (token) {
            // Laravel expects this header (decoded automatically on backend)
            options.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
        }
    }
    if (body) options.body = JSON.stringify(body);

    return options;
}

export { apiRequest };
//json parse returns jsonified object
// apiRequest("/sanctum/csrf-cookie") -- get request for cookie that is stored in browser after, so after that getcookie function gets that cookie thats named xsrf-token
