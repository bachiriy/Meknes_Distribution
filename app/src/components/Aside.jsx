import React from "react";
import Cookies from "js-cookie";
import Spinner from "./Spinner";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "flowbite-react";

const Aside = ({ inPage }) => {
  const handleLogOut = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
      });
      if (response.ok) {
        Cookies.remove("token");
        Cookies.remove("user");
        setIsConnected(false);
      } else {
        const errors = await response.json();
        console.log("error loging out : " + errors);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("An error occurred:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  const handlePage = (pageValue, pageLink) => {
    setPage(pageValue);
    // window.location.href = pageLink;
  };

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Spinner />
      ) : (
        <aside className="h-full w-12 py-4 flex flex-col space-y-8 items-center fixed bg-[#0a0a0a] text-white">
          <div
            onClick={() => {
              handlePage(1, "/");
            }}
            className={
              "h-6 w-6 flex items-center justify-center rounded-lg cursor-pointer hover:text-white hover:duration-300 hover:ease-linear focus:bg-white " +
              (page === 1 ? "text-white" : "text-neutral-600")
            }
          >
            <Tooltip
              content="Dossiers Client"
              placement="right"
              animation="duration-500"
              className="text-center"
            >
              <svg
                class="h-6 w-6"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <path d="M16 5v4a1 1 0 0 0 1 1h4" />{" "}
                <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2v-7l-5 -5h-11a2 2 0 0 0 -2 2z" />
              </svg>
            </Tooltip>
          </div>

          <div
            onClick={() => {
              handlePage(2, "/products");
            }}
            className={
              "h-6 w-6 flex items-center justify-center rounded-lg cursor-pointer hover:text-white hover:duration-300 hover:ease-linear focus:bg-white " +
              (page === 2 ? "text-white" : "text-neutral-600")
            }
          >
            <Tooltip
              content="Products"
              placement="right"
              animation="duration-500"
              className="text-center"
            >
              <svg
                class="h-6 w-6"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <circle cx="7" cy="15" r="4" />{" "}
                <line x1="7" y1="15" x2="7" y2="15.01" />{" "}
                <circle cx="19" cy="17" r="2" /> <path d="M10.5 17h6.5" />{" "}
                <path d="M20 15.2v-4.2a1 1 0 0 0 -1 -1h-6l-2 -5h-6v6.5" />{" "}
                <path d="M18 5h-1a1 1 0 0 0 -1 1v4" />
              </svg>
            </Tooltip>
          </div>

          <div
            onClick={() => {
              handlePage(3, "/clients");
            }}
            className={
              "h-6 w-6 flex items-center justify-center rounded-lg cursor-pointer hover:text-white hover:duration-300 hover:ease-linear focus:bg-white " +
              (page === 3 ? "text-white" : "text-neutral-600")
            }
          >
            <Tooltip
              content="Clients"
              placement="right"
              animation="duration-500"
              className="text-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </Tooltip>
          </div>
          <div
            onClick={() => {
              handlePage(4);
            }}
            className={
              "h-6 w-6 flex items-center justify-center rounded-lg cursor-pointer hover:text-white hover:duration-300 hover:ease-linear focus:bg-white " +
              (page === 4 ? "text-white" : "text-neutral-600")
            }
          >
            <Tooltip
              content="Parametre"
              placement="right"
              animation="duration-500"
              className="text-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </Tooltip>
          </div>

          <div
            onClick={() => {
              handlePage(5);
            }}
            className={
              "h-6 w-6 flex items-center justify-center rounded-lg cursor-pointer hover:text-white hover:duration-300 hover:ease-linear focus:bg-white " +
              (page === 5 ? "text-white" : "text-neutral-600")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
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
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />{" "}
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
