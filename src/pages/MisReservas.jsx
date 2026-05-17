import { useEffect, useState } from "react";

import Footer from "../components/Footer";
import NavBarHeader from "../components/NavBarHeader";

import { end_points } from "../services/api";
import { getLocalStorage } from "../helpers/local-storage";
import { redirect } from "../helpers/alerts";

import "../App.css";

function MisReservas() {

    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        obtenerReservas();
    }, []);

    async function obtenerReservas() {

        try {

            const usuario = getLocalStorage("user");

            if (!usuario) {

                redirect(
                    "Debes iniciar sesión",
                    "/login",
                    "error"
                );

                return;
            }

           
            const responseReservas = await fetch(
                end_points.reservas
            );

            const dataReservas =
                await responseReservas.json();

          
            const responseReservaLibros =
                await fetch(
                    end_points.reservaLibros
                );

            const dataReservaLibros =
                await responseReservaLibros.json();

            console.log(
                "RESERVAS:",
                dataReservas
            );

            console.log(
                "RESERVA LIBROS:",
                dataReservaLibros
            );

          
            const reservasUsuario =
                dataReservas
                    .filter(
                        (reserva) =>
                            Number(
                                reserva.usuario?.usuarioId
                            ) ===
                            Number(usuario.usuarioId)
                    )
                    .map((reserva) => {

                      
                        const reservaLibro =
                            dataReservaLibros.find(
                                (item) =>
                                    Number(
                                        item.reserva?.reservaId
                                    ) ===
                                    Number(
                                        reserva.reservaId
                                    )
                            );

                        return {

                            ...reserva,

                            libroTitulo:

                                reservaLibro?.libro
                                    ?.titulo ||

                                reservaLibro?.libro
                                    ?.nombre ||

                                "Libro reservado"

                        };

                    });

            console.log(
                "RESERVAS FILTRADAS:",
                reservasUsuario
            );

            setReservas(reservasUsuario);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    }

    return (
        <>
            <NavBarHeader />

            <div className="mis-reservas-page">

                <div className="mis-reservas-header">

                    <h1>
                        Mis Reservas
                    </h1>

                    <p>
                        Aquí puedes ver únicamente
                        las reservas realizadas
                        con tu cuenta.
                    </p>

                </div>

                {
                    loading
                    ?
                    <div className="mis-reservas-empty">

                        <p>
                            Cargando reservas...
                        </p>

                    </div>
                    :
                    reservas.length > 0
                    ?
                    <div className="reservas-grid">

                        {
                            reservas.map((reserva) => (

                                <div
                                    key={reserva.reservaId}
                                    className="reserva-card"
                                >

                                    <div className="reserva-top">

                                        <span className="estado-badge">
                                            {
                                                reserva.tipoReserva ||
                                                "Reserva"
                                            }
                                        </span>

                                    </div>

                                    <h2>
                                        {
                                            reserva.libroTitulo
                                        }
                                    </h2>

                                    <div className="reserva-info">

                                        <p>

                                            <strong>
                                                Fecha préstamo:
                                            </strong>

                                            {" "}

                                            {
                                                reserva.fechaPrestamo
                                            }

                                        </p>

                                        <p>

                                            <strong>
                                                Fecha devolución:
                                            </strong>

                                            {" "}

                                            {
                                                reserva.fechaDevolucion
                                            }

                                        </p>

                                        <p>

                                            <strong>
                                                Usuario:
                                            </strong>

                                            {" "}

                                            {
                                                reserva.usuario?.nombre
                                            }

                                        </p>

                                    </div>

                                </div>

                            ))
                        }

                    </div>
                    :
                    <div className="mis-reservas-empty">

                        <h2>
                            No tienes reservas
                        </h2>

                        <p>
                            Aún no has realizado
                            ninguna reserva.
                        </p>

                    </div>
                }

            </div>

            <Footer />
        </>
    );
}

export default MisReservas;