import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(' ')
    .filter((word) => word !== "");
}

export function startREPL(state: State): void {

  const rl = state.readline;
  rl.prompt();

  rl.on("line", async (input: any) => {
    const words = cleanInput(input);
    if (words.length === 0) {
      rl.prompt();
      return;
    }
    const commandName = words[0];
    const cmd = state.commands[commandName];

    if (!cmd) {
      console.log("Unknown command");
      rl.prompt();
      return;
    }

    try {
      await cmd.callback(state);
    } catch (err: unknown) {
      console.log(`Error: while executing ${commandName}`, err);
    }

    rl.prompt();
  });
}
