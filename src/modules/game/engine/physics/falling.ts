import {
  Platform,
  CharacterCoords,
  CharacterParam,
  OnSurface,
} from "../../../../types/types"

export function Falling(
  deltaTime: number,
  staticPlatforms: Array<Platform>,
  characterCoords: CharacterCoords,
  characterParam: CharacterParam,
  canvas: HTMLCanvasElement | null,
  onSurface: OnSurface
) {
  onSurface.onPlatform = false
  staticPlatforms.forEach((platform) => {
    if (
      characterCoords.bottom >= platform.topBorder &&
      characterCoords.bottom <=
        platform.topBorder + characterParam.gravity * deltaTime * 1.5 &&
      ((characterCoords.right >= platform.leftBorder &&
        characterCoords.right <= platform.rightBorder) ||
        (characterCoords.left >= platform.leftBorder &&
          characterCoords.left <= platform.rightBorder))
    ) {
      characterParam.gravity = 0
      onSurface.onPlatform = true
      characterParam.y = platform.topBorder - characterParam.height + 1
    }
  })
  if (characterParam.y <= canvas!.height - characterParam.height) {
    characterParam.y = Math.round(
      characterParam.y + characterParam.gravity * deltaTime
    )
    onSurface.onLava = false
  } else {
    onSurface.onLava = true
  }
  if (!onSurface.onPlatform || !onSurface.onLava) {
    characterParam.gravity = 500 //real gravity
  }
}
