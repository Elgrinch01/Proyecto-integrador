import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Footer from "../components/Footer";
import LogoHeader from "../components/LogoHeader";
import NavBarHeader from "../components/NavBarHeader";

import "../App.css";

function VistaLibro() {

    const { id } = useParams();

    const [libro, setLibro] = useState(null);

    useEffect(() => {

        obtenerLibro();

    }, []);

    async function obtenerLibro() {

        try {

            const respuesta = await fetch(
                `http://localhost:8080/libros/${id}`
            );

            const data = await respuesta.json();

            setLibro(data);

        } catch (error) {

            console.log(error);
        }
    }

    if (!libro) {

        return <h1>Cargando libro...</h1>;
    }

    return (

        <main className="vista-libro-page">

            <header className="header">
                <LogoHeader />
                <NavBarHeader />
            </header>

            <section className="vista-libro-section">

                <div className="vista-libro-container">

                    <div className="vista-libro-img-box">

                        <img
                            src={libro.imagen}
                            alt={libro.nombre}
                            className="vista-libro-img"
                        />

                    </div>

                    <div className="vista-libro-info">

                        <h1>{libro.nombre}</h1>

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

            </section>

            <Footer />

        </main>
    );
}

export default VistaLibro;