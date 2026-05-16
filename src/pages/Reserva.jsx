import Footer from "../components/Footer";
import NavBarHeader from "../components/NavBarHeader";
import LogoHeader from "../components/LogoHeader";
import { useEffect, useState } from "react";
import {
    saveLocalStorage,
    getLocalStorage
} from "../helpers/local-storage";
import { redirect } from "../helpers/alerts";

const end_points = {
    libros: "https://jsonplaceholder.typicode.com/posts",
    usuarios: "https://jsonplaceholder.typicode.com/users",
};

function Reserva() {

    const [getUsuario, setUsuario] = useState("");
    const [getLibro, setLibro] = useState("");
    const [getFechaReserva, setFechaReserva] = useState("");
    const [getFechaDevolucion, setFechaDevolucion] = useState("");
    const [getLugar, setLugar] = useState("");
    const [getDireccion, setDireccion] = useState("");
    const [getLibros, setLibros] = useState([]);
    const [getUsuarios, setUsuarios] = useState([]);

    function fetchBooks() {

        fetch(end_points.libros)
            .then((r) => r.json())
            .then((d) => setLibros(d))
            .catch((e) => console.log(e));

        fetch(end_points.usuarios)
            .then((r) => r.json())
            .then((d) => setUsuarios(d))
            .catch((e) => console.log(e));
    }

    useEffect(() => {

        const storedUser = getLocalStorage("user");
        const storedToken = getLocalStorage("token");

        if (!storedUser || !storedToken || storedUser.token !== storedToken) {

            redirect(
                "Debes iniciar sesión para hacer una reserva",
                "/login",
                "error"
            );

            return;
        }

        setUsuario(
            storedUser.nombre ||
            storedUser.name ||
            storedUser.email
        );

        fetchBooks();

    }, []);

    const findUsuario = () =>
        getUsuarios.find(
            (item) =>
                getUsuario === item.name ||
                getUsuario === item.email
        );

    const findLibro = () =>
        getLibros.find(
            (item) =>
                getLibro.toLowerCase() === item.title?.toLowerCase()
        );

    function enviarReserva() {

        const user = findUsuario();
        const libro = findLibro();

        if (!user) {

            redirect(
                "El usuario no fue encontrado",
                "/reserva",
                "error"
            );

            return;
        }

        if (!libro) {

            redirect(
                "El libro no fue encontrado",
                "/reserva",
                "error"
            );

            return;
        }

        if (!getFechaReserva || !getFechaDevolucion) {

            redirect(
                "Completa las fechas de reserva",
                "/reserva",
                "error"
            );

            return;
        }

        if (!getLugar) {

            redirect(
                "Selecciona el lugar de recogida",
                "/reserva",
                "error"
            );

            return;
        }

        const reserva = {
            usuario: user,
            libro: libro,
            fechaReserva: getFechaReserva,
            fechaDevolucion: getFechaDevolucion,
            lugar: getLugar,
            direccion:
                getLugar === "domicilio"
                    ? getDireccion
                    : null,
        };

        saveLocalStorage("reserva", reserva);

        redirect(
            "Reserva realizada con éxito",
            "/index",
            "success"
        );
    }

    return (

        <main className="page-reserva">

            <header className="header">

                <div>
                    <LogoHeader />
                </div>

                <NavBarHeader />

            </header>

            <section className="reserva-section">

                <div className="reserva-glow"></div>

                <div className="reserva-container">

                    <div className="reserva-top">

                        <span className="reserva-badge">
                            Bibooked
                        </span>

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

                            <label>
                                Usuario
                            </label>

                            <input
                                type="text"
                                placeholder="Nombre o correo"
                                value={getUsuario}
                                onChange={(e) =>
                                    setUsuario(e.target.value)
                                }
                            />

                        </div>

                        <div className="input-group">

                            <label>
                                Libro a reservar
                            </label>

                            <input
                                type="text"
                                placeholder="Título del libro"
                                onChange={(e) =>
                                    setLibro(e.target.value)
                                }
                            />

                        </div>

                        <div className="double-input">

                            <div className="input-group">

                                <label>
                                    Fecha de reserva
                                </label>

                                <input
                                    type="date"
                                    onChange={(e) =>
                                        setFechaReserva(e.target.value)
                                    }
                                />

                            </div>

                            <div className="input-group">

                                <label>
                                    Fecha devolución
                                </label>

                                <input
                                    type="date"
                                    onChange={(e) =>
                                        setFechaDevolucion(e.target.value)
                                    }
                                />

                            </div>

                        </div>

                        <div className="radio-section">

                            <p>
                                Lugar de recogida
                            </p>

                            <div className="radio-options">

                                <label>

                                    <input
                                        type="radio"
                                        name="lugar"
                                        value="biblioteca"
                                        onChange={() =>
                                            setLugar("biblioteca")
                                        }
                                    />

                                    Retiro en biblioteca

                                </label>

                                <label>

                                    <input
                                        type="radio"
                                        name="lugar"
                                        value="domicilio"
                                        onChange={() =>
                                            setLugar("domicilio")
                                        }
                                    />

                                    A domicilio

                                </label>

                            </div>

                        </div>

                        {getLugar === "domicilio" && (

                            <div className="input-group">

                                <label>
                                    Dirección
                                </label>

                                <input
                                    type="text"
                                    placeholder="Calle 13 #30-45"
                                    onChange={(e) =>
                                        setDireccion(e.target.value)
                                    }
                                />

                            </div>

                        )}

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