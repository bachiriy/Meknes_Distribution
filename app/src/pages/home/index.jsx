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
    <div className="hero relative w-full h-[96vh] flex flex-col justify-between items-center overflow-hidden">
      <img className="absolute inset-0 w-full h-full object-cover" src="./sapiens (1).png" alt="Welcome Image" />

      <div className="relative z-10 flex flex-col justify-end items-center text-center text-white p-4 flex-grow">
        <h1 className="mb-4 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Welcome <span>{capitalizeFirstLetter(user.name)}</span>
          </span>
          <span className="text-shadow">
            To Meknes Distribution.
          </span>
        </h1>
      </div>

      <div className="relative z-10 mb-8">
        <Button onClick={handleClick} color="dark">
          Voir les Analyses
        </Button>
      </div>
    </div>
  );
};
