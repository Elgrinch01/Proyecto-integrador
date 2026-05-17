import React, { useEffect, useState } from "react";
import { end_points } from "../services/api";
import { redirect } from "../helpers/alerts";
import { getLocalStorage } from "../helpers/local-storage";

import Footer from "../components/Footer.jsx";
import NavBarHeader from "../components/NavBarHeader.jsx";

import decoracion1 from "../assets/ChatGPT Image May 16, 2026, 03_30_10 PM.png";
import decoracion2 from "../assets/ChatGPT Image May 16, 2026, 03_27_22 PM.png";

const AgregarLibro = () => {

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [editorial, setEditorial] = useState("");

  useEffect(() => {
    const storedUser = getLocalStorage("user");
    const storedToken = getLocalStorage("token");

    if (!storedUser || !storedToken || storedUser.token !== storedToken) {
      redirect(
        "Debes iniciar sesión para agregar libros",
        "/login",
        "error"
      );
    }
  }, []);

  function handleAddBook() {

    if (!titulo || !autor) {
      redirect("Completa título y autor", "/agregar-libro", "error");
      return;
    }

    fetch(end_points.libros, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: titulo,
        autor,
        genero,
        editorial: { nombreEditorial: editorial }
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error creando libro");
        return res.json();
      })
      .then(() => {
        redirect("Libro agregado", "/catalogo", "success");
      })
      .catch((err) => {
        console.error(err);
        redirect("No se pudo agregar el libro", "/agregar-libro", "error");
      });
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f6f1] overflow-hidden">

      <NavBarHeader />

      <div className="flex-1 flex items-center justify-center px-6 py-16 relative">
        <img src={decoracion1} alt="Decoración" className="absolute top-[40px] left-[30px] w-[280px] opacity-30 rotate-[-18deg] pointer-events-none" />
        <img src={decoracion2} alt="Decoración" className="absolute top-[120px] right-[40px] w-[240px] opacity-30 rotate-[12deg] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">

          <div className="mb-10 text-center">
            <span className="inline-block px-5 py-2 rounded-full bg-white shadow-md text-sm font-semibold text-[#111111] mb-6">Agregar Libro</span>
            <h2 className="text-4xl font-black text-[#111111] leading-tight mb-4">Nuevo libro</h2>
            <p className="text-[#666666] text-base leading-7">Rellena la información del libro para añadirlo al catálogo.</p>
          </div>

          <form className="bg-white rounded-[32px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-black/5 space-y-5" onSubmit={(e) => { e.preventDefault(); handleAddBook(); }}>

            <div>
              <label className="block text-sm font-semibold text-[#111111] mb-2">Título</label>
              <input onChange={(e) => setTitulo(e.target.value)} type="text" placeholder="Título del libro" className="w-full h-12 px-4 rounded-xl border border-[#e5e5e5] bg-[#fafafa]" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#111111] mb-2">Autor</label>
              <input onChange={(e) => setAutor(e.target.value)} type="text" placeholder="Autor" className="w-full h-12 px-4 rounded-xl border border-[#e5e5e5] bg-[#fafafa]" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#111111] mb-2">Género</label>
              <input onChange={(e) => setGenero(e.target.value)} type="text" placeholder="Género" className="w-full h-12 px-4 rounded-xl border border-[#e5e5e5] bg-[#fafafa]" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#111111] mb-2">Editorial</label>
              <input onChange={(e) => setEditorial(e.target.value)} type="text" placeholder="Editorial" className="w-full h-12 px-4 rounded-xl border border-[#e5e5e5] bg-[#fafafa]" />
            </div>


            <button type="submit" className="w-full h-12 rounded-xl bg-black text-white font-semibold">Agregar libro</button>

          </form>

        </div>

      </div>

      <Footer />

    </div>
  );
};

export default AgregarLibro;