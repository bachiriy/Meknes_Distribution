import { Button } from "flowbite-react";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const Home = (props) => {
  const user = JSON.parse(Cookies.get('user'));
  const navigate = useNavigate();

  const handleClick = () => {
      props.setPage(8);
    navigate('stats');
  };
  
  return (
    <div className="hero">

      <div className="flex justify-end items-center w-full flex-col absolute top-[74%]">
        <h1 class="mb-4 text-lg font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Welcome <span className="">{capitalizeFirstLetter(user.name)}</span> </span> To Meknes Distribution.</h1>
        <p class="text-sm font-normal text-gray-500 lg:text-sm dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>

      </div>

      <div className="flex justify-center items-center flex-col">
        <img className="h-1/2 w-1/2" src="./sapiens (1).png" alt="" />
        <Button
          onClick={handleClick}
          color="dark"
        >
          {" "}
          See Analytics
        </Button>
      </div>
    </div>
  );
};
