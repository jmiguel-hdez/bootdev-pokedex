import { commandExit } from "./command_exit.js"
import { commandHelp } from "./command_help.js"
import { commandMap } from "./command_map.js"
import { commandMapb } from "./command_mapb.js"

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
  };
}
