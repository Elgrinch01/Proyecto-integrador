import Footer from '../components/Footer'
import NavBarHeader from '../components/NavBarHeader'
//import SearchBarHeader from '../components/SearchBarHeader'
import LogoHeader from '../components/LogoHeader'
import { useEffect, useState } from 'react'

const end_points = {
    libros: "https://jsonplaceholder.typicode.com/posts",
    usuarios: "https://jsonplaceholder.typicode.com/users",
}

function Reserva() {
    const [getUsuario, setUsuario] = useState("")
    const [getLibro, setLibro] = useState("")
    const [getFechaReserva, setFechaReserva] = useState("")
    const [getFechaDevolucion, setFechaDevolucion] = useState("")
    const [getLugar, setLugar] = useState("")
    const [getDireccion, setDireccion] = useState("")
    const [getLibros, setLibros] = useState([])
    const [getUsuarios, setUsuarios] = useState([])

    function fetchBooks() {
        fetch(end_points.libros)
            .then((r) => r.json()).then((d) => setLibros(d))
            .catch((e) => console.log(e))
        fetch(end_points.usuarios)
            .then((r) => r.json()).then((d) => setUsuarios(d))
            .catch((e) => console.log(e))
    }

    useEffect(() => { fetchBooks() }, [])

    const findUsuario = () =>
        getUsuarios.find((item) => getUsuario === item.fullName || getUsuario === item.email)

    const findLibro = () =>
        getLibros.find((item) => getLibro.toLowerCase() === item.titulo?.toLowerCase())

    function enviarReserva() {
        const user = findUsuario()
        const libro = findLibro()

        if (!user) { redirect("El usuario no fue encontrado...", "/reserva", "error"); return }
        if (!libro) { redirect("El libro no fue encontrado...", "/reserva", "error"); return }
        if (!getFechaReserva || !getFechaDevolucion) { redirect("Por favor completa las fechas de reserva...", "/reserva", "error"); return }
        if (!getLugar) { redirect("Por favor selecciona el lugar de recogida...", "/reserva", "error"); return }

        const reserva = {
            usuario: user,
            libro: libro,
            fechaReserva: getFechaReserva,
            fechaDevolucion: getFechaDevolucion,
            lugar: getLugar,
            direccion: getLugar === "domicilio" ? getDireccion : null,
        }

        saveLocalStorage("reserva", reserva)
        redirect("Reserva realizada con éxito para " + user.fullName, "/Index", "success")
    }

    const inputStyle = {
        width: "100%",
        padding: "9px 14px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        fontSize: "14px",
        boxSizing: "border-box",
        outline: "none",
        fontFamily: "inherit",
        color: "#333",
        backgroundColor: "white",
    }

    const labelStyle = {
        display: "block",
        marginBottom: "6px",
        fontSize: "13px",
        color: "#555",
        fontWeight: "500",
    }

    const fieldStyle = {
        marginBottom: "16px",
    }

    return (
        <main className="inicio">
            <div>
                <header className="header">
                    <div><LogoHeader /></div>
                    <NavBarHeader />
                    
                </header>

                <section style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "60px 20px",
                    minHeight: "60vh",
                    backgroundColor: "#f3f3f3",
                }}>
                    <div style={{
                        backgroundColor: "white",
                        borderRadius: "16px",
                        padding: "40px",
                        width: "100%",
                        maxWidth: "500px",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    }}>
                        <h2 style={{ textAlign: "center", marginBottom: "28px", fontWeight: "600", fontSize: "22px", color: "#333", marginTop: 0 }}>
                            Reservar un libro
                        </h2>

                        <div style={fieldStyle}>
                            <label style={labelStyle}>Usuario</label>
                            <input type="text" placeholder="Nombre o correo" onChange={(e) => setUsuario(e.target.value)} style={inputStyle} />
                        </div>

                        <div style={fieldStyle}>
                            <label style={labelStyle}>Libro a reservar</label>
                            <input type="text" placeholder="Título del libro" onChange={(e) => setLibro(e.target.value)} style={inputStyle} />
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                            <div>
                                <label style={labelStyle}>Fecha de reserva</label>
                                <input type="date" onChange={(e) => setFechaReserva(e.target.value)} style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Fecha de devolución</label>
                                <input type="date" onChange={(e) => setFechaDevolucion(e.target.value)} style={inputStyle} />
                            </div>
                        </div>

                        <div style={fieldStyle}>
                            <p style={{ ...labelStyle, marginBottom: "10px" }}>Lugar de recogida</p>
                            <div style={{ display: "flex", gap: "24px" }}>
                                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#444", cursor: "pointer" }}>
                                    <input type="radio" name="lugar" value="biblioteca" onChange={() => setLugar("biblioteca")} />
                                    Retiro en biblioteca
                                </label>
                                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#444", cursor: "pointer" }}>
                                    <input type="radio" name="lugar" value="domicilio" onChange={() => setLugar("domicilio")} />
                                    A domicilio
                                </label>
                            </div>
                        </div>

                        {getLugar === "domicilio" && (
                            <div style={fieldStyle}>
                                <label style={labelStyle}>Dirección de domicilio</label>
                                <input type="text" placeholder="Calle 13 #30-45" onChange={(e) => setDireccion(e.target.value)} style={inputStyle} />
                            </div>
                        )}

                        <div style={{ marginTop: "28px", display: "flex", justifyContent: "center" }}>
                            <button
                                type="button"
                                onClick={enviarReserva}
                                style={{
                                    backgroundColor: "#FBBF24",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "999px",
                                    padding: "10px 32px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    cursor: "pointer",
                                }}
                            >
                                Enviar reserva
                            </button>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </main>
    )
}

export default Reserva