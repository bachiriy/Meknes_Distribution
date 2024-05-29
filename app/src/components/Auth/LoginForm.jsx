import React from "react";
import { useState } from "react";
import Cookies from "js-cookie";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import POST from "../../utils/POST";

export const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    props.setLoading(true);

    try {
      const data = await POST("login", {
        email,
        password
      });

      if (data) {
        if (data.status === "success") {
          props.setLoading(false);
          console.log(data);
          Cookies.set("token", data.data.token, { expires: 7 });
          Cookies.set("user", JSON.stringify(data.data.user), { expires: 7 });
          console.log(JSON.parse(Cookies.get("user")));
          props.setIsConnected(true);
        }
      } else {
        props.setLoading(false);
        console.log(data.message);
        if (data.errors) {
          if (data.errors.email) toast.error(data.errors.email[0]);
          if (data.errors.password) toast.error(data.errors.password[0]);
        }
        if (data.status === "failed") toast.error(data.message);
      }
    } catch (error) {
      props.setLoading(false);
      console.error("An error occurred:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="mt-8 grid grid-cols-6 gap-6">
      <div className="col-span-6 ">
        <label
          htmlFor="Email"
          className="block text-sm font-medium text-gray-500"
        >
          {" "}
          Email{" "}
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          id="Email"
          name="email"
          className="mt-1 p-2 w-full rounded-md border border-gray-500 bg-white text-sm text-gray-700 shadow-sm"
        />
        {/* <p className="text-red-800">hey this is an error</p> */}
      </div>
      <div className="col-span-6">
        <label
          htmlFor="Password"
          className="block text-sm  font-medium text-gray-500 "
        >
          {" "}
          Password{" "}
        </label>

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="Password"
          name="password"
          className="mt-1 p-2 w-full rounded-md border border-gray-500 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>
      <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
        <button className="inline-block shrink-0 rounded-md border border-[#0a0a0a] bg-[#0a0a0a] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#0a0a0a] focus:outline-none focus:ring active:text-[#0a0a0a]">
          Login
        </button>
      </div>
    </form>
  );
};
