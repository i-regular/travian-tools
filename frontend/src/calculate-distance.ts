export interface IMapLocation {
  x: number;
  y: number;
}
export type BootsArtifactCoeficient = 2 | 1.5 | 1;

export interface IPlayerVillage {
  location: IMapLocation;
  tournamentSquareLevel?: number;
  bootsArtifact?: BootsArtifactCoeficient;
}

export function calculateDistance(
  attacker: IPlayerVillage,
  defender: IPlayerVillage,
  mapSize = 400
): number {
  const distanceX =
    ((attacker.location.x - defender.location.x + (3 * mapSize + 1)) %
      (2 * mapSize + 1)) -
    mapSize;
  const distanceY =
    ((attacker.location.y - defender.location.y + (3 * mapSize + 1)) %
      (2 * mapSize + 1)) -
    mapSize;

  const distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
  return distance;
}

export function calculateTravelTime(
  distance: number,
  attacker: IPlayerVillage,
  troopSpeed = 3
): number {
  let baseTime: number;
  if (distance < 20) {
    baseTime = distance / troopSpeed;
  } else {
    const tournamentSquareModifier =
      (attacker.tournamentSquareLevel || 0) * 0.2 + 1;
    const firstPartTime = 20 / troopSpeed;
    const secondPartTime =
      (distance - 20) / (troopSpeed * tournamentSquareModifier);
    baseTime = firstPartTime + secondPartTime;
  }

  return baseTime / (attacker.bootsArtifact || 1);
}
