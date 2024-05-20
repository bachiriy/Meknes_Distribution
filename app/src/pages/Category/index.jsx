import { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import Spinner from "../../components/Spinner";
import GET from "../../utils/GET";


const columns = [
    {
      accessorKey: "id",
      header: "Id",
      size: 100,
    },
    {
      accessorKey: "name",
      header: "Category Name",
      size: 200,
    },
    {
        accessorKey: "groups",
        header: "Groups",
        size: 400,
    }
  ];

function Category() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    let recieve = async () => {
      setLoading(true);
      const d = await GET("categories");
      const processedData = d.categories.map((category) => ({
        ...category,
        groups: category.groups.slice(0, 3).map((group) => group.name).join(", ") + "...",
      }));
      setData(processedData);
      setLoading(false);
    };
    recieve();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div className="ml-12 p-4">
      <h1 className="pb-12 text-center">Categories Table</h1>
      {data ? (
        <DataTable data={data} columns={columns} />
      ) : (
        <div className="text-center">Table is Empty</div>
      )}
    </div>
  );
}

export default Category;
