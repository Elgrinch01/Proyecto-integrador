import React, { useState, useEffect } from "react";
import { end_points } from "../services/api";
import { redirect } from "../helpers/alerts";

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

  function singIn() {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      
      <div className="w-full max-w-lg px-6">
        
        <h2 className="text-center text-4xl font-bold text-white mb-12">
          Iniciar sesión
        </h2>

        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            singIn();
          }}
        >
          {/* EMAIL */}
          <div className="space-y-2">
            <label className="block text-sm text-gray-400">
              Correo
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="ejemplo@email.com"
              className="w-full rounded-lg bg-gray-900 px-4 py-3 text-lg text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

     
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Contraseña</span>
            
            </div>

            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="********"
              className="w-full rounded-lg bg-gray-900 px-4 py-3 text-lg text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

      
          <button
            type="submit"
            className="w-full py-3 text-lg rounded-lg bg-gray-200 hover:bg-white text-gray-900 font-semibold transition"
          >
            Entrar
          </button>
        </form>

      
      

      </div>
    </div>
  );
};

export default Login;