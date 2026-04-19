import { useNavigate } from "react-router-dom";

const NavBarHeader = () => {
import { useNavigate } from "react-router-dom";

const NavBarHeader = () => {
  const navigate = useNavigate();

  return (
    <aside className="nav-bar-header">
      <img src="/src/assets/Logo.png" alt="Logo" />

      <nav>
        <button 
          className="nav-btn"
          onClick={() => navigate("/")}
        >
          Reservar
        </button>
      </nav>
    </aside>
  );
};

export default NavBarHeader
