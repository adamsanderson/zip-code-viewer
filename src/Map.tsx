import { Suspense, use, useState } from "react";
import { css, cx } from "@linaria/core";

import { DEFAULT_VIEW_BOX } from "./helpers/bounds";
import { pathCache } from "./data";
import { motion } from "motion/react";
import { ZipCodeRegion } from "./ZipCodeRegion";

const mapCss = css`
  path {
    vector-effect: non-scaling-stroke;
  }
`;

const pathCss = css`
  fill: none;
  stroke: #000;
  stroke-width: 0.25px;
`;

export function Map({ className, zipCode }: { className?: string, zipCode: string }) {
  const [viewBox, setViewBox] = useState(DEFAULT_VIEW_BOX)
  const statePaths = use(pathCache.get('us-states'));

  return (
    <motion.svg
      animate={{ viewBox }}
      width="100%"
      className={cx(mapCss, className)}
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