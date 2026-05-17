import React, { useEffect, useState } from "react";
import { end_points } from "../services/api";
import { redirect } from "../helpers/alerts";
import { getLocalStorage } from "../helpers/local-storage";

import Footer from "../components/Footer.jsx";
import NavBarHeader from "../components/NavBarHeader.jsx";

import decoracion1 from "../assets/ChatGPT Image May 16, 2026, 03_30_10 PM.png";
import decoracion2 from "../assets/ChatGPT Image May 16, 2026, 03_27_22 PM.png";

const Registro = () => {

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [documento, setDocumento] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {

    const storedUser = getLocalStorage("user");
    const storedToken = getLocalStorage("token");

    if (storedUser && storedToken && storedUser.token === storedToken) {
      redirect(
        storedUser.nombre + " ya tiene sesión activa",
        "/index",
        "success"
      );
      return;
    }

    fetch(end_points.usuarios)
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.log(error));

  }, []);

  function handleRegister() {

    const userExists = usuarios.some(
      (item) =>
        item.correo === correo ||
        item.documento === documento
    );

    if (!nombre || !correo || !documento || !contraseña) {
      redirect(
        "Completa todos los campos para crear la cuenta",
        "/registro",
        "error"
      );
      return;
    }

    if (userExists) {
      redirect(
        "Ya existe un usuario con ese correo o documento",
        "/registro",
        "error"
      );
      return;
    }

    fetch(end_points.usuarios, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre,
        correo,
        documento,
        contraseña
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No fue posible crear la cuenta");
        }
        return response.json();
      })
      .then(() => {
        redirect(
          "Cuenta creada con éxito",
          "/login",
          "success"
        );
      })
      .catch((error) => {
        console.log(error);
        redirect(
          "No se pudo crear la cuenta",
          "/registro",
          "error"
        );
      });
  }

  return (

    <div className="min-h-screen flex flex-col bg-[#f8f6f1] overflow-hidden">

      <NavBarHeader hideButtons />

      <div className="flex-1 flex items-center justify-center px-6 py-16 relative">

        <img src={decoracion1} className="absolute top-[40px] left-[30px] w-[280px] opacity-30 rotate-[-18deg] pointer-events-none" />
        <img src={decoracion2} className="absolute top-[120px] right-[40px] w-[240px] opacity-30 rotate-[12deg] pointer-events-none" />
        <img src={decoracion1} className="absolute bottom-[60px] left-[80px] w-[220px] opacity-30 rotate-[20deg] pointer-events-none" />
        <img src={decoracion2} className="absolute bottom-[40px] right-[70px] w-[260px] opacity-30 rotate-[-10deg] pointer-events-none" />

        <div className="absolute top-[-120px] right-[-120px] w-[420px] h-[420px] rounded-full bg-black/5 blur-3xl"></div>

        <div className="w-full max-w-md relative z-10">

          <div className="mb-10 text-center">

            <h2 className="text-5xl font-black text-[#111111] leading-tight mb-4">
              Crea tu cuenta
            </h2>

            <p className="text-[#666666] text-base leading-7">
              Completa tus datos para empezar a reservar y guardar tus libros favoritos.
            </p>

          </div>

          <form
            className="bg-white rounded-[32px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-black/5 space-y-7"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >

            <div>
              <label className="block text-sm font-semibold text-[#111111] mb-2">
                Nombre completo
              </label>
              <input
                onChange={(e) => setNombre(e.target.value)}
                type="text"
                placeholder="Escribe tu nombre"
                className="w-full h-14 px-5 rounded-2xl border border-[#e5e5e5] bg-[#fafafa] text-[#111111] outline-none focus:bg-white focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#111111] mb-2">
                Correo electrónico
              </label>
              <input
                onChange={(e) => setCorreo(e.target.value)}
                type="email"
                placeholder="ejemplo@email.com"
                className="w-full h-14 px-5 rounded-2xl border border-[#e5e5e5] bg-[#fafafa] text-[#111111] outline-none focus:bg-white focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#111111] mb-2">
                Número de documento
              </label>
              <input
                onChange={(e) => setDocumento(e.target.value)}
                type="text"
                placeholder="Ingrese su documento"
                className="w-full h-14 px-5 rounded-2xl border border-[#e5e5e5] bg-[#fafafa] text-[#111111] outline-none focus:bg-white focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#111111] mb-2">
                Contraseña
              </label>
              <input
                onChange={(e) => setContraseña(e.target.value)}
                type="password"
                placeholder="Crea una contraseña"
                className="w-full h-14 px-5 rounded-2xl border border-[#e5e5e5] bg-[#fafafa] text-[#111111] outline-none focus:bg-white focus:border-black"
              />
            </div>

            <button
              type="submit"
              className="w-full h-14 rounded-2xl bg-black text-white font-semibold text-lg"
            >
              Crear cuenta
            </button>

          </form>

        </div>

      </div>

      <Footer />

    </div>
  );
};

export default Registro;