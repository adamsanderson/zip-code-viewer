import { Suspense, use, useState } from "react";
import { DEFAULT_VIEW_BOX } from "./helpers/bounds";
import { pathCache } from "./data";
import { motion } from "motion/react";
import { ZipCodeRegion } from "./ZipCodeRegion";

import './Map.css'

export function Map({ zipCode }: { zipCode: string }) {
  const [viewBox, setViewBox] = useState(DEFAULT_VIEW_BOX)
  const statePaths = use(pathCache.get('us-states'));
  
  return (
    <motion.svg
      animate={{viewBox}}
      width="100%"
      className='map'
      transition={{ ease: 'circInOut', duration: 1.5 }}
    >
      {statePaths.map((path, i) => (
        <path key={i} d={path} />
      ))}

      <Suspense>
        <ZipCodeRegion zipCode={zipCode} setBoundingBox={setViewBox} />
      </Suspense>
    </motion.svg>
  )
}