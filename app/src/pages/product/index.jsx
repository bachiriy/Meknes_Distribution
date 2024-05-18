import { useLayoutEffect, useMemo, useState } from "react";
import DataTable from "../../components/DataTable";
import getProductData from "./getData";
import Spinner from "../../components/Spinner";

export const Product = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  
  const columns = useMemo(
    () => [
      {
        accessorKey: "CIN_ICE", //access nested data with dot notation
        header: "CIN ICE",
        size: 150,
      },
      {
        accessorKey: "CIN_file",
        header: "CIN file",
        size: 150,
      },
      {
        accessorKey: "address", //normal accessorKey
        header: "Address",
        size: 200,
      },
      {
        accessorKey: "first_name",
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "phone",
        header: "Phone Number",
        size: 150,
      },
    ],
    []
  );
  useLayoutEffect(() => {
    const waitForIt = async () => {
      setLoading(true);
      const data = await getProductData();
      setLoading(false)
    };

    waitForIt();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div className="flex">{/* <DataTable /> */}</div>
  );
};
