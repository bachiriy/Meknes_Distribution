import { useEffect, useState } from "react";
import Table from "../../components/Table";
import Spinner from "../../components/Spinner";
import GET from "../../utils/GET";
import { validateProduct } from "../../utils/validationFunctions";

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
  const [data, setData] = useState(null);

  useEffect(() => {
    let recieve = async () => {
      setLoading(true);
      const d = await GET("products");
      setData(d.products);
      setLoading(false);
    };
    recieve();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div className="overflow-auto">
      <h1 className="pb-12 text-center">Products Table</h1>
      {data && (
        <Table
          data={data}
          columns={columns}
          entityType="Product"
          validateEntity={validateProduct}
        />
      )}
    </div>
  );
};
