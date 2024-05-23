import { Button } from "flowbite-react";
import "./style.css";
export const Home = (props) => {
  return (
    <div className="hero">
      <h1 className=" text-green-500 text-center">Home</h1>
      <div className="flex justify-center items-center flex-col">
        <img className="h-1/2 w-1/2" src="./sapiens (1).png" alt="" />
        <Button
          onClick={() => {
            props.setPage(8);
          }}
          color="dark"
        >
          {" "}
          See Analytics
        </Button>
      </div>
    </div>
  );
};
