import { createInterface } from "readline";
import { getCommands } from "./command.js"

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(' ')
    .filter((word) => word !== "");
}

export function startREPL(): void {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > "
  });
  const commands = getCommands();

  rl.prompt();

  rl.on("line", async (input) => {
    const words = cleanInput(input);
    if (words.length === 0) {
      rl.prompt();
      return;
    }
    const commandName = words[0];
    if (commandName in commands) {
      try {
        commands[commandName].callback(commands);
      } catch (err: unknown) {
        console.log(`Error: while executing ${commandName}`);
      }
    } else {
      console.log("Unknown command");
    }

    rl.prompt();
  });
}
