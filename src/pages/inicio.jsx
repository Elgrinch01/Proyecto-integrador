import Footer from "../components/Footer.jsx";
import LogoHeader from "../components/LogoHeader.jsx";
import NavBarHeader from "../components/NavBarHeader.jsx";
import Card from "../components/Card.jsx";
import SearchBarHeader from "../components/SearchBarHeader.jsx";

function Inicio() {
    return (
        <main className="inicio"> 
        <div>
            <LogoHeader />
            <NavBarHeader />
            <SearchBarHeader />
            <section>
                <Card />
                <Card />
                <Card />
            </section>
            <Footer />
        </div>
        </main>
    )
}

export default Inicio 