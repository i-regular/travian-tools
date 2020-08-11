import { IMapLocation } from "./calculate-distance";

export function parseMapLocationFromVillageLink(
  villageLink: string,
): IMapLocation | null {
  const parsedLocation: IMapLocation = {
    x: 0,
    y: 0,
  };

  const xMatches = villageLink.match(/x=(.?\d{1,3})/im);
  const yMatches = villageLink.match(/y=(.?\d{1,3})/im);
  console.log({
    xMatches,
    yMatches,
  });

  if (xMatches !== null) {
    parsedLocation.x = parseInt(xMatches[1], 10);
  } else {
    return null;
  }
  if (yMatches !== null) {
    parsedLocation.y = parseInt(yMatches[1], 10);
  } else {
    return null;
  }

  return parsedLocation;
}
