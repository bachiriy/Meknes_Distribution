import Cookies from "js-cookie";

export default async function authChecker() {
  const token = Cookies.get("token");
  if (!token) return false;

  try {
     const response = await fetch("http://127.0.0.1:8000/api/isConnected", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ ok: "ok" }),
    });
   
    const data = await response.json();

    console.log(data);

    if (data.data === true) {
      return true;
    } else {
      Cookies.remove("token");
      Cookies.remove("user");
      return false;
    }
  } catch (error) {
    console.error(error);
    Cookies.remove("token");
    Cookies.remove("user");
    return false;
  }
}
