import { css, cx } from '@linaria/core';
import { isPossibleZipCode } from './helpers/validations';

const uiCss = css`
  padding: 4px;
  background: white;
`

const inputCss = css`
  padding: 4px;
  appearance: none;
  font-size: inherit;
  color: currentColor;
  background: white;
  border: 1px solid #666;
  border-radius: 8px;
`

export function ZipCodeInput({ className, zipCode, setZipCode }: {
  className?: string
  zipCode: string,
  setZipCode: (zipCode: string) => void,
}) {
  return (
    <div className={cx(uiCss, className)}>
      <label htmlFor='zip-input'>Enter a Zip Code to zoom in: </label>
      <input
        id='zip-input'
        className={inputCss}
        type="text"
        value={zipCode}
        onChange={e => {
          const value = e.target.value.trim();
          if (isPossibleZipCode(value)) {
            setZipCode(value);
          }
        }}
      />
    </div>
  )
}