import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const PokemonCard = ({ name, url, image }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(name));
  }, [name]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.includes(name)) {
      favorites = favorites.filter(fav => fav !== name);
    } else {
      
      favorites = [...new Set([...favorites, name])];
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="pokemon-card">
      <img
        src={image}
        alt={name}
        onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=Imagen+no+disponible"; }}
      />
      <h3>{name}</h3>
      <button onClick={toggleFavorite}>
        {isFavorite ? "❤️ Quitar" : "🤍 Agregar"}
      </button>
      <Link to={`/pokemon/${name}`}>Ver detalles</Link>
    </div>
  );
};

export default PokemonCard;
