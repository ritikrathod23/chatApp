import React from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
const API_URL = import.meta.env.VITE_URL;

function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();
    const { name, email, password } = event.target.elements;
    console.log("data", email.value, password.value);

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://chatapp-x05b.onrender.com/user/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.value,
            email: email.value,
            password: password.value,
          }),
          credentials: "include",
        }
      );

      // Parse the JSON response
      const data = await response.json();
      if (data) {
        setIsLoading(false);
      }

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
        toast.success("Account created successfully");
        console.log("Signup successful:", data);
      } else {
        toast.error("Invalid credentials");
        console.error("Signup failed:", data);
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
    }
  };
  return (
    <>
      <Toaster position="top-center" />
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-b from-indigo-600 to-indigo-400 bg-cover bg-no-repeat">
        <div className="rounded-xl bg-gradient-to-b from-indigo-600 to-indigo-400 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <img
                src="https://static-00.iconduck.com/assets.00/chat-icon-1024x1024-o88plv3x.png"
                width="60"
                alt=""
              />
              <h1 className="mb-2 text-2xl">Chat App</h1>
              <span className="text-gray-300">Enter Signup Details</span>
            </div>
            <form onSubmit={handleSignup}>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-indigo-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="example"
                />
              </div>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-indigo-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@email.com"
                />
              </div>

              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-indigo-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="Password"
                  name="password"
                  id="password"
                  placeholder="*********"
                />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  disabled={isLoading}
                  type="submit"
                  className={`${isLoading ? "bg-gray-700 " : "bg-indigo-400 bg-opacity-50 hover:bg-indigo-600" } rounded-3xl  px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 `}
                >
                  Signup
                </button>
              </div>
            </form>
            <Link to={"/"}>
              <p className="my-4 text-center text-indigo-200 hover:text-indigo-50 ">
                Already have an account? Login
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
