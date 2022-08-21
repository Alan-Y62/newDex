import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setPokemon] = useState({});
  const [evol, setEvols] = useState({});
  const [abilityFlavor, setAbility] = useState([]);
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
    fetchPokedex();
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

    let ABIL_ARR = [];
    for (let i = 0; i < pokemons[e - 1].abilities.length; i++) {
      await axios
        .get(pokemons[e - 1].abilities[i].ability.url)
        .then((response) =>
          ABIL_ARR.push(response.data.flavor_text_entries[0].flavor_text)
        );
    }
    setAbility(ABIL_ARR);

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
      .map((entry, i) => {
        return (
          <button
            value={entry.id}
            className="entry"
            id={entry.id}
            key={i + 1}
            onClick={() => iChooseYou(`${i + 1}`)}
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
                src={`../newDex/types/${entry.types[0].type.name}.png`}
                alt=""
              ></img>
              {entry.types[0].type.name}
            </div>
            {entry.types[1]?.type.name ? (
              <div className="type__2">
                <img
                  loading="lazy"
                  src={`../newDex/types/${entry.types[1].type.name}.png`}
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
      return pokemon.abilities.map((ability, i) => {
        return (
          <div key={ability.ability.name} className="ability">
            <div className="ability_name">{ability.ability.name}</div>
            <div className="ability_flavor_text">
              {exists ? abilityFlavor[i] : <></>}
            </div>
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

  const changeHead = async (item) => {
    console.log(item);
    setPokemon(item.item);
    let ABIL_ARR = [];
    for (let i = 0; i < item.item.abilities.length; i++) {
      await axios
        .get(item.item.abilities[i].ability.url)
        .then((response) =>
          ABIL_ARR.push(response.data.flavor_text_entries[0].flavor_text)
        );
    }
    setAbility(ABIL_ARR);
  };

  const pokeStats = () => {
    const MAX_VALUES = [255, 181, 230, 180, 230, 200];
    const STAT_NAMES = ['HP', 'ATK', 'DEF', 'SP. ATK', 'SP. DEF', 'SPD'];
    if (exists) {
      return pokemon.stats.map((stat, i) => {
        return (
          <>
            <span className="stat">
              <div>{STAT_NAMES[i]}</div>
              <div className="stat__bar">
                <span
                  className="stat__value"
                  style={{
                    width: `${(stat.base_stat / MAX_VALUES[i]) * 100}` + '%',
                  }}
                ></span>
              </div>
              {stat.base_stat} / {MAX_VALUES[i]}
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
            backgroundImage: `url('./newDex/regions/${region.toLowerCase()}.png')`,
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
                      src={`../newDex/types/${pokemon.types[0].type.name}.png`}
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
                    src={`../newDex/types/${pokemon.types[1].type.name}.png`}
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
                <img
                  src={`${pokemon.sprites.front_default}`}
                  alt="srpite failed"
                ></img>
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
