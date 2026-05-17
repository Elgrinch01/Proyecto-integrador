import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBarHeader = ({ hideButtons = false, showSearch = false }) => {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("user")
  );

  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {

    const refreshSession = () => {
      setIsLoggedIn(!!localStorage.getItem("user"));
    };

    refreshSession();

    window.addEventListener("storage", refreshSession);

    return () => window.removeEventListener("storage", refreshSession);

  }, []);

  useEffect(() => {

    if (busqueda.trim() === "") {
      setResultados([]);
      return;
    }

    const buscarLibros = async () => {

      try {

        const response = await fetch(
          `http://localhost:8080/libros/buscar?nombre=${busqueda}`
        );

        const data = await response.json();

        setResultados(data);

      } catch (error) {

        console.error(error);
      }
    };

    buscarLibros();

  }, [busqueda]);

  function handleSessionButton() {

    if (isLoggedIn) {

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("reserva");

      setIsLoggedIn(false);

      navigate("/login");

      return;
    }

    navigate("/login");
  }

  function handleCreateAccount() {

    setMenuOpen(false);

    navigate("/registro");
  }

  return (

    <header className="nav-bar-header">

      <div
        className="logo-header"
        onClick={() => navigate("/")}
      >
        <img
          src="/src/assets/Logo.png"
          alt="Logo"
        />
      </div>

      {showSearch && (

        <div className="nav-bar-search">

          <input
            type="text"
            placeholder="Busca tu libro favorito..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          {resultados.length > 0 && (

            <div className="search-results">

              {resultados.map((libro) => (

                <div
                  key={libro.libroId}
                  className="search-item"
                >
                  {libro.nombre}
                </div>

              ))}

            </div>

          )}

        </div>

      )}

      {!hideButtons && (

        <>

          <nav className={`nav-links ${menuOpen ? "active" : ""}`}>

            <button
              className="nav-btn nav-btn-secondary"
              onClick={() => navigate("/agregar-libro")}
            >
              Agregar Libro
            </button>

            <button
              className="nav-btn nav-btn-secondary"
              onClick={() => navigate("/reserva")}
            >
              Reservar
            </button>

            <button
              className="nav-btn nav-btn-primary"
              onClick={handleSessionButton}
            >
              {isLoggedIn ? "Cerrar Sesión" : "Iniciar Sesión"}
            </button>

          </nav>

          <div className="mobile-menu-wrapper">

            <button
              type="button"
              className="mobile-menu"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              ☰
            </button>

            <div className={`mobile-menu-dropdown ${menuOpen ? "open" : ""}`}>

              <button
                type="button"
                className="mobile-menu-dropdown-btn"
                onClick={handleCreateAccount}
              >
                Crear Cuenta
              </button>

            </div>

          </div>

        </>

      )}

    </header>
  );
};

export default NavBarHeader;