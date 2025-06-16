import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js"

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
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
  }
  return state;
}
