import type { State } from "./state.js"
import type { Pokemon } from "./pokeapi.js"

function getChance(pokemon: Pokemon) {
  const chance = 1 - pokemon.base_experience / 300;
  return chance;
}

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
  if (args.length != 1) {
    throw new Error("you must provide a pokemon name");
  }
  const name = args[0];

  console.log(`Throwing a Pokeball at ${name}...`);
  const pokemon = await state.pokeapi.fetchPokemon(name);
  const chance = getChance(pokemon);
  const pokeCatch = Math.random() > chance;
  if (!pokeCatch) {
    console.log(`${name} escaped!`);
    return;
  }

  console.log(`${name} was caught!`);
  state.pokedex[name] = pokemon;

}
