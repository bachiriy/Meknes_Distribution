import { useEffect, useState } from "react";
import Table from "../../components/Other/Table";
import Spinner from "../../components/Other/Spinner";
import GET from "../../utils/GET";
import { validateProduct } from "../../utils/validationFunctions";
import { ToastContainer } from "react-toastify";

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
    accessorKey: "supplier.name",
    header: "Fournisseur",
  },
  {
    accessorKey: "group.name",
    header: "Group",
  },
  {
    accessorKey: "group.category.name",
    header: "Category",
  },
  {
    accessorKey: "marge_brut",
    header: "Marge Brut",
  },
  {
    accessorKey: "prix_achat",
    header: "Prix Achat",
  },
  {
    accessorKey: "prix_tarif",
    header: "Prix Tarif",
  },
  {
    accessorKey: "prix_vente",
    header: "Prix Vente",
  },
  {
    accessorKey: "prix_vente_net",
    header: "Prix Vente Net",
  },
  {
    accessorKey: "remise",
    header: "Remise",
  },
  {
    accessorKey: "reference",
    header: "Reference",
  },
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
      <ToastContainer className="mt-20 pt-20"/>
      <h1 className="py-10 text-center">Products Table</h1>
      {data.length > 0 ? (
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
