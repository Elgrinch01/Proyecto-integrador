import React, { useState, useEffect } from "react";
import { end_points } from "../services/api";
import { redirect } from "../helpers/alerts";
import Footer from "../components/Footer.jsx";
import NavBarHeader from "../components/NavBarHeader.jsx";


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
    <div className="min-h-screen flex flex-col bg-white bg-[radial-gradient(circle_at_top,_#f8fafc_0%,_#ffffff_45%,_#f3f4f6_100%)]">
      <NavBarHeader hideButtons />

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg px-6">
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
            
            <div className="space-y-1.5">
              <label className="block text-[14px] font-semibold text-[#0f1111]">
                Correo
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="ejemplo@email.com"
                className="w-full h-11 rounded-md border border-[#a6a6a6] bg-white px-3 text-[15px] text-[#0f1111] placeholder:text-gray-400 shadow-[inset_0_1px_2px_rgba(15,17,17,0.08)] transition focus:outline-none focus:border-[#e77600] focus:ring-3 focus:ring-[#fbd8b4]"
              />
            </div>

      
            <div className="space-y-1.5">
              <div className="flex justify-between text-[14px] font-semibold text-[#0f1111]">
                <span>Contraseña</span>
              
              </div>

              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="********"
                className="w-full h-11 rounded-md border border-[#a6a6a6] bg-white px-3 text-[15px] text-[#0f1111] placeholder:text-gray-400 shadow-[inset_0_1px_2px_rgba(15,17,17,0.08)] transition focus:outline-none focus:border-[#e77600] focus:ring-3 focus:ring-[#fbd8b4]"
              />
            </div>

        
            <button
              type="submit"
              className="mt-10 w-full py-5 text-2xl rounded-2xl border border-[#f0c14b] bg-gradient-to-b from-[#ffe082] to-[#ffcc4d] text-[#111827] font-bold shadow-md shadow-amber-200/70 transition-all duration-300 hover:-translate-y-0.5 hover:from-[#ffd760] hover:to-[#f6be2d] hover:shadow-lg hover:shadow-amber-300/70 focus:outline-none focus:ring-4 focus:ring-amber-200 active:translate-y-0"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;