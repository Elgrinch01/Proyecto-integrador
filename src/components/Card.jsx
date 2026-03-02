import Logo from '../assets/logo.png';
function Card() {
    return (
        <article className="card">
            <section> <h3>Titulo</h3> </section>
            <div className="card-image">
                <img src={Logo} alt="Sin imagen" />
            </div>
        </article>
    )
}

export default Card;

//Imagen del logo es un ejemplo, se puede cambiar por cualquier imagen que se quiera mostrar en la tarjeta.

