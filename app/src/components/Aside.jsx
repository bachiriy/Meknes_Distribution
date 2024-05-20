import React, { useState } from "react";
import Cookies from "js-cookie";
import Spinner from "./Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "flowbite-react";

const Aside = ({ page, setPage, setIsConnected }) => {
  const [loading, setLoading] = useState(false);
  const handleLogOut = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPage(0);
    try {
      const response = await fetch(import.meta.env.VITE_REACT_APP_API_URL + "logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
      });

      if (response.ok) {
        Cookies.remove("token");
        Cookies.remove("user");
        setPage(1);
        setIsConnected(false);
      } else {
        const errors = await response.json();
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

  const handlePage = (pageValue, pageLink) => {
    setPage(10);
    setTimeout(() => {
      setPage(pageValue);
    }, 1000);
    // window.location.href = pageLink;
  };

  const menuItems = [
    {
      pageValue: 1,
      pageLink: "/",
      tooltip: "Dossiers Client",
      icon: (
        <path d="M16 5v4a1 1 0 0 0 1 1h4 M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2v-7l-5 -5h-11a2 2 0 0 0 -2 2z" />
      ),
    },
    {
      pageValue: 2,
      pageLink: "/products",
      tooltip: "Products",
      icon: (
        <>
          <circle cx="7" cy="15" r="4" />
          <line x1="7" y1="15" x2="7" y2="15.01" />
          <circle cx="19" cy="17" r="2" />
          <path d="M10.5 17h6.5 M20 15.2v-4.2a1 1 0 0 0 -1 -1h-6l-2 -5h-6v6.5 M18 5h-1a1 1 0 0 0 -1 1v4" />
        </>
      ),
    },
    {
      pageValue: 3,
      pageLink: "/clients",
      tooltip: "Clients",
      icon: (
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      ),
    },
    {
      pageValue: 4,
      pageLink: "/suppliers",
      tooltip: "Suppliers",
      icon: (
        <>
          <circle cx="7" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
          <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v6h-5l2 2m0 -4l-2 2 M9 17h6 M13 6h5l3 5v6h-2" />
        </>
      ),
    },
    {
      pageValue: 5,
      pageLink: "Users",
      tooltip: "Users",
      icon: (
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      ),
    },
    {
      pageValue: 6,
      pageLink: "",
      tooltip: "Categories",
      icon: (
        <>
          <path stroke="none" d="M0 0h24v24H0z" />{" "}
          <rect x="4" y="4" width="6" height="6" rx="1" />{" "}
          <rect x="4" y="14" width="6" height="6" rx="1" />{" "}
          <rect x="14" y="14" width="6" height="6" rx="1" />{" "}
          <line x1="14" y1="7" x2="20" y2="7" />{" "}
          <line x1="17" y1="4" x2="17" y2="10" />
        </>
      ),
    },
    {
      pageValue: 7,
      pageLink: "",
      tooltip: "Parametres",
      icon: (
        <>
          <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </>
      ),
    },
  ];

  const MenuItem = ({ pageValue, pageLink, tooltip, icon }) => (
    <div
      onClick={() => handlePage(pageValue, pageLink)}
      className={`h-6 w-6 flex items-center justify-center rounded-lg cursor-pointer hover:text-white hover:duration-300 hover:ease-linear focus:bg-white ${
        page === pageValue ? "text-white" : "text-neutral-600"
      }`}
    >
      <Tooltip
        content={tooltip}
        placement="right"
        animation="duration-500"
        className="text-center"
      >
        <svg
          className="h-6 w-6"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {icon}
        </svg>
      </Tooltip>
    </div>
  );

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Spinner />
      ) : (
        <aside className="h-full w-12 py-4 flex flex-col space-y-8 items-center fixed bg-[#0a0a0a] text-white">
          {menuItems.map((item, index) => (
            <MenuItem key={index} {...item} />
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
