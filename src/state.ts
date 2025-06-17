import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js"
import { PokeAPI } from "./pokeapi.js";

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > "
  });
  const state: State = {
    readline: rl,
    commands: getCommands(),
    pokeapi: new PokeAPI(),
    nextLocationsURL: null,
    prevLocationsURL: null
  }
  return state;
}
