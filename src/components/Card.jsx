function Card({ title, image }) {
  return (
    <article className="card">
      <section>
        <h3>{title}</h3>
      </section>
      <div className="card-image">
        <img src={image} alt="Sin imagen" />
      </div>
    </article>
  )
}

export default Card