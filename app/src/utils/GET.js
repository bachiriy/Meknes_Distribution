import Cookies from "js-cookie";

const API_URL = "http://127.0.0.1:8000/api/"; // this should be in .env file

async function GET(endpoint) {
  let data = sessionStorage.getItem(endpoint);
  if (!data) {
    const token = Cookies.get("token");
    const response = await fetch(API_URL + endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (response.ok) {
      data = await response.json();
      sessionStorage.setItem(endpoint, JSON.stringify(data));
      return data;
    } else {
      return "response not OK";
    }
  }
  return JSON.parse(data);
}

export default GET;
