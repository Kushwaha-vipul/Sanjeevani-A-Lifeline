import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
// import { useAuth } from "../../store/auth";

import Home from "../home/Home";
import ReactSwitch from "react-switch";
import { Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPatient } from "../../app/features/patient/patientSlice";
import { useLazyGetProfileQuery } from "../../app/features/patient/PatientApiSlice";

const Login = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [trigger, { data, status }] = useLazyGetProfileQuery();

  const handleChange = (val) => {
    setChecked(val);
  };
  const [currentImage, setCurrentImage] = useState("Doctor.png");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  // const {storeToken} = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the currentImage state to switch between images
      setCurrentImage((prevImage) =>
        prevImage === "Doctor.png" ? "Mobile.jpeg" : "Doctor.png"
      );
    }, 5000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  useEffect(() => {
    if (status == "fulfilled") dispatch(setPatient(data));
  }, [data]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let url = "http://localhost:3000/login";
      checked == true
        ? (url = "http://localhost:3000/doctor/login")
        : (url = "http://localhost:3000/login");

      axios
        .post(url, { username: user, password: pass })
        .then((response) => {
          console.log(response);
          const token = response.data;
          // storeToken(token.token);
        })
        .catch((err) => {
          console.log(err);
        });

      trigger({ user: user }).then(() => {
        localStorage.setItem("doctor", checked);
        // Route to home page after successful login
        checked == true ? navigate("/Doctor-Profile") : navigate("/Home");

        // navigate("/PatientDetails");
      });

      // console.log(response);
      // setAuth(token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="w-1/5 bg-blue-800 h-screen">
          <img
            className="transition-opacity duration-1000 ease-in-out opacity-100 h-full w-full"
            src={`./${currentImage}`}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center items-center w-3/4 mt-[5%]">
          <div
            className="flex justify-center mb-[5%] hover:cursor-pointer w-1/2"
            onClick={() => {
              navigate("/Home");
            }}
          >
            <div className="w-1/6 mr-[3%] -mt-[21%]">
              <img className="size-[85%]" src="./logosan.png" alt="No image" />
            </div>

            <div>
              <img
                className="-mt-[27%] hover:cursor-pointer"
                src="./Sanjeevani.png"
                alt="No image"
                onClick={() => {
                  window.location.href = "/Home";
                }}
              />
            </div>
          </div>
          <div className="mb-[4%] ml-[6%]">
            <div className="text-wrap text-4xl -mt-[9%] text-gray-500">
              Welcome to <b className="text-black">Sanjeevani</b>
            </div>
          </div>
          <div className="-mt-[3%] mb-8 ml-[6%]">
            <div className="text-wrap text-2xl font-thin font-serif text-gray-400">
              Your one stop destination for finding{" "}
              <b className="text-black">doctors</b>
            </div>
            <div
              className="app mt-4 flex flex-row"
              style={{ textAlign: "center" }}
            >
              <ReactSwitch
                className="ml-[30%] mt-[0%]"
                checked={checked}
                onChange={handleChange}
              />
              <span className="ml-[3%] text-lg text-blue-800 font-medium">
                For Doctor
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 w-6/12">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter your Name"
                name="username"
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
                name="password"
                onChange={(e) => setPass(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-center mt-7">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Log In
              </button>
            </div>
            <div className="flex items-center justify-center mt-4">
              <div className="font-bold text-gray-700">
                New to Sanjeevani?{" "}
                <span
                  className="text-blue-400 font-bold hover:cursor-pointer"
                  onClick={() => {
                    navigate("/Signup");
                  }}
                >
                  Signup
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
