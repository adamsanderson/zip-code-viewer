import { useState, Suspense } from 'react'

import { isNumber } from './helpers/validations';
import { Map } from './Map';

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

export default App