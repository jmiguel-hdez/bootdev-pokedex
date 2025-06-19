import type { State } from "./state.js";

export async function commandMapb(state: State): Promise<void> {


    if (!state.prevLocationsURL) {
        throw new Error("you're on the first page");
    }
    const locations = await state.pokeapi.fetchLocations(state.prevLocationsURL);

    state.prevLocationsURL = locations.previous;
    state.nextLocationsURL = locations.next;

    for (let location of locations.results) {
        console.log(`${location.name}`)
    }
}
