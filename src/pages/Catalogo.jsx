import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import LogoHeader from "../components/LogoHeader";
import NavBarHeader from "../components/NavBarHeader";
import "../App.css";

function Catalogo() {

    const [libros, setLibros] = useState([]);

    useEffect(() => {

        obtenerLibros();

    }, []);

    async function obtenerLibros() {

        try {

            const respuesta = await fetch(
                "http://localhost:8080/libros"
            );

            const data = await respuesta.json();

            setLibros(data);

        } catch (error) {

            console.log(error);
        }
    }

   return (
  <main className="catalogo-page">

    <header className="header">
      <LogoHeader />
      <NavBarHeader showSearch />
    </header>

    <section className="catalogo-section">

      <div className="catalogo-glow"></div>

      <div className="catalogo-container">

        <div className="catalogo-top">

          <h1>
            Nuestro <span>Catálogo</span>
          </h1>

          <p>
            Explora todos los libros disponibles
            en nuestra biblioteca
          </p>

        </div>

        <section className="catalogo-grid">

          {libros.map((libro) => (

            <div
              className="catalogo-card"
              key={libro.libroId}
            >

              <img
                src={libro.imagen}
                alt={libro.nombre}
                className="catalogo-img"
              />

              <div className="catalogo-info">

                <h2>{libro.nombre}</h2>

                <p>
                  <strong>Autor:</strong>{" "}
                  {libro.autor}
                </p>

                <p>
                  <strong>Género:</strong>{" "}
                  {libro.genero}
                </p>

                <p>
                  <strong>Editorial:</strong>{" "}
                  {libro.editorial?.nombreEditorial}
                </p>

              </div>

            </div>

          ))}

        </section>

      </div>

    </section>

    <Footer />

  </main>
);
}

export default Catalogo;