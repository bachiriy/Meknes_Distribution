import React, { useEffect, useState } from "react";
import Folder from "../../components/Client-File/Folder";
import { Spinner } from "flowbite-react";
import GET from "../../utils/GET";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ClientFile = () => {
  const [cfs, setCfs] = useState([]);
  const [loading, setLoad] = useState(false);

  useEffect(() => {
    const fetchClientFiles = async () => {
      setLoad(true);
      const response = await GET('clientFiles');
      setCfs(response.clientFiles);
      setLoad(false);
    };
    fetchClientFiles();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center h-screen items-center">
        <Spinner />
      </div>
    );
  }
  const updateData = (data) => {
    setCfs(data);
  }
  return (
    <div className="h-screen flex flex-col ml-12">
      <div className="flex justify-end m-2">
        <Link to='/client-file/create'>
          <Button variant="contained" color="success">Créer un Dossier Client</Button>
        </Link>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        {cfs.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {cfs.map((i) => (
              <Folder updatedData={updateData} key={i.id} clientFile={i} />
            ))}
          </div>
        ) : (
          <p className="text-center">no data.</p>
        )}
      </div>
    </div>
  );
};

export default ClientFile;
