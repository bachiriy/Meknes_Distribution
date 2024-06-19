import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Details = () => {
    const { id } = useParams();
    const [clientFile, setClientFile] = useState(null);

    useEffect(() => {
        const sessionData = sessionStorage.getItem('clientFiles');
        if (sessionData) {
            const parsedData = JSON.parse(sessionData);
            const findFile = parsedData.clientFiles.find(file => file.id == id);
            setClientFile(findFile);
        }
    }, [id]);

    useEffect(() => {
        console.log(clientFile);
    }, [clientFile]);

    if (!clientFile) {
        return <div>No data found</div>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen ml-12">
            <div className="flex items-center mb-6">
                <Link to="/" className="text-gray-600 hover:text-gray-800">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </Link>
                <h1 className="text-2xl font-bold ml-4">Dossier Client / <span className='text-xl'>Détails</span></h1>

            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-indigo-600">{clientFile.file_name}</h2>

                <div className="mb-4">
                    <strong className="block text-gray-700">Exploitation Surface:</strong>
                    <span>{clientFile.exploitation_surface} m²</span>
                </div>
                <div className="mb-4">
                      <strong className="block text-gray-700">Status:</strong>
                    <span>{clientFile.status}</span>
                </div>
                <div className="mb-4">
                    <strong className="block text-gray-700">Full Address:</strong>
                    <span>{clientFile.full_address}</span>
                </div>
                <div className="mb-4">
                    <strong className="block text-gray-700">Created At:</strong>
                    <span>{new Date(clientFile.created_at).toLocaleDateString()}</span>
                </div>
                <div className="mb-4">
                    <strong className="block text-gray-700">Updated At:</strong>
                    <span>{new Date(clientFile.updated_at).toLocaleDateString()}</span>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 text-indigo-600">Commune</h3>
                <div className="ml-4 mb-4">
                    <div><strong className="block text-gray-700">Name:</strong> {clientFile.commune.name}</div>
                    <div><strong className="block text-gray-700">Caidat:</strong> {clientFile.commune.caidat.name}</div>
                    <div><strong className="block text-gray-700">Cercle:</strong> {clientFile.commune.caidat.cercle.name}</div>
                    <div><strong className="block text-gray-700">Province:</strong> {clientFile.commune.caidat.cercle.province.name}</div>
                    <div><strong className="block text-gray-700">Region:</strong> {clientFile.commune.caidat.cercle.province.region.name}</div>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 text-indigo-600">Clients</h3>
                <div className="ml-4 mb-4">
                    {clientFile.clients.map(client => (
                        <div key={client.id} className="mb-4">
                            <div><strong className="block text-gray-700">Name:</strong> {client.first_name} {client.last_name}</div>
                            <div><strong className="block text-gray-700">Email:</strong> {client.email}</div>
                            <div><strong className="block text-gray-700">Phone:</strong> {client.phone}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 text-indigo-600">Products</h3>
                <div className="ml-4 mb-4">
                    {clientFile.products.map(product => (
                        <div key={product.id} className="mb-4">
                            <div><strong className="block text-gray-700">Reference:</strong> {product.reference}</div>
                            <div><strong className="block text-gray-700">Designation:</strong> {product.designation}</div>
                            <div><strong className="block text-gray-700">Price:</strong> {product.prix_vente_net} MAD</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Details;
