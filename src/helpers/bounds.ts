export const DEFAULT_VIEW_BOX = [0, 10, 85, 60].join(" ");

export function getBoundingBox(paths: string[]) {
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

export function padBoundingBox(bbox: number[], factor = 0.5) {
  const [x, y, width, height] = bbox;

  return [
    x - width * factor / 2,
    y - height * factor / 2,
    width * (1 + factor),
    height * (1 + factor)
  ]
}