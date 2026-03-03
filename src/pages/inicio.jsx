import Footer from "../components/Footer.jsx";
import LogoHeader from "../components/LogoHeader.jsx";
import NavBarHeader from "../components/NavBarHeader.jsx";
import Card from "../components/Card.jsx";
import SearchBarHeader from "../components/SearchBarHeader.jsx";

function Inicio() {
    return (
         <main className="inicio">

            <div >
                <header className="header">
                    <div>
                        <LogoHeader />
                    </div>
                    <NavBarHeader />
                    <SearchBarHeader />
                </header>
                <section className="contenedor-cards">
                    <Card title="The Chronicles of Narnia" image="src\assets\11127.jpg" />
                    <Card title="Harry Potter and the Deathly Hallows" image="src\assets\58613224._SX600_.jpg" />
                    <Card title="El Señor de los Anillos" image="src\assets\OIP.webp" />
                </section>
                <Footer />
            </div>

        </main>
    )
}

export default Inicio 