import Footer from '../components/Footer'
import NavBarHeader from '../components/NavBarHeader'
import SearchBarHeader from '../components/SearchBarHeader'
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

    return (
        <main className="inicio">
            <div>
                <header className="header">
                    <div><LogoHeader /></div>
                    <NavBarHeader />
                    <SearchBarHeader />
                </header>

                <section className="flex justify-center px-4 py-10">
                    <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                            Reservar un libro
                        </h2>

                        <div className="space-y-5">
                            {/* Usuario */}
                            <div>
                                <label htmlFor="usuario" className="block mb-1 text-sm font-medium text-gray-600">
                                    Usuario
                                </label>
                                <input
                                    type="text"
                                    id="usuario"
                                    placeholder="Nombre o correo"
                                    onChange={(e) => setUsuario(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                />
                            </div>

                            {/* Libro */}
                            <div>
                                <label htmlFor="libro-reserva" className="block mb-1 text-sm font-medium text-gray-600">
                                    Libro a reservar
                                </label>
                                <input
                                    type="text"
                                    id="libro-reserva"
                                    placeholder="Título del libro"
                                    onChange={(e) => setLibro(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                />
                            </div>

                            {/* Fechas */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="fecha-reserva" className="block mb-1 text-sm font-medium text-gray-600">
                                        Fecha de reserva
                                    </label>
                                    <input
                                        type="date"
                                        id="fecha-reserva"
                                        onChange={(e) => setFechaReserva(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="devolucion" className="block mb-1 text-sm font-medium text-gray-600">
                                        Fecha de devolución
                                    </label>
                                    <input
                                        type="date"
                                        id="devolucion"
                                        onChange={(e) => setFechaDevolucion(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                    />
                                </div>
                            </div>

                            {/* Lugar de recogida */}
                            <div>
                                <p className="block mb-2 text-sm font-medium text-gray-600">
                                    Lugar de recogida
                                </p>
                                <div className="flex gap-6">
                                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="lugar"
                                            value="biblioteca"
                                            onChange={() => setLugar("biblioteca")}
                                            className="accent-cyan-500"
                                        />
                                        Retiro en biblioteca
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="lugar"
                                            value="domicilio"
                                            onChange={() => setLugar("domicilio")}
                                            className="accent-cyan-500"
                                        />
                                        A domicilio
                                    </label>
                                </div>
                            </div>

                            {/* Dirección (solo si domicilio) */}
                            {getLugar === "domicilio" && (
                                <div>
                                    <label htmlFor="direccion-recogida" className="block mb-1 text-sm font-medium text-gray-600">
                                        Dirección de domicilio
                                    </label>
                                    <input
                                        id="direccion-recogida"
                                        type="text"
                                        placeholder="Calle 13 #30-45"
                                        onChange={(e) => setDireccion(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Botón */}
                        <div className="mt-8 flex justify-center">
                            <button
                                type="button"
                                onClick={enviarReserva}
                                className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium text-sm px-8 py-2.5 rounded-full focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-colors"
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
