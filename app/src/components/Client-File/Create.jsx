import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import GET from '../../utils/GET';
import POST from '../../utils/POST';

function Create() {
    // State variables to store form data and loading state
    const [products, setProducts] = useState([]);
    const [clients, setClients] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedClients, setSelectedClients] = useState([]);
    const [communId, setCommunId] = useState('');
    const [exploitationSurface, setExploitationSurface] = useState('');
    const [moreDetail, setMoreDetail] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch clients and products from API
    // Fetch clients and products from API
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const clientsData = await GET('clients');
                const productsData = await GET('products');
                console.log("Clients Data:", clientsData);
                console.log("Products Data:", productsData);
                setClients(clientsData.clients);
                setProducts(productsData.products);
                setLoading(false); // Update loading state when data fetching is completed
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle error, e.g., display an error message
            }
        };

        fetchInitialData();
    }, []);


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Construct payload object with form data
        const payload = {
            product_ids: selectedProducts,
            client_ids: selectedClients,
            commun_id: communId,
            exploitation_surface: exploitationSurface,
            more_detail: moreDetail,
            status: status
        };
        // Submit payload to API endpoint
        await POST('clientFiles', payload);
        // Optionally, perform any actions after submission (e.g., redirecting)
    };

    // Render loading indicator if data is still loading
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render form when data fetching is completed
    return (
        <div className="p-6 bg-gray-100 min-h-screen ml-12">
            <div className="flex items-center mb-6">
                <Link to="/" className="text-gray-600 hover:text-gray-800">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </Link>
                <h1 className="text-2xl font-bold ml-4">Dossier Client / <span className='text-xl'>Créer</span></h1>
            </div>

            <form onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ my: 1 }}>
                    <InputLabel id="product-select-label">Produits</InputLabel>
                    <Select
                        labelId="product-select-label"
                        id="product-select"
                        multiple
                        value={selectedProducts}
                        onChange={(e) => setSelectedProducts(e.target.value)}
                        label="Produits"
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
                    >
                        {clients.map((client) => (
                            <MenuItem key={client.id} value={client.id}>
                                {client.CIN_ICE}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Input
                    fullWidth
                    value={communId}
                    onChange={(e) => setCommunId(e.target.value)}
                    placeholder="ID Commun"
                    sx={{ my: 1 }}
                />
                <Input
                    fullWidth
                    value={exploitationSurface}
                    onChange={(e) => setExploitationSurface(e.target.value)}
                    placeholder="Surface d'exploitation"
                    sx={{ my: 1 }}
                />
                <Input
                    fullWidth
                    value={moreDetail}
                    onChange={(e) => setMoreDetail(e.target.value)}
                    placeholder="Plus de détails"
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
                    >
                        <MenuItem value="in progress">En cours</MenuItem>
                        <MenuItem value="completed">Terminé</MenuItem>
                        <MenuItem value="archived">Archivé</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Enregistrer
                </Button>
            </form>
        </div>
    );
}

export default Create;
