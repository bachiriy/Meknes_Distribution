import { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import Spinner from "../../components/Spinner";
import GET from "../../utils/GET";

const columns = [
  { accessorKey: "id", header: "Id", size: 100 },
  { accessorKey: "name", header: "Nom", size: 200 },
  { accessorKey: "email", header: "Email", size: 100 },
  { accessorKey: "roleName", header: "Role", size: 200 },
];

export const User = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    let recieve = async () => {
      setLoading(true);
      const d = await GET("users");
      const processedData = d.users.map((user) => ({
        ...user,
        roleName:
          user.roles && user.roles.length > 0 ? user.roles[0].name : "No Role",
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
      {data ? <DataTable data={data} columns={columns} /> : <p>No Data.</p>}
    </div>
  );
};
