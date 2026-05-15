const SearchBarHeader = () => {
  return (
    <header className="nav-bar-header">

      <div className="logo-header">
        <img
          src="/logo.png"
          alt="Logo"
        />
      </div>

      <div className="nav-bar-search">
        <input
          type="text"
          placeholder="Busca tu libro favorito..."
        />
      </div>

      <nav className="nav-actions">

        <a href="#" className="nav-link">
          Inicio
        </a>

        <a href="#" className="nav-link">
          Libros
        </a>

        <a href="#" className="nav-link">
          Categorías
        </a>

        <button className="nav-btn nav-btn-secondary">
          Login
        </button>

        <button className="nav-btn nav-btn-primary">
          Signup
        </button>

      </nav>

      <div className="mobile-menu">
        ☰
      </div>

    </header>
  )
}

export default SearchBarHeader