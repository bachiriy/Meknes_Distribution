import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import GET from "../../utils/GET";
import Table from "../../components/Table";
import { validateUser } from "../../utils/validationFunctions";

const columns = [
  { accessorKey: "id", header: "Id", enableEditing: false },
  { accessorKey: "name", header: "Nom" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "roleName", header: "Role" },
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
    <div className="overflow-auto w-full h-full p-6 m-20">
      {data ? (
        <Table
          data={data}
          columns={columns}
          entityType="User"
          validateEntity={validateUser}
        />
      ) : (
        <p>No Data.</p>
      )}
    </div>
  );
};
