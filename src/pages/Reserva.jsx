import Footer from '../components/Footer'
import NavBarHeader from '../components/NavBarHeader'
//import SearchBarHeader from '../components/SearchBarHeader'
import LogoHeader from '../components/LogoHeader'
import { useEffect, useState } from 'react'
import { saveLocalStorage, getLocalStorage } from "../helpers/local-storage"
import { redirect } from "../helpers/alerts"

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

      useEffect(() => {
    const storedUser = getLocalStorage("user")
    const storedToken = getLocalStorage("token")

    if (!storedUser || !storedToken || storedUser.token !== storedToken) {
      redirect("Debes iniciar sesión para hacer una reserva", "/login", "error")
      return
    }

    setUsuario(storedUser.name || storedUser.email)
    fetchBooks()
  }, [])

    const findUsuario = () =>
        getUsuarios.find((item) => getUsuario === item.name || getUsuario === item.email)

    const findLibro = () =>
        getLibros.find((item) => getLibro.toLowerCase() === item.title?.toLowerCase())

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
        redirect("Reserva realizada con éxito para " + user.fullName, "/index", "success")
    }

    return (
        <main className="min-h-screen flex flex-col bg-white bg-[radial-gradient(circle_at_top,_#f8fafc_0%,_#ffffff_45%,_#f3f4f6_100%)]">
            <div className="flex-1 flex flex-col">
                <header className="header">
                    <div><LogoHeader /></div>
                    <NavBarHeader />
                </header>

                <section className="flex-1 flex items-center justify-center px-4 py-10">
                    <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white/90 px-6 py-8 shadow-sm backdrop-blur-sm md:px-8">
                        <h2 className="text-center text-4xl font-bold text-gray-900 mb-10">
                            Reservar un libro
                        </h2>

                        <div className="space-y-1.5 mb-4">
                            <label className="block text-[14px] font-semibold text-[#0f1111]">Usuario</label>
                            <input
                                type="text"
                                placeholder="Nombre o correo"
                                onChange={(e) => setUsuario(e.target.value)}
                                className="w-full h-11 rounded-md border border-[#a6a6a6] bg-white px-3 text-[15px] text-[#0f1111] placeholder:text-gray-400 shadow-[inset_0_1px_2px_rgba(15,17,17,0.08)] transition focus:outline-none focus:border-[#e77600] focus:ring-3 focus:ring-[#fbd8b4]"
                            />
                        </div>

                        <div className="space-y-1.5 mb-4">
                            <label className="block text-[14px] font-semibold text-[#0f1111]">Libro a reservar</label>
                            <input
                                type="text"
                                placeholder="Titulo del libro"
                                onChange={(e) => setLibro(e.target.value)}
                                className="w-full h-11 rounded-md border border-[#a6a6a6] bg-white px-3 text-[15px] text-[#0f1111] placeholder:text-gray-400 shadow-[inset_0_1px_2px_rgba(15,17,17,0.08)] transition focus:outline-none focus:border-[#e77600] focus:ring-3 focus:ring-[#fbd8b4]"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-1.5">
                                <label className="block text-[14px] font-semibold text-[#0f1111]">Fecha de reserva</label>
                                <input
                                    type="date"
                                    onChange={(e) => setFechaReserva(e.target.value)}
                                    className="w-full h-11 rounded-md border border-[#a6a6a6] bg-white px-3 text-[15px] text-[#0f1111] shadow-[inset_0_1px_2px_rgba(15,17,17,0.08)] transition focus:outline-none focus:border-[#e77600] focus:ring-3 focus:ring-[#fbd8b4]"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[14px] font-semibold text-[#0f1111]">Fecha de devolucion</label>
                                <input
                                    type="date"
                                    onChange={(e) => setFechaDevolucion(e.target.value)}
                                    className="w-full h-11 rounded-md border border-[#a6a6a6] bg-white px-3 text-[15px] text-[#0f1111] shadow-[inset_0_1px_2px_rgba(15,17,17,0.08)] transition focus:outline-none focus:border-[#e77600] focus:ring-3 focus:ring-[#fbd8b4]"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 mb-4">
                            <p className="text-[14px] font-semibold text-[#0f1111]">Lugar de recogida</p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                                <label className="inline-flex items-center gap-2 text-[14px] text-gray-700 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="lugar"
                                        value="biblioteca"
                                        onChange={() => setLugar("biblioteca")}
                                        className="h-4 w-4 accent-amber-500"
                                    />
                                    Retiro en biblioteca
                                </label>
                                <label className="inline-flex items-center gap-2 text-[14px] text-gray-700 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="lugar"
                                        value="domicilio"
                                        onChange={() => setLugar("domicilio")}
                                        className="h-4 w-4 accent-amber-500"
                                    />
                                    A domicilio
                                </label>
                            </div>
                        </div>

                        {getLugar === "domicilio" && (
                            <div className="space-y-1.5 mb-4">
                                <label className="block text-[14px] font-semibold text-[#0f1111]">Direccion de domicilio</label>
                                <input
                                    type="text"
                                    placeholder="Calle 13 #30-45"
                                    onChange={(e) => setDireccion(e.target.value)}
                                    className="w-full h-11 rounded-md border border-[#a6a6a6] bg-white px-3 text-[15px] text-[#0f1111] placeholder:text-gray-400 shadow-[inset_0_1px_2px_rgba(15,17,17,0.08)] transition focus:outline-none focus:border-[#e77600] focus:ring-3 focus:ring-[#fbd8b4]"
                                />
                            </div>
                        )}

                        <div className="mt-10 flex justify-center">
                            <button
                                type="button"
                                onClick={enviarReserva}
                                className="w-full md:w-auto md:min-w-[300px] py-5 px-8 text-2xl rounded-2xl border border-[#f0c14b] bg-gradient-to-b from-[#ffe082] to-[#ffcc4d] text-[#111827] font-bold shadow-md shadow-amber-200/70 transition-all duration-300 hover:-translate-y-0.5 hover:from-[#ffd760] hover:to-[#f6be2d] hover:shadow-lg hover:shadow-amber-300/70 focus:outline-none focus:ring-4 focus:ring-amber-200 active:translate-y-0"
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