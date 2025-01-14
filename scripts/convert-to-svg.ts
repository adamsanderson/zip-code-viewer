/**
 * Usage
 * npx tsx scripts/convert-to-svg.ts [src] [dest]
 * 
 * src: source GeoJSON file
 * dest: destination directory
 */

import { readFileSync, writeFileSync } from 'fs'
import { FeatureCollection } from 'geojson';
import { GeoJSON2SVG } from 'geojson2svg';
import fs from 'fs';

const args = {
    inputFile: process.argv[2],
    outputDir: process.argv[3],
};

if (!args.inputFile || !fs.lstatSync(args.inputFile).isFile()) {
    throw new Error('Please provide a valid input file');
}

if (!args.outputDir || !fs.lstatSync(args.outputDir).isDirectory()) {
    throw new Error('Please provide a valid output directory');
}

const geoJSON: FeatureCollection = JSON.parse(readFileSync(args.inputFile, 'utf-8'));
const converter = new GeoJSON2SVG({
    output: 'path',
    mapExtent: { left: -180, bottom: -90, right: 180, top: 90 },
});

console.info("Converting", geoJSON.features.length, "features…");
const paths = converter.convert(geoJSON, {
    attributes: [
        {
            property: 'properties.ste_name',
            type: 'dynamic',
            key: 'data-states',
        },
        {
            property: 'properties.coty_name',
            type: 'dynamic',
            key: 'data-counties',
        },
        {
            property: 'properties.zcta5_code',
            type: 'dynamic',
            key: 'data-zip-code',
        },
    ]
});

console.info("Saving", paths.length, "paths…");
paths.forEach((paths, i) => {
    const zipCode = geoJSON.features[i].properties!.zcta5_code[0];
    writeFileSync(`${args.outputDir}/${zipCode}.svg.path`, paths);
});

console.info("Converting us-states.json…");
const usStates = JSON.parse(readFileSync('data/us-states.json', 'utf-8'));
const usStatesPaths = converter.convert(usStates).join('\n');
writeFileSync(`${args.outputDir}/us-states.svg.path`, usStatesPaths);
