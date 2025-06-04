import {
  Platform,
  CharacterCoords,
  CharacterParam,
  OnSurface,
} from "../../../../types/types"

export function falling(
  deltaTime: number,
  staticPlatforms: Array<Platform>,
  characterCoords: CharacterCoords,
  characterParam: CharacterParam,
  canvas: HTMLCanvasElement | null,
  onSurface: OnSurface
) {
  onSurface.onPlatform = false
  staticPlatforms.forEach((platform, index) => {
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

      if (index === staticPlatforms.length - 1) {
        onSurface.onLastPlatform = true
      } else {
        onSurface.onLastPlatform = false
      }
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
