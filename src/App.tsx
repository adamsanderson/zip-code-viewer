import { useState, Suspense } from 'react'

import { Map } from './Map';
import { ZipCodeInput } from './ZipCodeInput';
import { css } from '@linaria/core';

const zipLayoutCss = css`
  position: fixed;
  top: 0;
  left: 0;
`

const mapLayoutCss = css`
  position: fixed;
  inset: 16px;
  max-height: 100%;
  max-width: 100%;
`

function App() {
  const [zipCode, setZipCode] = useState('');

  return (
    <>
      <Suspense fallback={<div>loading…</div>}>
        <Map className={mapLayoutCss} zipCode={zipCode} />
      </Suspense>
      <ZipCodeInput className={zipLayoutCss} zipCode={zipCode} setZipCode={setZipCode} />
    </>
  )
}

export default App