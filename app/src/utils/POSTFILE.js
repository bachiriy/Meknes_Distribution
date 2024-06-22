import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

async function POST(endpoint, data, files) {
  const token = Cookies.get("token");
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key].forEach((item) => {
        formData.append(`${key}[]`, item);
      });
    } else {
      formData.append(key, data[key]);
    }
  });

  if (files && files.length > 0) {
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
  }

  try {
    const response = await fetch(API_URL + endpoint, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });

    if (response.ok) {
      sessionStorage.removeItem(endpoint);
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}

export default POST;
