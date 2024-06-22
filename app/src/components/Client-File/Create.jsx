import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Input,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import GET from "../../utils/GET";
import POST from "../../utils/POSTFILE";
import Spinner from "../Other/Spinner";
import { toast, ToastContainer } from "react-toastify";

function Create() {
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [fileName, setFileName] = useState("");
  const [communeId, setCommuneId] = useState("");
  const [exploitationSurface, setExploitationSurface] = useState("");
  const [moreDetail, setMoreDetail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState(null);

  const [formLoading, setFormLoad] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length !== 0) setSelectedFiles(files);
  };
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const clientsData = await GET("clients", true);
        const productsData = await GET("products", true);
        const communesData = await GET("stats/communes", true);
        setClients(clientsData.clients);
        setProducts(productsData.products);
        setCommunes(communesData.communes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchInitialData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoad(true);

    try {
      const payload = {
        file_name: fileName,
        product_ids: selectedProducts,
        client_ids: selectedClients,
        commune_id: communeId,
        exploitation_surface: parseFloat(exploitationSurface),
        more_detail: moreDetail,
        status: status,
      };

      const response = await POST("clientFiles", payload, selectedFiles);

      if (response.status === "success") {
        toast.success(response.message);
        navigate("/client-file");
      } else {
        throw new Error(JSON.stringify(response));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      try {
        const errorData = JSON.parse(error.message);
        if (errorData.errors) {
          Object.entries(errorData.errors).forEach(([key, messages]) => {
            messages.forEach((message) => toast.error(`${key}: ${message}`));
          });
        } else {
          toast.error("Error submitting form");
        }
      } catch {
        toast.error("Error submitting form");
      }
    } finally {
      setFormLoad(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen ml-12">
      <ToastContainer />
      <div className="flex items-center mb-6">
        <Link to="/client-file" className="text-gray-600 hover:text-gray-800">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </Link>
        <h1 className="text-2xl font-bold ml-4">
          Dossier Client / <span className="text-xl">Créer</span>
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          label="Nom du fichier"
          variant="outlined"
          sx={{ my: 1 }}
          required
        />
        <FormControl fullWidth sx={{ my: 1 }}>
          <InputLabel id="product-select-label">Produits</InputLabel>
          <Select
            labelId="product-select-label"
            id="product-select"
            multiple
            value={selectedProducts}
            onChange={(e) => setSelectedProducts(e.target.value)}
            label="Produits"
            required
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.designation}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ my: 1 }}>
          <InputLabel id="client-select-label">Clients</InputLabel>
          <Select
            labelId="client-select-label"
            id="client-select"
            multiple
            value={selectedClients}
            onChange={(e) => setSelectedClients(e.target.value)}
            label="Clients"
            required
          >
            {clients.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {`${client.first_name} ${client.last_name} - ${client.phone} - ${client.email}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ my: 1 }}>
          <InputLabel id="commune-select-label">Commune</InputLabel>
          <Select
            labelId="commune-select-label"
            id="commune-select"
            value={communeId}
            onChange={(e) => setCommuneId(e.target.value)}
            label="Commune"
            required
          >
            {communes.map((commune) => (
              <MenuItem key={commune.id} value={commune.id}>
                {commune.full_address}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          value={exploitationSurface}
          onChange={(e) => setExploitationSurface(e.target.value)}
          label="Surface d'exploitation"
          variant="outlined"
          type="number"
          sx={{ my: 1 }}
          required
        />
        <TextField
          fullWidth
          value={moreDetail}
          onChange={(e) => setMoreDetail(e.target.value)}
          label="Plus de détails"
          variant="outlined"
          sx={{ my: 1 }}
        />
        <FormControl fullWidth sx={{ my: 1 }}>
          <InputLabel id="status-select-label">Statut</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Statut"
            required
          >
            <MenuItem value="in progress">En cours</MenuItem>
            <MenuItem value="completed">Terminé</MenuItem>
            <MenuItem value="closed">Fermée</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          fullWidth
          sx={{ my: 2 }}
          className="flex justify-center items-center"
        >
          <input
            id="file-upload"
            multiple
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,image/*"
          />
        </FormControl>

        {formLoading ? (
          <Button
            disabled
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Loading...
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Enregistrer
          </Button>
        )}
      </form>
    </div>
  );
}

export default Create;
