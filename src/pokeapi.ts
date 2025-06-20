import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

  constructor(interval: number) {
    this.#cache = new Cache(interval);
  }

  closeCache() {
    this.#cache.stopReapLoop();
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const locationAreaURL = `${PokeAPI.baseURL}/location-area/`;
    const fullURL = pageURL || `${locationAreaURL}?offset=0&limit=20`;

    try {
      const cachedRsp = this.#cache.get<Promise<ShallowLocations>>(fullURL);

      if (cachedRsp) {
        // console.log("from cache")
        return cachedRsp;
      }


      const resp = await fetch(fullURL, {
        method: "GET",
        mode: "cors",
      });

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`)
      }
      const locations: ShallowLocations = await resp.json();
      this.#cache.add(fullURL, locations);

      return locations;
    } catch (e) {
      throw new Error(`Error fetching locations: ${(e as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const fullURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
    try {
      const cached = this.#cache.get<Promise<Location>>(fullURL);
      if (cached) {
        // console.log("from cache")
        return cached;
      }

      const resp = await fetch(fullURL, {
        method: "GET",
        mode: "cors"
      });

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }
      const location: Location = await resp.json();
      this.#cache.add(fullURL, location);
      return location;
    } catch (err: unknown) {
      throw new Error(
        `Error fetching loation '${locationName}': ${(err as Error).message})`
      );
    }
  }
}

export type NamedAPIResource = {
  name: string;
  url: string;
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: NamedAPIResource[];
};


export type EncounterVersionDetails = {
  rate: number;
  version: NamedAPIResource;
}

export type EncounterMethodRate = {
  encounter_method: NamedAPIResource;
  version_details: EncounterVersionDetails[];
}

export type Name = {
  name: string;
  language: NamedAPIResource;
}

export type Encounter = {
  min_level: number;
  max_level: number;
  condition_values: NamedAPIResource[];
  chance: number;
  method: NamedAPIResource;
}

export type VersionEncounterDetail = {
  version: NamedAPIResource; // The game version this encounter happens in.
  max_chance: number; // The total percentage of all encounter potential.
  encounter_details: Encounter[]; // A list of encounters and their specifics.
}

export type PokemonEncounter = {
  pokemon: NamedAPIResource;
  version_details: VersionEncounterDetail[];
}

export type Location = {
  id: number; // The identifier for this resource
  name: string; // The name for this resource
  game_index: number; // The internal id of an API resource within game data.
  // A list of methods in which Pokemon may be encountered in this area
  // and how likely the method will occur depending on the version of the game.
  encounter_method_rates: EncounterMethodRate[];
  location: NamedAPIResource; // The region this location area can be found in.
  names: Name[]; // The name of this resource listed in different languages.
  // a list of pokemn that can be encountered in this area along with version specific details about the encounter.
  pokemon_encounters: PokemonEncounter[];
}
