import React, { useState } from "react";
import Cookies from "js-cookie";
import Spinner from "../Other/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "flowbite-react";
import POST from "../../utils/POST";
import { MenuList } from "./MenuList";
import { MenuItem } from "./MenuItem";

const Aside = ({ page, setPage, setIsConnected }) => {
  const [loading, setLoading] = useState(false);

  const handleLogOut = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPage(0);
    try {
      const response = await POST("logout");

      if (response) {
        Cookies.remove("token");
        Cookies.remove("user");
        setPage(1);
        setIsConnected(false);
      } else {
        const errors = response.error;
        console.log("Error logging out: " + errors);
        toast.error("Failed to log out. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Spinner />
      ) : (
        <aside className="h-[calc(100vh-30px)] w-12 py-4 flex fixed z-50 flex-col space-y-8 items-center bg-[#0a0a0a] text-white">
          {MenuList.map((item, index) => (
            <MenuItem page={page} setPage={setPage} key={index} {...item} />
          ))}
          <div className="flex flex-col items-center justify-end h-full">
            <form onSubmit={handleLogOut}>
              <button>
                <Tooltip
                  content="Deconnexion"
                  placement="right"
                  animation="duration-500"
                  className="text-center"
                >
                  <svg
                    className="h-6 w-6 text-gray-600 hover:text-red-500 cursor-pointer"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                    <path d="M7 12h14l-3 -3m0 6l3 -3" />
                  </svg>
                </Tooltip>
              </button>
            </form>
          </div>
        </aside>
      )}
    </>
  );
};

export default Aside;
