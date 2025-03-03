import { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../componets/PokemonCard";
import SearchBar from "../componets/SearchBar";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`
        );

        const pokemonDetails = await Promise.all(
          response.data.results.map((pokemon) => axios.get(pokemon.url))
        );

        const newPokemons = pokemonDetails.map((res) => ({
          name: res.data.name,
          url: res.data.species.url,
          image: res.data.sprites.other["official-artwork"].front_default,
        }));

        setPokemons((prevPokemons) => {
          const uniquePokemons = new Map();
          [...prevPokemons, ...newPokemons].forEach((pokemon) => {
            uniquePokemons.set(pokemon.name, pokemon);
          });
          return Array.from(uniquePokemons.values());
        });
      } catch (error) {
        console.error("Error obteniendo Pokémon", error);
      }
    };

    fetchPokemonData();
  }, [page]);

  
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <SearchBar setSearch={setSearch} />
      <div className="pokemon-container">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon, index) => (
            <PokemonCard key={index} name={pokemon.name} url={pokemon.url} image={pokemon.image} />
          ))
        ) : (
          <p className="no-results">No se encontraron resultados</p>
        )}
      </div>
      <button className="load-more" onClick={() => setPage(page + 1)}>Cargar más</button>
    </div>
  );
};

export default Home;
