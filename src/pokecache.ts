type CacheEntry<T> = {
  createdAt: number;
  val: T;
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  //Create a add<T>() method that adds a new entry to the cache object.
  // It should take a key(a string) and a val(a T generic)
  add<T>(key: string, val: T) {
    const entry: CacheEntry<T> = {
      createdAt: Date.now(),
      val: val,
    }
    this.#cache.set(key, entry);
  }

  // Create a get<T>() method that gets an entry from the cache object.
  // It should take a key (a string) and returns some object. Return undefined if the entry is missing.
  get<T>(key: string): T | undefined {
    const entry = this.#cache.get(key);
    if (entry == undefined) {
      return undefined;
    }
    return entry.val;
  }

  #timedelta() {
    return Date.now() - this.#interval
  }

  //Create a #reap() method to delete any entries that are older than the interval. It should loop through the cche and delete any entries that
  //are older than Date.no() - this.#interval
  #reap() {
    // console.log("enter reap");
    // console.log(`delta: ${delta}`)
    for (const [key, value] of this.#cache.entries()) {
      // console.log(`createdAt: ${value.createdAt} delta:${delta} lessthan: ${value.createdAt < delta}`);
      if (value.createdAt < this.#timedelta()) {
        // console.log(`delete ${key}`)
        this.#cache.delete(key)
      }
    }
  }

  //Create a #startReapLoop() method that uses setInterval() to call this.#reap() after a delay of this.#interval and store the interval ID in this.#reapIntervalID.
  #startReapLoop() {
    // console.log(`startReapLoop interval:${this.#interval}`)
    this.#reapIntervalId = setInterval(() => { this.#reap() }, this.#interval);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }

}
