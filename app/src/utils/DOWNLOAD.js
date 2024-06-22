import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

async function download(endpoint, itemId, fileName = 'downloaded_file.zip') {
  const token = Cookies.get("token");
  const url = `${API_URL}${endpoint}/${itemId}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
      responseType: 'blob', // Specify that the response should be treated as a blob
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);

      // Append the link to the body
      document.body.appendChild(link);
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } else {
      const errorText = await response.text();
      console.error("Error downloading file:", errorText);
      // Handle error appropriately, e.g., show toast message
      // toast.error(`Error downloading file: ${errorText}`);
    }
  } catch (error) {
    console.error("Error downloading file:", error);
    // Handle error appropriately, e.g., show toast message
    // toast.error("Error downloading file");
  }
}

export default download;
