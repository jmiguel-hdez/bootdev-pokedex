import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js"
import { PokeAPI } from "./pokeapi.js";

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocationsURL: string;
  prevLocationsURL: string;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export function initState(): State {
  const INTERVAL: number = 10000 // 300 000 ms -> 5 min
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > "
  });
  const state: State = {
    readline: rl,
    commands: getCommands(),
    pokeapi: new PokeAPI(INTERVAL),
    nextLocationsURL: "",
    prevLocationsURL: "",
  }
  return state;
}
