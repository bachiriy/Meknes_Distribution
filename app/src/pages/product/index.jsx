import { useEffect, useState } from "react";
import Table from "../../components/Other/Table";
import Spinner from "../../components/Other/Spinner";
import GET from "../../utils/GET";
import { validateProduct } from "../../utils/validationFunctions";
import { Link } from "react-router-dom";

const columns = [
  {
    accessorKey: "id",
    header: "Id",
    enableEditing: false,
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "supplier_id",
    header: "Fournisseur",
  },
  {
    accessorKey: "sub_category_id",
    header: "Group",
  },
  {
    accessorKey: "marge_brut",
    header: "Marge Brut",
    DataTypeNeeded: "float",
  },
  {
    accessorKey: "prix_achat",
    header: "Prix Achat",
    DataTypeNeeded: "float",
  },
  {
    accessorKey: "prix_tarif",
    header: "Prix Tarif",
    DataTypeNeeded: "float",
  },
  {
    accessorKey: "prix_vente",
    header: "Prix Vente",
    DataTypeNeeded: "float",
  },
  {
    accessorKey: "prix_vente_net",
    header: "Prix Vente Net",
    DataTypeNeeded: "float",
  },
  {
    accessorKey: "remise",
    header: "Remise",
    DataTypeNeeded: "float",
  },
  {
    accessorKey: "TVA",
    header: "TVA",
    DataTypeNeeded: "float",
  },
  {
    accessorKey: "reference",
    header: "Reference",
  },
  {
    accessorKey: "image",
    header: "Image",
    DataTypeNeeded: "image",
    Cell: ({ cell }) =>
      cell.value ? (
        <img
          src={cell.value}
          alt="Product"
          style={{ width: "50px", height: "50px" }}
        />
      ) : (
        "No Image"
      ),
  }
];

export const Product = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const d = await GET("products");
    setData(d.products);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div className="overflow-auto ml-12 px-2 mt-10">
      <h1 className="py-10 text-center">Products Table</h1>

      {data ? (
        <Table
          updatedData={(updatedData) => setData(updatedData.products)}
          data={data}
          columns={columns}
          entityType="Product"
          validateEntity={validateProduct}
        />
      ) : (
        <p>No records.</p>
      )}
    </div>
  );
};
