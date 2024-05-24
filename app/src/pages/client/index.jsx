import Table from "../../components/Other/Table";
import Spinner from "../../components/Other/Spinner";
import GET from "../../utils/GET";
import { useEffect, useState } from "react";
import { validateClient } from "../../utils/validationFunctions";

const columns = [
  { accessorKey: "id", header: "Id", enableEditing: false },
  { accessorKey: "first_name", header: "Prénom" },
  { accessorKey: "last_name", header: "Nom" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Tel" },
  { accessorKey: "raison_sociale", header: "Raison Sociale" },
  { accessorKey: "CIN_ICE", header: "CIN ou ICE" },
  { accessorKey: "type", header: "Type Du Client" },
  { accessorKey: "role", header: "Role Du Client" },
  { accessorKey: "address_exploitation", header: "Address D'exploitation" },
  { accessorKey: "address_facturation", header: "Address De Facturation" },
];

const Client = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    let recieve = async () => {
      setLoading(true);
      const d = await GET("clients");
      setData(d.clients);
      setLoading(false);
    };
    recieve();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div className="overflow-auto">
      {data ? (
        <Table
          data={data}
          columns={columns}
          entityType="Client"
          validateEntity={validateClient}
        />
      ) : (
        <p>No Data.</p>
      )}
    </div>
  );
};
export default Client;
