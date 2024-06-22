import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

async function POST(endpoint, body) {
  const token = Cookies.get("token");
  const response = await fetch(API_URL + endpoint, {
    headers: {
      Authorization: "Bearer " + token,
    },
    method: "POST",
    body
  });

  if (response.ok) {
    return await response.json();
  } else {
    return "response not OK";
  }
}

export default POST;