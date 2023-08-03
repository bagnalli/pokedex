import { Container, Row } from "react-bootstrap";
import { PokemonCard } from "./PokemonCard";

export const Pokemon = () => {
  const pokemon = [
    {
      name: "Bulbasaur",
      type1: "Grass",
      type2: "Poison",
      description: "A cute and powerful Grass/Poison type Pokemon.",
      imgUrl: "https://img.pokemondb.net/artwork/avif/bulbasaur.avif",
    },
    {
      name: "Ivysaur",
      type1: "Grass",
      type2: "Poison",
      description: "A strong and evolved Grass/Poison type Pokemon.",
      imgUrl: "https://img.pokemondb.net/artwork/avif/ivysaur.avif",
    },
    {
      name: "Venusaur",
      type1: "Grass",
      type2: "Poison",
      description: "A majestic and fully evolved Grass/Poison type Pokemon.",
      imgUrl: "https://img.pokemondb.net/artwork/avif/venusaur.avif",
    },
    {
      name: "Charmander",
      type1: "Fire",
      type2: null,
      description: "A fiery and determined Fire type Pokemon.",
      imgUrl: "https://img.pokemondb.net/artwork/avif/charmander.avif",
    },
    {
      name: "Charmeleon",
      type1: "Fire",
      type2: null,
      description: "A powerful and evolved Fire type Pokemon.",
      imgUrl: "https://img.pokemondb.net/artwork/avif/charmeleon.avif",
    },
    {
      name: "Charizard",
      type1: "Fire",
      type2: "Flying",
      description: "A fierce and fully evolved Fire/Flying type Pokemon.",
      imgUrl: "https://img.pokemondb.net/artwork/avif/charizard.avif",
    },
    {
      name: "Squirtle",
      type1: "Water",
      type2: null,
      description: "A cool and water-based Water type Pokemon.",
      imgUrl: "https://img.pokemondb.net/artwork/avif/squirtle.avif",
    },
    {
      name: "Wartortle",
      type1: "Water",
      type2: null,
      description: "An evolved and powerful Water type Pokemon.",
      imgUrl: "https://img.pokemondb.net/artwork/avif/wartortle.avif",
    },
    {
      name: "Blastoise",
      type1: "Water",
      type2: null,
      description: "A fully evolved and fearsome Water type Pokemon.",
      imgUrl: "https://img.pokemondb.net/artwork/avif/blastoise.avif",
    },
  ];

  return (
    <section className="project" id="project">
      <Container>
        <Row>
          {pokemon.map((pokeData, index) => (
            <PokemonCard
              key={index}
              name={pokeData.name}
              type1={pokeData.type1}
              type2={pokeData.type2}
              description={pokeData.description}
              imgUrl={pokeData.imgUrl}
            />
          ))}
        </Row>
      </Container>
    </section>
  );
};
