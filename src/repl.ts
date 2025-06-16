import { createInterface } from "node:readline";

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
    prompt: "Pokedex >"
  });
  rl.prompt();
  rl.on("line", (line: string) => {
    const words = cleanInput(line);
    if (words.length !== 0) {
      console.log(`Your command was: ${words[0]}`)
    }
    rl.prompt();
  });
}
