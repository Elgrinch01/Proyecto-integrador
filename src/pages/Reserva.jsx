import Footer from "../components/Footer";
import NavBarHeader from "../components/NavBarHeader";
import LogoHeader from "../components/LogoHeader";
import { useEffect, useState } from "react";
import { getLocalStorage } from "../helpers/local-storage";
import { redirect } from "../helpers/alerts";
import { end_points } from "../services/api";

function Reserva() {

    const [getUsuario, setUsuario] = useState("");
    const [getFechaReserva, setFechaReserva] = useState("");
    const [getFechaDevolucion, setFechaDevolucion] = useState("");
    const [getLugar, setLugar] = useState("");

    const [busquedaLibro, setBusquedaLibro] = useState("");
    const [resultadosLibros, setResultadosLibros] = useState([]);
    const [libroSeleccionado, setLibroSeleccionado] = useState(null);

    useEffect(() => {

        const storedUser = getLocalStorage("user");
        const storedToken = getLocalStorage("token");

        if (!storedUser || !storedToken || storedUser.token !== storedToken) {
            redirect("Debes iniciar sesión para hacer una reserva", "/login", "error");
            return;
        }

        setUsuario(storedUser);

    }, []);

    useEffect(() => {

        if (busquedaLibro.trim() === "") {
            setResultadosLibros([]);
            return;
        }

        const buscar = async () => {
            try {
                const res = await fetch(
                    `${end_points.libros}/buscar?nombre=${busquedaLibro}`
                );

                const data = await res.json();
                setResultadosLibros(data);

            } catch (err) {
                console.log(err);
            }
        };

        buscar();

    }, [busquedaLibro]);

    function seleccionarLibro(libro) {
        setLibroSeleccionado(libro);
        setBusquedaLibro(libro.nombre);
        setResultadosLibros([]);
    }

    function enviarReserva() {

        if (!libroSeleccionado) {
            redirect("Selecciona un libro", "/reserva", "error");
            return;
        }

        if (!getFechaReserva || !getFechaDevolucion) {
            redirect("Completa las fechas de reserva", "/reserva", "error");
            return;
        }

        if (!getLugar) {
            redirect("Selecciona el lugar de recogida", "/reserva", "error");
            return;
        }

        const storedUser = getLocalStorage("user");

        const reserva = {
            usuarioId: storedUser.usuarioId,
            libroId: libroSeleccionado.libroId,
            fechaPrestamo: getFechaReserva,
            fechaDevolucion: getFechaDevolucion,
            tipoReserva: getLugar
        };

        fetch(end_points.reservas, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reserva)
        })
        .then(res => {
            if (!res.ok) throw new Error("Error creando reserva");
            return res.json();
        })
        .then(() => {
            redirect("Reserva realizada con éxito", "/index", "success");
        })
        .catch(err => {
            console.log(err);
            redirect("Error al crear reserva", "/reserva", "error");
        });
    }

    return (

        <main className="page-reserva">

            <header className="header">
                <LogoHeader />
                <NavBarHeader />
            </header>

            <section className="reserva-section">

                <div className="reserva-glow"></div>

                <div className="reserva-container">

                    <div className="reserva-top">

                        <h1>
                            Reserva tu próximo
                            <span> libro </span>
                        </h1>

                        <p>
                            Selecciona tu libro favorito y disfruta
                            una experiencia rápida, moderna y elegante.
                        </p>

                    </div>

                    <div className="reserva-form">

                        <div className="input-group">

                            <label>Usuario</label>

                            <input
                                type="text"
                                value={getUsuario.nombre || getUsuario.email || ""}
                                readOnly
                            />

                        </div>

                        <div className="input-group">

                            <label>Libro a reservar</label>

                            <input
                                type="text"
                                placeholder="Buscar libro..."
                                value={busquedaLibro}
                                onChange={(e) => setBusquedaLibro(e.target.value)}
                            />

                            {resultadosLibros.length > 0 && (
                                <div className="search-results">
                                    {resultadosLibros.map((libro) => (
                                        <div
                                            key={libro.libroId}
                                            className="search-item"
                                            onClick={() => seleccionarLibro(libro)}
                                        >
                                            {libro.nombre} - {libro.autor}
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>

                        <div className="double-input">

                            <div className="input-group">
                                <label>Fecha de reserva</label>
                                <input
                                    type="date"
                                    onChange={(e) => setFechaReserva(e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label>Fecha devolución</label>
                                <input
                                    type="date"
                                    onChange={(e) => setFechaDevolucion(e.target.value)}
                                />
                            </div>

                        </div>

                        <div className="radio-section">

                            <p>Lugar de recogida</p>

                            <div className="radio-options">

                                <label>
                                    <input
                                        type="radio"
                                        name="lugar"
                                        onChange={() => setLugar("biblioteca")}
                                    />
                                    Retiro en biblioteca
                                </label>

                                <label>
                                    <input
                                        type="radio"
                                        name="lugar"
                                        onChange={() => setLugar("domicilio")}
                                    />
                                    A domicilio
                                </label>

                            </div>

                        </div>

                        <button
                            className="reserva-btn"
                            onClick={enviarReserva}
                        >
                            Confirmar reserva
                        </button>

                    </div>

                </div>

            </section>

            <Footer />

        </main>
    );
}

export default Reserva;