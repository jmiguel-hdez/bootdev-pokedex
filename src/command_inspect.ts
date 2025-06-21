import type { State } from "./state.js";
import type { Pokemon } from "./pokeapi.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {

  if (args.length != 1) {
    throw new Error("must provide a name for pokemon");
  }
  const name = args[0];
  const pokemon = state.pokedex[name];
  if (!pokemon) {
    throw new Error("you have not caught that pokemon");
  }

  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);

  console.log(`Stats:`);
  for (const stat of pokemon.stats) {
    console.log(` -${stat.stat.name}: ${stat.base_stat}`);
  }

  console.log("Types:");
  for (const poketype of pokemon.types) {
    console.log(` - ${poketype.type.name}`);
  }
}
