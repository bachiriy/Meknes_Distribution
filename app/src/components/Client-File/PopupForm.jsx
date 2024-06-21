import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import PUT from '../../utils/PUT';
import GET from '../../utils/GET';
import { toast } from 'react-toastify';
import ConfirmAlert from '../Alerts/ConfirmAlert';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function PopupForm({ open, setOpen, clientFileData, updatedData }) {
    const [fileName, setFileName] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedClients, setSelectedClients] = useState([]);
    const [communeId, setCommuneId] = useState('');
    const [exploitationSurface, setExploitationSurface] = useState('');
    const [moreDetail, setMoreDetail] = useState('');
    const [status, setStatus] = useState('');
    const [products, setProducts] = useState([]);
    const [clients, setClients] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [alertLoad, setAlertLoad] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);


    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const clientsData = await GET('clients', true);
                const productsData = await GET('products', true);
                const communesData = await GET('stats/communes', true);
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

    useEffect(() => {
        if (clientFileData) {
            setFileName(clientFileData.file_name || '');
            setSelectedProducts(clientFileData.products.map(product => product.id) || []);
            setSelectedClients(clientFileData.clients.map(client => client.id) || []);
            setCommuneId(clientFileData.commune_id || '');
            setExploitationSurface(clientFileData.exploitation_surface || '');
            setMoreDetail(clientFileData.more_detail || '');
            setStatus(clientFileData.status || '');
        }
    }, [clientFileData]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmSave = async () => {
        const updatedFile = {
            file_name: fileName,
            products: selectedProducts,
            clients: selectedClients,
            commune_id: communeId,
            exploitation_surface: exploitationSurface,
            more_detail: moreDetail,
            status: status
        };

        try {
            const response = await PUT('clientFiles', clientFileData.id, true, updatedFile);
            if (response.status === 'success') {
                toast.success(response.message);
                const updatedClientFiles = await GET('clientFiles');
                updatedData(updatedClientFiles.clientFiles);
                handleClose();
            } else {
                toast.error('Error updating client file');
            }
        } catch (error) {
            toast.error('Error updating client file');
        }
    };

    const handleCancelSave = () => {
        setOpen(false);
    };

    const handleOpenConfirmDialog = () => {
        setAlertOpen(true);
    };

    const handleCloseConfirmDialog = () => {
        setAlertOpen(false);
    };

    const confirmAction = async () => {
        setAlertLoad(true);
        await handleConfirmSave();
        handleCloseConfirmDialog();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style }}>
                <form>
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
                    <Button onClick={handleOpenConfirmDialog} variant="contained" color="primary" sx={{ mr: 2 }}>
                        Sauvegarder
                    </Button>
                    <Button onClick={handleClose} variant="contained" color="inherit">
                        Annuler
                    </Button>
                </form>

                <ConfirmAlert
                    loading={alertLoad}
                    msg="Êtes-vous sûr de vouloir sauvegarder les modifications ?"
                    open={alertOpen}
                    handleClose={() => setAlertOpen(false)}
                    cancel={() => setAlertOpen(false)}
                    confirm={confirmAction}
                />
            </Box>
        </Modal>
    );
}

export default PopupForm;
