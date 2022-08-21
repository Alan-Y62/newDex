import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

{
  /* <div className="modal__poke_evolutions">
  {evol.chain ? (
    <>
      <div>
        <img
          src={`${
            pokemons[
              Number(evol.chain.species.url.slice(42).replace('/', '')) - 1
            ].sprites.front_default
          }`}
          alt="sprite"
        ></img>
      </div>
      <>&rarr;</>
      {evol.chain.evolves_to ? (
        <div>
          <img
            src={`${
              pokemons[
                Number(
                  evol.chain.evolves_to[0].species.url
                    .slice(42)
                    .replace('/', '')
                ) - 1
              ].sprites.front_default
            }`}
            alt="sprite"
          ></img>
        </div>
      ) : (
        <></>
      )}
      <>&rarr;</>
      {evol.chain.evolves_to[0].evolves_to ? (
        <div>
          <img
            src={`${
              pokemons[
                Number(
                  evol.chain.evolves_to[0].evolves_to[0].species.url
                    .slice(42)
                    .replace('/', '')
                ) - 1
              ].sprites.front_default
            }`}
            alt="sprite"
          ></img>
        </div>
      ) : (
        <></>
      )}
    </>
  ) : (
    <></>
  )}
</div>; */
}

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setPokemon] = useState({});
  const [evol, setEvols] = useState({});
  const [exists, setExists] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [region, setRegion] = useState('KANTO');
  const [showModal, setModalVisibility] = useState(false);
  const regionRanges = {
    KANTO: {
      low: 1,
      high: 151,
    },
    JOHTO: {
      low: 152,
      high: 251,
    },
    HOENN: {
      low: 252,
      high: 386,
    },
    SINNOH: {
      low: 387,
      high: 493,
    },
    UNOVA: {
      low: 494,
      high: 649,
    },
    KALOS: {
      low: 650,
      high: 721,
    },
    ALOLA: {
      low: 722,
      high: 809,
    },
    GALAR: {
      low: 809,
      high: 898,
    },
  };

  //Event Handlers
  const changeRegions = async (e) => {
    setLoading(true);
    setRegion(e.target.value);
  };

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const iChooseYou = async (e) => {
    let evol_link = '';
    setPokemon(pokemons[e - 1]);
    let evol_line = [];
    let evol_Data = [];

    await axios
      .get(pokemons[e - 1].species.url)
      .then((response) => response.data)
      .then((data) => (evol_link = data.evolution_chain.url));

    await axios
      .get(evol_link)
      .then((response) => response.data)
      .then((data) => {
        let evolData = data.chain;
        while (
          evolData !== undefined &&
          evolData.hasOwnProperty('evolves_to')
        ) {
          evol_line.push(evolData.species.name);
          if (evolData.evolves_to.length > 1) {
            for (let i = 0; i < evolData.evolves_to.length; i++) {
              evol_line.push(evolData.evolves_to[i].species.name);
            }
          }
          evolData = evolData['evolves_to'][0];
        }
        evol_line = evol_line.filter((e, i) => {
          return evol_line.indexOf(e) === i;
        });
      });
    for (let i = 0; i < evol_line.length; i++) {
      await axios
        .get('https://pokeapi.co/api/v2/pokemon/' + evol_line[i])
        .then((response) => evol_Data.push(response.data));
    }

    setEvols(evol_Data);
    setModalVisibility(!showModal);
    setExists(true);
  };

  window.onscroll = () => {
    let bg = document.querySelector('.bg__image');
    bg.style.transform =
      'rotate(' + window.scrollY / (7.5 * (1900 / window.innerWidth)) + 'deg)';
  };

  //JSX fragments

  const regionOptions = () => {
    return Object.keys(regionRanges).map((region) => {
      return (
        <option key={region} value={region}>
          {region}
        </option>
      );
    });
  };

  const pokedexMap = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return pokemons
      .filter((entryFilter) => entryFilter.name.includes(query.toLowerCase()))
      .map((entry) => {
        return (
          <button
            value={entry.id}
            className="entry"
            id={entry.id}
            key={entry.id}
            onClick={() => iChooseYou(`${entry.id}`)}
          >
            <img
              loading="lazy"
              src={entry.sprites.front_default}
              alt={entry.name}
            ></img>
            <p className="pokemon__name">{entry.name.toUpperCase()}</p>
            <div className="type__1">
              <img
                loading="lazy"
                src={`../types/${entry.types[0].type.name}.png`}
                alt=""
              ></img>
              {entry.types[0].type.name}
            </div>
            {entry.types[1]?.type.name ? (
              <div className="type__2">
                <img
                  loading="lazy"
                  src={`../types/${entry.types[1].type.name}.png`}
                  alt=""
                ></img>
                {entry.types[1].type.name}
              </div>
            ) : (
              <></>
            )}
          </button>
        );
      });
  };

  const getAbilities = () => {
    if (pokemon.abilities) {
      return pokemon.abilities.map((ability) => {
        return (
          <div key={ability.ability.name} className="ability">
            {ability.ability.name}
          </div>
        );
      });
    }
  };

  //API DATA FETCH
  const fetchPokedex = async () => {
    let results = [];
    for (
      let i = regionRanges[region].low;
      i <= regionRanges[region].high;
      i++
    ) {
      await axios
        .get('https://pokeapi.co/api/v2/pokemon/' + i)
        .then((response) => results.push(response.data))
        .catch((err) => {
          console.log(err);
        });
    }
    setPokemons(results);
    setLoading(false);
  };

  useEffect(() => {
    fetchPokedex();
  }, [region]);

  const changeHead = (item) => {
    console.log(item);
    setPokemon(item.item);
  };

  const pokeStats = () => {
    const MAX_VALUES = [255, 190, 230, 194, 230, 180];
    if (exists) {
      return pokemon.stats.map((stat, i) => {
        return (
          <>
            <span className="stat">
              <div>{stat.stat.name}</div>
              <div className="stat__bar">
                <span
                  className="stat__value"
                  style={{
                    width: `${(stat.base_stat / MAX_VALUES[i]) * 100}` + '%',
                  }}
                ></span>
              </div>
              {stat.base_stat}
            </span>
          </>
        );
      });
    }
  };

  const getEvolutions = () => {
    if (exists) {
      return evol.map((item, i) => {
        return i > 0 ? (
          <button
            value={item.id}
            className="mini_sprite"
            id={item.id}
            key={item.id}
            onClick={() => changeHead({ item })}
          >
            <img
              loading="lazy"
              src={item.sprites.front_default}
              alt={item.name}
            ></img>
          </button>
        ) : (
          <button
            value={item.id}
            className="mini_sprite base"
            id={item.id}
            key={item.id}
            onClick={() => changeHead({ item })}
          >
            <img
              loading="lazy"
              src={item.sprites.front_default}
              alt={item.name}
            ></img>
          </button>
        );
      });
    }
  };

  return (
    <>
      <div className="bg__image"></div>
      <div className="region__select">
        <select
          style={{
            backgroundImage: `url('./regions/${region.toLowerCase()}.png')`,
          }}
          onChange={changeRegions}
          className="dropdown__content"
        >
          {regionOptions()}
        </select>
        <input
          type="text"
          onChange={handleInput}
          placeholder="Enter Pokémon Name"
        ></input>
      </div>
      <div className="pokedex__entries">{pokedexMap()}</div>
      <dialog className={`${showModal ? 'active' : 'inactive'}`}>
        <div className="modal__contents">
          <div className="modal__poke_name">
            {pokemon ? pokemon.name : ''}
            <div className="modal__poke_types">
              <div className="type__1">
                {pokemon.types ? (
                  <>
                    <img
                      src={`../types/${pokemon.types[0].type.name}.png`}
                      alt=""
                    ></img>
                    {pokemon.types[0].type.name}
                  </>
                ) : (
                  <></>
                )}
              </div>
              {pokemon.types?.length > 1 ? (
                <div className="type__2">
                  <img
                    loading="lazy"
                    src={`../types/${pokemon.types[1].type.name}.png`}
                    alt=""
                  ></img>
                  {pokemon.types[1].type.name}
                </div>
              ) : (
                <></>
              )}
              <button
                className="modal__close_btn"
                onClick={() => setModalVisibility(!showModal)}
              >
                X
              </button>
            </div>
          </div>
          <div className="modal__poke_info">
            <div className="modal__poke_sprite">
              {pokemon.sprites ? (
                <img src={`${pokemon.sprites.front_default}`}></img>
              ) : (
                <></>
              )}
            </div>
            <div className="modal__poke_stats">{pokeStats()}</div>
            <div className="modal__poke_abilities">{getAbilities()}</div>
            <div className="modal__poke_evol">{getEvolutions()}</div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default App;
