export const NONE: string[] = [];

export const pathCache = createPromiseCache(fetchPaths);

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

async function fetchPaths(name: string) {
  const res = await fetch(`images/${name}.svg.path`)
  const text = await res.text();
  if (text[0] === 'M' && text[text.length - 1] === 'Z') {
    return text.split('\n');
  } else {
    return NONE
  }
}