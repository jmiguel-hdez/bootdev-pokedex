import type { State } from "./state.js";
import type { ShallowLocations } from "./pokeapi.js"

export async function commandMap(state: State): Promise<void> {
  let locations: ShallowLocations;
  if (state.nextLocationsURL !== null) {
    locations = await state.pokeapi.fetchLocations(state.nextLocationsURL);
  } else {
    locations = await state.pokeapi.fetchLocations();
  }

  for (let location of locations.results) {
    console.log(`${location.name}`)
  }
  state.prevLocationsURL = locations.previous;
  state.nextLocationsURL = locations.next;
}
