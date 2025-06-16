import { initState } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(' ')
    .filter((word) => word !== "");
}

export function startREPL(): void {

  const state = initState()
  state.rl.prompt();

  state.rl.on("line", async (input: any) => {
    const words = cleanInput(input);
    if (words.length === 0) {
      state.rl.prompt();
      return;
    }
    const commandName = words[0];
    const cmd = state.commands[commandName];

    if (!cmd) {
      console.log("Unknown command");
      state.rl.prompt();
      return;
    }

    try {
      cmd.callback(state);
    } catch (err: unknown) {
      console.log(`Error: while executing ${commandName}`, err);
    }

    state.rl.prompt();
  });
}
