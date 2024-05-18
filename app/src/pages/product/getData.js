import Cookies from "js-cookie";

async function getProductData() {
  const token = Cookies.get("token");
  const response = await fetch("http://127.0.0.1:8000/api/products", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}

export default getProductData;
