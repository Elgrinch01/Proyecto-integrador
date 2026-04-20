import { useNavigate } from "react-router-dom";

const NavBarHeader = ({ hideButtons = false, showSearch = false }) => {
  const navigate = useNavigate();

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
            onClick={() => navigate("/login")}
          >
            Iniciar Sesion
          </button>
        </nav>
      )}
    </aside>
  );
};

export default NavBarHeader;
