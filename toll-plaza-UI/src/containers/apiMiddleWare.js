
import axios from "axios";

const apiURL = "http://localhost:3000/";

let logedInUser = { token: "" };
const myHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json"
};

function fnSessionUser() {
    logedInUser['token'] = sessionStorage.getItem("mtp");
    if (logedInUser.token !== "") {
        myHeaders["authorization"] = logedInUser.token;
        axios.defaults.headers = myHeaders;
    }
    return logedInUser;
}

axios.defaults.baseURL = apiURL;

async function fnLogedInUser() {
    return await fnSessionUser();
}


function get(url) {
    fnSessionUser();
    return axios
        .get(url)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log("error.message", error.message);
            return error;
        });
}

async function post(url, payload = {}) {
    fnSessionUser();

    return await axios
        .post(url, payload)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log("error.message", error.message);
            return error;
        });
}

async function put(url) {
    fnSessionUser();

    return await axios
        .put(`${url}`)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log("error.message", error.message);
            return error;
        });
}

async function login(url, payload = {}) {
    return await axios
        .post(url, payload)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log("error.message", error.message);
            return error;
        });
}


async function register(url, payload = {}) {
    return await axios
        .post(url, payload)
        .then((response) => {
            console.log("response", response);
            return response;
        })
        .catch((error) => {
            console.log("error.message", error.message);
            return error;
        });
}

export default {
    get,
    post,
    put,
    fnLogedInUser,
    fnSessionUser,
    login,
    register
};
