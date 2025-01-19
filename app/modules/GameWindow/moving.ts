import { Platform, Player, Wall } from "./types"
// import levelBoundaryWall from "@/public/levelBoundaryWall.json"

export function moving(
  deltaTime: number,
  levelBoundary: { leftBorder: number; rightBorder: number },
  levelBoundaryWall: Array<Wall>,
  keysHold: { [key: string]: boolean },
  player: Player,
  staticPlatforms: Array<Platform>
) {
  if (keysHold["KeyA"] && player.x >= levelBoundary.leftBorder) {
    staticPlatforms.map((platform: Platform) => {
      platform.x += player.speed * deltaTime
      platform.leftBorder += player.speed * deltaTime
      platform.rightBorder += player.speed * deltaTime
    })
    levelBoundaryWall.map((platform: Platform) => {
      platform.x += player.speed * deltaTime
    })
    levelBoundary.leftBorder += player.speed * deltaTime
    levelBoundary.rightBorder += player.speed * deltaTime
  }
  if (
    keysHold["KeyD"] &&
    player.x + player.width <= levelBoundary.rightBorder
  ) {
    staticPlatforms.map((platform: Platform) => {
      platform.x -= player.speed * deltaTime
      platform.leftBorder -= player.speed * deltaTime
      platform.rightBorder -= player.speed * deltaTime
    })
    levelBoundaryWall.map((platform: Platform) => {
      platform.x -= player.speed * deltaTime
    })
    levelBoundary.leftBorder -= player.speed * deltaTime
    levelBoundary.rightBorder -= player.speed * deltaTime
  }
}
