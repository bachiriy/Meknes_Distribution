import { useEffect, useState } from "react";
import Table from "../../components/Table";
import Spinner from "../../components/Spinner";
import GET from "../../utils/GET";

import React from "react";

const columns = [
  {
    accessorKey: "id",
    header: "Id",
    enableEditing: false
  },
  {
    accessorKey: "name",
    header: "Fournisseur",
  },
  {
    accessorKey: "remise_f",
    header: "Remise",
  },
  {
    accessorKey: "remise_f_composition",
    header: "Remise Composition",
  },
  {
    accessorKey: "date_debut",
    header: "Date de Debut",
  },
  {
    accessorKey: "date_fin",
    header: "Date de Fin",
  },
];
const Supplier = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    let recieve = async () => {
        setLoading(true);
        const d = await GET('suppliers');
        setData(d.suppliers);
        setLoading(false);
    };
    recieve();
}, []);

  return loading ? (
    <Spinner />
  ) : (
    <div className="overflow-auto">
      <h1 className="pb-12 text-center">Suppliers Table</h1>
      {data ? (
        <Table data={data} columns={columns} />
      ) : (
        <div className="text-center">Table is Empty</div>
      )}
    </div>
  );
};

export default Supplier;
