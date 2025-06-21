import type { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
  console.log("Your Pokedex:");
  for (const pokemon in state.pokedex) {
    console.log(` - ${state.pokedex[pokemon].name}`);
  }
}
