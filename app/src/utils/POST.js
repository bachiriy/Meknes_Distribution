import Cookies from "js-cookie";

const API_URL = "http://127.0.0.1:8000/api/"; // this should be in .env file

async function POST(endpoint, body) { // body : Object
    const token = Cookies.get("token");
    const response = await fetch(API_URL + endpoint, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        method: "POST",
        body: JSON.stringify(body)
    });

    if (response.ok) {
        return await response.json();
    } else {
        return 'response not OK';
    }
}

export default POST;
