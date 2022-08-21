// function Modal({ pokemon, evol }) {
//   return (
//     <dialog>
//       <button
//         className="modal__close_btn"
//         onClick={() => setModalVisibility(!showModal)}
//       >
//         X
//       </button>
//       <div className="modal__contents">
//         <div className="modal__poke_name">
//           {pokemon ? pokemon.name : ''}
//           <div className="modal__poke_types">
//             <div className="type__1">
//               {pokemon.types ? (
//                 <>
//                   <img
//                     src={`../types/${pokemon.types[0].type.name}.png`}
//                     alt=""
//                   ></img>
//                   {pokemon.types[0].type.name}
//                 </>
//               ) : (
//                 <></>
//               )}
//             </div>
//             {pokemon.types?.length > 1 ? (
//               <div className="type__2">
//                 <img
//                   loading="lazy"
//                   src={`../types/${pokemon.types[1].type.name}.png`}
//                   alt=""
//                 ></img>
//                 {pokemon.types[1].type.name}
//               </div>
//             ) : (
//               <></>
//             )}
//           </div>
//         </div>
//         <div className="modal__poke_info">
//           <div className="modal__poke_sprite">
//             {pokemon.sprites ? (
//               <img src={`${pokemon.sprites.front_default}`}></img>
//             ) : (
//               <></>
//             )}
//           </div>
//           <div className="modal__poke_stats">
//             {pokemon.stats ? (
//               <>
//                 <span className="stat">
//                   HP:
//                   <div className="stat__bar">
//                     <span
//                       className="stat__value"
//                       style={{
//                         width:
//                           `${(pokemon.stats[0].base_stat / 255) * 100}` + '%',
//                       }}
//                     ></span>
//                   </div>
//                   {pokemon.stats[0].base_stat}
//                 </span>
//                 <span className="stat">
//                   ATK:
//                   <div className="stat__bar">
//                     <span
//                       className="stat__value"
//                       style={{
//                         width:
//                           `${(pokemon.stats[1].base_stat / 255) * 100}` + '%',
//                       }}
//                     ></span>
//                   </div>
//                   {pokemon.stats[1].base_stat}
//                 </span>
//                 <span className="stat">
//                   DEF:
//                   <div className="stat__bar">
//                     <span
//                       className="stat__value"
//                       style={{
//                         width:
//                           `${(pokemon.stats[2].base_stat / 255) * 100}` + '%',
//                       }}
//                     ></span>
//                   </div>
//                   {pokemon.stats[2].base_stat}
//                 </span>
//                 <span className="stat">
//                   SP. ATK:
//                   <div className="stat__bar">
//                     <span
//                       className="stat__value"
//                       style={{
//                         width:
//                           `${(pokemon.stats[3].base_stat / 255) * 100}` + '%',
//                       }}
//                     ></span>
//                   </div>
//                   {pokemon.stats[3].base_stat}
//                 </span>
//                 <span className="stat">
//                   SP. DEF
//                   <div className="stat__bar">
//                     <span
//                       className="stat__value"
//                       style={{
//                         width:
//                           `${(pokemon.stats[4].base_stat / 255) * 100}` + '%',
//                       }}
//                     ></span>
//                   </div>
//                   {pokemon.stats[4].base_stat}
//                 </span>
//                 <span className="stat">
//                   SPEED
//                   <div className="stat__bar">
//                     <span
//                       className="stat__value"
//                       style={{
//                         width:
//                           `${(pokemon.stats[5].base_stat / 255) * 100}` + '%',
//                       }}
//                     ></span>
//                   </div>
//                   {pokemon.stats[5].base_stat}
//                 </span>
//               </>
//             ) : (
//               <></>
//             )}
//           </div>
//           <div className="modal__poke_abilities">
//             {pokemon.abilities ? (
//               <div className="ability">{pokemon.abilities[0].ability.name}</div>
//             ) : (
//               <></>
//             )}
//           </div>
//           <div className="modal__poke_evolutions">
//             {evol.chain ? (
//               <>
//                 <div>
//                   <img
//                     src={`${
//                       pokemons[
//                         Number(
//                           evol.chain.species.url.slice(42).replace('/', '')
//                         ) - 1
//                       ].sprites.front_default
//                     }`}
//                     alt="sprite"
//                   ></img>
//                 </div>
//                 <>&rarr;</>
//                 {evol.chain.evolves_to ? (
//                   <div>
//                     <img
//                       src={`${
//                         pokemons[
//                           Number(
//                             evol.chain.evolves_to[0].species.url
//                               .slice(42)
//                               .replace('/', '')
//                           ) - 1
//                         ].sprites.front_default
//                       }`}
//                       alt="sprite"
//                     ></img>
//                   </div>
//                 ) : (
//                   <></>
//                 )}
//                 <>&rarr;</>
//                 {evol.chain.evolves_to[0].evolves_to ? (
//                   <div>
//                     <img
//                       src={`${
//                         pokemons[
//                           Number(
//                             evol.chain.evolves_to[0].evolves_to[0].species.url
//                               .slice(42)
//                               .replace('/', '')
//                           ) - 1
//                         ].sprites.front_default
//                       }`}
//                       alt="sprite"
//                     ></img>
//                   </div>
//                 ) : (
//                   <></>
//                 )}
//               </>
//             ) : (
//               <></>
//             )}
//           </div>
//         </div>
//       </div>
//     </dialog>
//   );
// }

// export default Modal;
