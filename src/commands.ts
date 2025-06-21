import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exits the Pokedex",
      callback: commandExit,
    },
    map: {
      name: "map",
      description: "Displays the names of 20 locations areas in the pokemon world. each subsequent call to map should display the next 20 locations",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays the names of previous 20 locations areas in the pokemon world. if there are is not previous page it shows an error",
      callback: commandMapb,
    },
    explore: {
      name: "explore <location_name>",
      description: "takes the name of a location area as an argument and print the pokemons in the area",
      callback: commandExplore,
    },
    catch: {
      name: "catch <pokemon_name>",
      description: "You get a chance to catch a pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect <pokemon_name>",
      description: "Displays information about the pokemon",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "Display captured pokemons",
      callback: commandPokedex,
    }
  };
}
