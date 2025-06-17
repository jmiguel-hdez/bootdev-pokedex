import type { State } from "./state.js";
import type { ShallowLocations } from "./pokeapi.js"

export async function commandMapb(state: State): Promise<void> {
  let locations: ShallowLocations;
  if (state.prevLocationsURL === null) {
    console.log("you're on the first page");
    return;
  }
  locations = await state.pokeapi.fetchLocations(state.prevLocationsURL);

  for (let location of locations.results) {
    console.log(`${location.name}`)
  }
  state.prevLocationsURL = locations.previous;
  state.nextLocationsURL = locations.next;
}
