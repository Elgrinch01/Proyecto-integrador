import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { end_points } from "../services/api";
import { redirect } from "../helpers/alerts";
import { generateToken } from "../helpers/token";
import {
  saveLocalStorage,
  getLocalStorage
} from "../helpers/local-storage";

import Footer from "../components/Footer.jsx";
import NavBarHeader from "../components/NavBarHeader.jsx";

import decoracion1 from "../assets/ChatGPT Image May 16, 2026, 03_30_10 PM.png";
import decoracion2 from "../assets/ChatGPT Image May 16, 2026, 03_27_22 PM.png";

const Login = () => {

  const navigate = useNavigate();

  const [getEmail, setEmail] = useState("");
  const [getContraseña, setContraseña] = useState("");
  const [getUsers, setUsers] = useState([]);

  function fetchUsers() {
    fetch(end_points.usuarios)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {

    const storedUser = getLocalStorage("user");
    const storedToken = getLocalStorage("token");

    if (storedUser && storedToken && storedUser.token === storedToken) {

      redirect(
        storedUser.nombre + " ya tiene sesión activa",
        "/index",
        "success"
      );

    } else {
      fetchUsers();
    }

  }, []);

  function findUser() {
    return getUsers.find(
      (item) =>
        getEmail === item.correo &&
        getContraseña === item.contraseña
    );
  }

  function signIn() {

    const user = findUser();

    if (user) {

      const token = generateToken();

      const userWithToken = {
        ...user,
        token
      };

      saveLocalStorage("user", userWithToken);
      saveLocalStorage("token", token);

      redirect(
        user.nombre + " Bienvenido al sistema",
        "/index",
        "success"
      );

    } else {

      redirect(
        "Usuario no encontrado o contraseña incorrecta",
        "/registro",
        "error"
      );
    }
  }

  return (

    <div className="min-h-screen flex flex-col bg-[#f8f6f1] overflow-hidden">

      <NavBarHeader hideButtons />

      <div className="flex-1 flex items-center justify-center px-6 py-16 relative">

       
        <img src={decoracion1} className="absolute top-[40px] left-[30px] w-[280px] opacity-30 rotate-[-18deg] pointer-events-none" />
        <img src={decoracion2} className="absolute top-[120px] right-[40px] w-[240px] opacity-30 rotate-[12deg] pointer-events-none" />
        <img src={decoracion1} className="absolute bottom-[60px] left-[80px] w-[220px] opacity-30 rotate-[20deg] pointer-events-none" />
        <img src={decoracion2} className="absolute bottom-[40px] right-[70px] w-[260px] opacity-30 rotate-[-10deg] pointer-events-none" />
        <img src={decoracion1} className="absolute top-[50%] left-[-40px] w-[180px] opacity-30 rotate-[-30deg] pointer-events-none" />
        <img src={decoracion2} className="absolute top-[52%] right-[-30px] w-[190px] opacity-30 rotate-[18deg] pointer-events-none" />

        <div className="absolute top-[-120px] right-[-120px] w-[420px] h-[420px] rounded-full bg-black/5 blur-3xl"></div>

        <div className="w-full max-w-md relative z-10">

         
          <div className="mb-10 text-center">

            <span className="inline-block px-5 py-2 rounded-full bg-white shadow-md text-sm font-semibold text-[#111111] mb-6">
              Descubre historias
            </span>

            <h2 className="text-5xl font-black text-[#111111] leading-tight mb-4">
              Bienvenido
            </h2>

            <p className="text-[#666666] text-base leading-7">
              Ingresa para acceder a tus reservas, libros favoritos y recomendaciones.
            </p>

          </div>

        
          <form
            className="bg-white rounded-[32px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-black/5 space-y-7"
            onSubmit={(e) => {
              e.preventDefault();
              signIn();
            }}
          >

          
            <div>
              <label className="block text-sm font-semibold text-[#111111] mb-3">
                Correo electrónico
              </label>

              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="ejemplo@email.com"
                className="w-full h-14 px-5 rounded-2xl border border-[#e5e5e5] bg-[#fafafa] text-[#111111] placeholder:text-[#9ca3af] outline-none transition-all duration-300 focus:bg-white focus:border-black focus:shadow-[0_0_0_5px_rgba(0,0,0,0.05)]"
              />
            </div>

           
            <div>
              <label className="block text-sm font-semibold text-[#111111] mb-3">
                Contraseña
              </label>

              <input
                onChange={(e) => setContraseña(e.target.value)}
                type="password"
                placeholder="Ingresa tu contraseña"
                className="w-full h-14 px-5 rounded-2xl border border-[#e5e5e5] bg-[#fafafa] text-[#111111] placeholder:text-[#9ca3af] outline-none transition-all duration-300 focus:bg-white focus:border-black focus:shadow-[0_0_0_5px_rgba(0,0,0,0.05)]"
              />
            </div>

          
            <button
              type="submit"
              className="w-full h-14 rounded-2xl bg-black text-white font-semibold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              Iniciar sesión
            </button>

         
            <div className="text-center mt-4">
              <p className="text-sm text-[#666666]">
                ¿Aún no tienes cuenta?{" "}
                <span
                  onClick={() => navigate("/registro")}
                  className="text-black font-semibold cursor-pointer hover:underline"
                >
                  Regístrate ahora
                </span>
              </p>
            </div>

          </form>

        </div>

      </div>

      <Footer />

    </div>
  );
};

export default Login;