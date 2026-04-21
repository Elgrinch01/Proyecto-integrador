import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBarHeader = ({ hideButtons = false, showSearch = false }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("user")
  );

  useEffect(() => {
    const refreshSession = () => setIsLoggedIn(!!localStorage.getItem("user"));

    refreshSession();
    window.addEventListener("storage", refreshSession);

    return () => window.removeEventListener("storage", refreshSession);
  }, []);

  function handleSessionButton() {
    if (isLoggedIn) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/login");
      return;
    }

    navigate("/login");
  }

  return (
    <aside className="nav-bar-header">
      <img src="/src/assets/Logo.png" alt="Logo" />

      {showSearch && (
        <div className="nav-bar-search">
          <input type="text" placeholder="Busca tu libro favorito" />
        </div>
      )}

      {!hideButtons && (
        <nav>
          <button
            className="nav-btn"
            onClick={() => navigate("/reserva")}
          >
            Reservar
          </button>

          <button
            className="nav-btn"
            onClick={handleSessionButton}
          >
            {isLoggedIn ? "Cerrar Sesion" : "Iniciar Sesion"}
          </button>
        </nav>
      )}
    </aside>
  );
};

export default NavBarHeader;
