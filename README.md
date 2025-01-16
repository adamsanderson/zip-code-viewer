# ZipCode Viewer
I was listening to PlanetMoney's episode [ZIP Codes!](https://www.npr.org/2025/01/08/1223466587/zip-code-history), and thought it might be fun to try visualizing zip codes.

It was!

There's not much here, but mayhaps you'll find it someday and play around with it.

## Data
The original data was pulled from a set of 2023 zip code files from [opendatasoft](
https://public.opendatasoft.com/explore/dataset/georef-united-states-of-america-zcta5/export/?disjunctive.ste_code&disjunctive.ste_name&disjunctive.coty_code&disjunctive.coty_name&disjunctive.zcta5_code&disjunctive.zcta5_name&sort=year&refine.zcta5_type=five-digit+ZCTA&refine.year=2023&location=2,34.16182,-22.85156&basemap=jawg.light).  

Disclaimer: I have no idea where that data originally came from, so I'm not including it.

US States were pulled from [PublicaMundi](https://github.com/PublicaMundi/MappingAPI/blob/master/data/geojson/us-states.json) and has been included in the repo.

## Generating SVGs
Run the `convert` script in the `package.json` file will generate SVG paths for all the ZIP codes.

```sh
pnpm convert input.geojson public/images/
```

I doubt anyone else will ever run this, but if you do take a peek at `convert-to-svg.ts` to see the assumptions about the input file.

