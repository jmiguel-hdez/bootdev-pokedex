import type { CLICommand } from "./command.js"

export function commandHelp(commands: Record<string, CLICommand>): void {
  console.log();
  console.log('Welcome to the Pokedex!');
  console.log('Usage:');
  console.log();
  for (const command in commands) {
    console.log(`${commands[command].name}: ${commands[command].description}`);
  }
  console.log();
}
