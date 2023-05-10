import "./styles.css";

const Card = ({ picture, name, location }) => {
  return (
    <ol className="cardContainer" key={name}>
      <li className="card">
        <img className="avatar" src={picture} alt={name} />
        <div className="rightBlock">
          <p className="name">{name}</p>
          <span className="country">{location}</span>
        </div>
      </li>
    </ol>
  );
}

export { Card }