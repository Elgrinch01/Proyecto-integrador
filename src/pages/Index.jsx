import Footer from "../components/Footer.jsx";
import LogoHeader from "../components/LogoHeader.jsx";
import NavBarHeader from "../components/NavBarHeader.jsx";
import Card from "../components/Card.jsx";
import "../App.css";

function Index() {
    return (
        <main className="inicio page-inicio">

            <header className="header">
                <LogoHeader />
                <NavBarHeader showSearch />
            </header>

            <div className="inicio-content">

                <section className="hero-section">

                    <div className="hero-content">


                        <h1 >
                            Descubre historias que
                            transforman 
                            tu imaginación
                        </h1>
                        

                        <p>
                            Explora miles de libros, encuentra tus favoritos
                            y disfruta una experiencia moderna y elegante.
                        </p>

                        <div className="hero-buttons">

                            <button className="hero-btn-primary">
                                Explorar Libros
                            </button>

                            <button className="hero-btn-secondary">
                                Categorías
                            </button>

                        </div>

                    </div>

                    <div className="hero-glow"></div>

                </section>

                <section className="section-title">

                    <h2>Libros Destacados</h2>

                    <p>
                        Algunos de los títulos más populares de nuestra colección
                    </p>

                </section>

                <section className="contenedor-cards">

                    <Card
                        title="The Chronicles of Narnia"
                        image="src/assets/11127.jpg"
                    />

                    <Card
                        title="Harry Potter and the Deathly Hallows"
                        image="src/assets/58613224._SX600_.jpg"
                    />

                    <Card
                        title="El Señor de los Anillos"
                        image="src/assets/OIP.webp"
                    />

                </section>

                <section className="info-section">

                    <div className="info-card">
                        <h3>Explora</h3>
                        <p>
                            Encuentra nuevas historias y autores destacados.
                        </p>
                    </div>

                    <div className="info-card">
                        <h3>Descubre</h3>
                        <p>
                            Accede a libros populares y recomendaciones.
                        </p>
                    </div>

                    <div className="info-card">
                        <h3>Lee</h3>
                        <p>
                            Disfruta una experiencia rápida y moderna.
                        </p>
                    </div>

                </section>

            </div>

            <Footer />

        </main>
    );
}

export default Index;