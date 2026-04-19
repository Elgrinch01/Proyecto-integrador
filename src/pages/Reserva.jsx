import Footer from '../components/Footer'
import NavBarHeader from '../components/NavBarHeader'
import SearchBarHeader from '../components/SearchBarHeader'
import LogoHeader from '../components/LogoHeader'
import { useEffect, useState } from 'react'


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
            .then((response) => response.json())
            .then((data) => setLibros(data))
            .catch((error) => console.log(error))

        fetch(end_points.usuarios)
            .then((response) => response.json())
            .then((data) => setUsuarios(data))
            .catch((error) => console.log(error))
    }

    useEffect(() => { fetchBooks }, [])

    const findUsuario = () => {
        return getUsuarios.find((item) => getUsuario === item.fullName || getUsuario === item.email)
    }

    const findLibro = () => {
        return getLibros.find((item) => getLibro.toLowerCase() === item.titulo?.toLowerCase())
    }

    function enviarReserva() {
        const user = findUser()
        const libro = findLibro()

        if (!user) {
            alert("El usuario no fue encontrado...")
            return
        }

        if (!libro) {
            alert("El libro no fue encontrado...")
            return
        }

        if (!getFechaReserva || !getFechaDevolucion) {
            alert("Por favor completa las fechas de reserva..." )
            return
        }

        if (!getLugar) {
            alert("Por favor selecciona el lugar de recogida..." )
            return
        }
    }

    return (
        <main >

            <div >
                <header className="header">
                    <div>
                        <LogoHeader />
                    </div>
                    <NavBarHeader />
                    <SearchBarHeader />
                </header>
                <section >
                    <form action="">
                        <form>
                            <div class="mb-4">
                                <label for="usuario" class="block mb-2 text-sm text-gray-600">Usuario</label>
                                <input type="text" id="usuario" name="usuario"
                                     onChange={(e) => setUsuario(e.target.value)} class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    required>
                            </div>
                            <div class="mb-4">
                                <label for="libro reserva" class="block mb-2 text-sm text-gray-600">Libro a reservar</label>
                                <input type="text" id="libro reserva" name="libro reserva" onChange={(e) => setLibro(e.target.value)}
                                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    required>
                            </div>
                            <div class="mb-4">
                                <label for="date" class="block mb-2 text-sm text-gray-600">Fecha de reserva</label>
                                <input type="date" id="date" name="date" onChange={(e) => setFechaReserva(e.target.value)}
                                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    required>
                            </div>
                            <div class="mb-4">
                                <label for="date" class="block mb-2 text-sm text-gray-600">Fecha devolución</label>
                                <input type="date" id="devolución" name="devolución" onChange={(e) => setFechaDevolucion(e.target.value)}
                                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    required>
                            </div>
                            <div class="space-y-1">
                                <label for="text" class="block mb-2 text-sm text-gray-600">Lugar de Recogida</label>
                            </div>

                            <div >
                                <input onChange={(e) => setLugar(e.target.checked ? "biblioteca" : "")} type="checkbox" value="" name="biblioteca" 
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="bordered-checkbox-1"
                                        class=" rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">Retiro en biblioteca</label>
                            </div>
                            <div >
                                <input type="checkbox" value="" name="domicilio" onChange={(e) => setLugar(e.target.checked ? "domicilio" : "")}
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="bordered-checkbox-2"
                                        class=" rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">A domicilio</label>


                            </div>


                            <div class="space-y-1 pt-4">
                                <label for="direccion de recogida"
                                    class="block mb-2 text-sm text-gray-600">Dirección de
                                    domicilio </label>
                                <input onChange={(e) => setDireccion(e.target.value)} id="direccion-recogida" type="text" placeholder=" Calle 13 #30-45"
                                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                            </div>





                            <div class="pt-6 mt-4 flex justify-center">
                                <button type="button"
                                onClick={() => enviarReserva()} class="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Enviar</button>
                            </div>

                        </form>

                </section>
                <Footer />
            </div>

        </main>
    )
}

export default Reserva

