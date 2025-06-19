// repl.js actually refers to repl.ts
import { initState } from "./state.js"
import { startREPL } from "./repl.js";

async function main() {
    const state = initState();
    await startREPL(state);
}

main();
