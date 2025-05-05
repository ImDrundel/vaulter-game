import { Platform, CharacterParam } from "../../../../types/types"

export function moving(
  deltaTime: number,
  keysHold: { [key: string]: boolean },
  characterParam: CharacterParam,
  staticPlatforms: Array<Platform>
) {
  if (keysHold["KeyA"]) {
    staticPlatforms.map((platform: Platform) => {
      platform.x += characterParam.speed * deltaTime
      platform.leftBorder += characterParam.speed * deltaTime
      platform.rightBorder += characterParam.speed * deltaTime
    })
  }
  if (keysHold["KeyD"]) {
    staticPlatforms.map((platform: Platform) => {
      platform.x -= characterParam.speed * deltaTime
      platform.leftBorder -= characterParam.speed * deltaTime
      platform.rightBorder -= characterParam.speed * deltaTime
    })
  }
}
