import { useState, use, Suspense, useRef, useEffect, useMemo } from 'react'

import './Map.css'

function App() {
  const [zipCode, setZipCode] = useState('');

  return (
    <>
      <ZipCodeInput zipCode={zipCode} setZipCode={setZipCode} />
      <Suspense fallback={<div>loading…</div>}>
        <Map zipCode={zipCode} />
      </Suspense>
    </>
  )
}

function ZipCodeInput({ zipCode, setZipCode }: {
  zipCode: string,
  setZipCode: (zipCode: string) => void
}) {

  return (
    <input
      type="text"
      value={zipCode}
      onChange={e => {
        const value = e.target.value.trim();
        if (value.length === 0 || (value.length <= 5 && isNumber(value))) {
          setZipCode(value);
        }
      }}
    />
  )
}

const DEFAULT_VIEW_BOX = [0, 10, 85, 60];
function Map({ zipCode }: { zipCode: string }) {
  const [viewBox, setViewBox] = useState(DEFAULT_VIEW_BOX)
  const statePaths = use(pathCache.get('us-states'));
  const zipPaths = isValidZipCode(zipCode) ? use(pathCache.get(zipCode)) : [];

  useEffect(() => {
    if (zipPaths && zipPaths.length > 0) {
      setViewBox(padBoundingBox(getBoundingBox(zipPaths)));
    } else if (zipPaths.length === 0) {
      setViewBox(DEFAULT_VIEW_BOX);
    }
  }, [zipPaths])

  return (
    <svg
      viewBox={viewBox.join(' ')}
      width="100%"
      className='map'
    >
      {statePaths.map((path, i) => (
        <path key={i} d={path} />
      ))}

      {zipPaths.map(path => <ZipPath key={path} path={path} />)}
    </svg>
  )
}

function ZipPath({ path }: { path: string }) {
  return (
    <path d={path} className='selected' />
  )
}

function isNumber(value: string) {
  return /^\d+$/.test(value);
}

function isValidZipCode(zipCode: string) {
  return zipCode.length === 5 && isNumber(zipCode)
}

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

const pathCache = createPromiseCache(fetchPaths);

async function fetchPaths(name: string) {
  const res = await fetch(`images/${name}.svg.path`)
  const text = await res.text();
  if (text[0] === 'M' && text[text.length - 1] === 'Z') {
    return text.split('\n');
  } else {
    return []
  }
}

export default App

function getBoundingBox(paths: string[]) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  paths.forEach(path => {
    const points = path.trim().replace(/[A-Z]/ig, '').split(/\s+/mg);

    points.forEach(point => {
      const [x, y] = point.split(',').map(parseFloat);
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    });
  })

  return [minX, minY, maxX - minX, maxY - minY]
}

function padBoundingBox(bbox: number[], factor = 0.5) {
  const [x, y, width, height] = bbox;

  return [
    x - width * factor / 2,
    y - height * factor / 2,
    width * (1 + factor),
    height * (1 + factor)
  ]
}