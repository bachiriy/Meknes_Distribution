import React, { useEffect, useState } from "react";
import Folder from "../../components/Client-File/Folder";
import { Spinner } from "flowbite-react";
import GET from "../../utils/GET";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ClientFile = () => {
  const [cfs, setCfs] = useState([]);

  useEffect(() => {
    const fetchClientFiles = async () => {
      const response = await GET('clientFiles');
      setCfs(response.clientFiles);
    };
    fetchClientFiles();
  }, []);

  return (
    <>
      <Link to='/client-file/create' className="flex justify-end m-2">
        <Button variant="contained" color="success">Créer un Dossier Client</Button>
      </Link>
      {cfs.length > 0 ? (
        <div className="mx-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 gap-4 justify-center items-center p-4">
          {cfs.map((i) => (
            <Folder key={i.id} clientFile={i} />
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center h-screen items-center">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default ClientFile;
