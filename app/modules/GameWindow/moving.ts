import { Platform, CharacterParam, Wall } from "./types"

export function moving(
  deltaTime: number,
  levelBoundary: { leftBorder: number; rightBorder: number },
  levelBoundaryWall: Array<Wall>,
  keysHold: { [key: string]: boolean },
  characterParam: CharacterParam,
  staticPlatforms: Array<Platform>
) {
  if (keysHold["KeyA"] && characterParam.x >= levelBoundary.leftBorder) {
    staticPlatforms.map((platform: Platform) => {
      platform.x += characterParam.speed * deltaTime
      platform.leftBorder += characterParam.speed * deltaTime
      platform.rightBorder += characterParam.speed * deltaTime
    })
    levelBoundaryWall.map((platform: Platform) => {
      platform.x += characterParam.speed * deltaTime
    })
    levelBoundary.leftBorder += characterParam.speed * deltaTime
    levelBoundary.rightBorder += characterParam.speed * deltaTime
  }
  if (
    keysHold["KeyD"] &&
    characterParam.x + characterParam.width <= levelBoundary.rightBorder
  ) {
    staticPlatforms.map((platform: Platform) => {
      platform.x -= characterParam.speed * deltaTime
      platform.leftBorder -= characterParam.speed * deltaTime
      platform.rightBorder -= characterParam.speed * deltaTime
    })
    levelBoundaryWall.map((platform: Platform) => {
      platform.x -= characterParam.speed * deltaTime
    })
    levelBoundary.leftBorder -= characterParam.speed * deltaTime
    levelBoundary.rightBorder -= characterParam.speed * deltaTime
  }
}
