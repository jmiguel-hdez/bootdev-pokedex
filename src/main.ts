// repl.js actually refers to repl.ts
import { initState } from "./state.js"
import { startREPL } from "./repl.js";

async function main() {
  const state = initState(1000 * 60 * 5); // 5 minutes cache
  await startREPL(state);
}

main();
