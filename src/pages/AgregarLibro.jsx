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
  const [imagen, setImagen] = useState("");
  const [editoriales, setEditoriales] = useState([]);
  const [editorialId, setEditorialId] = useState("");

  useEffect(() => {
    const storedUser = getLocalStorage("user");
    const storedToken = getLocalStorage("token");

    if (!storedUser || !storedToken || storedUser.token !== storedToken) {
      redirect("Debes iniciar sesión para agregar libros", "/login", "error");
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/editoriales")
      .then((res) => res.json())
      .then((data) => setEditoriales(data))
      .catch((err) => console.error(err));
  }, []);

  function handleAddBook() {

    if (!titulo || !autor || !editorialId) {
      redirect("Completa los campos obligatorios", "/agregar-libro", "error");
      return;
    }

    fetch(end_points.libros, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: titulo,
        autor,
        genero,
        imagen,
        editorial: {
          editorialId: Number(editorialId)
        }
      })
    })
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.text();
          throw new Error(error);
        }
        return res.json();
      })
      .then(() => {
        redirect("Libro agregado correctamente", "/catalogo", "success");
      })
      .catch(() => {
        redirect("Error al agregar libro", "/agregar-libro", "error");
      });
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f6f1] overflow-hidden">

      <NavBarHeader />

      <div className="flex-1 flex items-center justify-center px-6 py-16 relative">

        <img src={decoracion1} className="absolute top-[40px] left-[30px] w-[280px] opacity-30 rotate-[-18deg] pointer-events-none" />
        <img src={decoracion2} className="absolute top-[120px] right-[40px] w-[240px] opacity-30 rotate-[12deg] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">

          <div className="mb-10 text-center">
            <span className="inline-block px-5 py-2 rounded-full bg-white shadow-md text-sm font-semibold">
              Agregar Libro
            </span>
            <h2 className="text-4xl font-black">Nuevo libro</h2>
            <p className="text-[#666]">Completa la información del libro</p>
          </div>

          <form
            className="bg-white rounded-[32px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddBook();
            }}
          >

            <div>
              <label className="block text-sm font-semibold mb-2">
                Título
              </label>
              <input
                onChange={(e) => setTitulo(e.target.value)}
                type="text"
                className="w-full h-12 px-4 rounded-xl border"
                placeholder="Título del libro"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Autor
              </label>
              <input
                onChange={(e) => setAutor(e.target.value)}
                type="text"
                className="w-full h-12 px-4 rounded-xl border"
                placeholder="Autor"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Género
              </label>
              <input
                onChange={(e) => setGenero(e.target.value)}
                type="text"
                className="w-full h-12 px-4 rounded-xl border"
                placeholder="Género"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Editorial
              </label>
              <select
                onChange={(e) => setEditorialId(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border bg-[#fafafa]"
              >
                <option value="">Selecciona editorial</option>
                {editoriales.map((ed) => (
                  <option key={ed.editorialId} value={ed.editorialId}>
                    {ed.nombreEditorial}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Portada (URL)
              </label>
              <input
                onChange={(e) => setImagen(e.target.value)}
                type="text"
                className="w-full h-12 px-4 rounded-xl border"
                placeholder="URL de la imagen"
              />
            </div>

            <button className="w-full h-12 rounded-xl bg-black text-white font-semibold">
              Agregar libro
            </button>

          </form>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AgregarLibro;