export const NONE: string[] = [];

/**
 * Simple caching data fetcher for use with React19's `use`.
 * 
 * Usage: `pathCache.get(zipCode)`
 */
export const pathCache = createPromiseCache(fetchPaths);

/**
 * Creates a generic promise cache for use with `use`.
 * There's no eviction policy, but for this application, that's just fine.
 * People will get bored after two or three resources have been loaded.
 */
function createPromiseCache<KeyType, ValueType>(callback: (key: KeyType) => Promise<ValueType>) {
  const cache: Record<string, Promise<ValueType> | undefined> = {};

  return {
    get: (key: KeyType) => {
      const serializedKey = JSON.stringify(key);
      if (cache[serializedKey]) {
        return cache[serializedKey];
      }
      const promise = callback(key);
      cache[serializedKey] = promise;
      return promise;
    },
  }
}

/**
 * Fetches a static SVG path.
 */
async function fetchPaths(name: string): Promise<string[]> {
  const res = await fetch(`images/${name}.svg.path`)
  if (res.status >= 400 || res.status < 200) return NONE;

  const text = await res.text();

  // Workaround for operating in Vite's dev mode. In this case,
  // instead of a 404, we'll get the JS source.  This lets you
  // build an SPA with routing, but breaks our assumptions that
  // file will be there or not.
  //
  // All paths look like M…coordinates…Z
  if (text[0] === 'M' && text[text.length - 1] === 'Z') {
    return text.split('\n');
  }

  return NONE;
}