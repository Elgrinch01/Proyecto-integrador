import React, { useState, useEffect } from "react";
import { end_points } from "../services/api";
import { redirect } from "../helpers/alerts";
import logo from "../assets/Logo.png";


const Login = () => {
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getUsers, setUsers] = useState([]);

  function fetchUsers() {
    fetch(end_points.users)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function findUser() {
    return getUsers.find(
      (item) =>
        getEmail === item.email && getPassword === item.password
    );
  }

  function signIn() {
    const user = findUser();

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));

      redirect(
        user.fullName + " Bienvenido al sistema",
        "/Index",
        "success"
      );

    } else {
      redirect(
        "El correo o la contraseña son incorrectos",
        "/",
        "error"
      );
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white bg-[radial-gradient(circle_at_top,_#f8fafc_0%,_#ffffff_45%,_#f3f4f6_100%)]">
      
      <div className="w-full max-w-lg px-6">
        <div className="mb-6 flex justify-center">
          <div className="rounded-2xl border border-gray-200 bg-white/90 px-8 py-4 shadow-sm backdrop-blur-sm">
            <img
              src={logo}
              alt="Logo de la biblioteca"
              className="h-16 w-auto object-contain"
            />
          </div>
        </div>
        
        <h2 className="text-center text-4xl font-bold text-gray-900 mb-12">
          Iniciar sesión
        </h2>

        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Correo
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="ejemplo@email.com"
              className="w-full rounded-xl bg-white px-4 py-3 text-base text-gray-900 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
            />
          </div>

     
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-700">
              <span>Contraseña</span>
            
            </div>

            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="********"
              className="w-full rounded-xl bg-white px-4 py-3 text-base text-gray-900 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
            />
          </div>

      
          <button
            type="submit"
            className="w-full py-3 text-lg rounded-xl bg-gradient-to-r from-slate-900 to-blue-800 text-white font-semibold shadow-md shadow-blue-200/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-300/60 focus:outline-none focus:ring-4 focus:ring-blue-200 active:translate-y-0"
          >
            Entrar
          </button>
        </form>

      
      

      </div>
    </div>
  );
};

export default Login;