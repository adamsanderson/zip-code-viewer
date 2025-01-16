import { use, useEffect } from "react";
import { isValidZipCode } from "./helpers/validations";
import { NONE, pathCache } from "./data";
import { DEFAULT_VIEW_BOX, getBoundingBox, padBoundingBox } from "./helpers/bounds";

export function ZipCodeRegion({ zipCode, setBoundingBox }: { 
  zipCode: string,
  setBoundingBox: (bbox: string) => void
}) {
  const zipPaths = isValidZipCode(zipCode) ? use(pathCache.get(zipCode)) : NONE;

  useEffect(() => {
    if (zipPaths && zipPaths.length > 0) {
      setBoundingBox(padBoundingBox(getBoundingBox(zipPaths)).join(" "));
    } else if (zipPaths.length === 0) {
      setBoundingBox(DEFAULT_VIEW_BOX);
    }
  }, [setBoundingBox, zipPaths])

  return (
    <>
      {zipPaths.map((path, i) => <path key={i} d={path} className='selected' />)}
    </>
  )
}