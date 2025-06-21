import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
  if (args.length != 1) {
    throw new Error("you must provide a location name");
  }
  const name = args[0]
  const location = await state.pokeapi.fetchLocation(name);

  console.log(`Exploring ${name}...`);
  console.log('Found Pokemon:')
  for (const pokemon of location.pokemon_encounters) {
    console.log(` - ${pokemon.pokemon.name}`);
  }
}
