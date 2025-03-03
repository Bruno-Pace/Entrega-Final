import { useState, useEffect } from "react";
import PokemonCard from "../componets/PokemonCard";
import axios from "axios";

const Favorites = () => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    
    const uniqueFavorites = [...new Set(storedFavorites)];

    const fetchFavoriteData = async () => {
      try {
        const responses = await Promise.all(
          uniqueFavorites.map(name =>
            axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
          )
        );

        setPokemonData(responses.map(res => ({
          name: res.data.name,
          url: res.data.species.url,
          image: res.data.sprites.other["official-artwork"].front_default
        })));
      } catch (error) {
        console.error("Error obteniendo los Pokémon favoritos:", error);
      }
    };

    if (uniqueFavorites.length > 0) {
      fetchFavoriteData();
    }
  }, []);

  return (
    <div>
      <h2>Pokémon Favoritos</h2>
      <div className="favorites-container">
        {pokemonData.length > 0 ? (
          pokemonData.map((pokemon, index) => (
            <PokemonCard key={index} name={pokemon.name} url={pokemon.url} image={pokemon.image} />
          ))
        ) : (
          <p>No hay Pokémon favoritos aún.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
