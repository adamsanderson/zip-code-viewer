import { Suspense, use, useState } from "react";
import { css } from "@linaria/core";

import { DEFAULT_VIEW_BOX } from "./helpers/bounds";
import { pathCache } from "./data";
import { motion } from "motion/react";
import { ZipCodeRegion } from "./ZipCodeRegion";

const mapCss = css`
  max-width: 100vw;
  max-height: 100vh;

  path {
    vector-effect: non-scaling-stroke;
  }
`;

const pathCss = css`
  fill: none;
  stroke: #000;
  stroke-width: 0.25px;
`;

export function Map({ zipCode }: { zipCode: string }) {
  const [viewBox, setViewBox] = useState(DEFAULT_VIEW_BOX)
  const statePaths = use(pathCache.get('us-states'));

  return (
    <motion.svg
      animate={{ viewBox }}
      width="100%"
      className={mapCss}
      transition={{ ease: 'circInOut', duration: 1.5 }}
    >
      {statePaths.map((path, i) => (
        <path key={i} d={path} className={pathCss}/>
      ))}

      <Suspense>
        <ZipCodeRegion zipCode={zipCode} setBoundingBox={setViewBox} />
      </Suspense>
    </motion.svg>
  )
}