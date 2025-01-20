import { Platform, CharacterCoords, CharacterParam, OnSurface } from "./types"

export function falling(
  deltaTime: number,
  staticPlatforms: Array<Platform>,
  characterCoords: CharacterCoords,
  characterParam: CharacterParam,
  canvas: HTMLCanvasElement | null,
  onSurface: OnSurface
) {
  // falling + "onPlatform" check
  onSurface.onPlatform = false
  staticPlatforms.forEach((platform) => {
    if (
      characterCoords.bottom >= platform.topBorder &&
      characterCoords.bottom <=
        platform.topBorder + characterParam.gravity * deltaTime &&
      ((characterCoords.left > platform.leftBorder &&
        characterCoords.left < platform.rightBorder) ||
        (characterCoords.left > platform.leftBorder &&
          characterCoords.right < platform.rightBorder) ||
        (characterCoords.right > platform.leftBorder &&
          characterCoords.right < platform.rightBorder))
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
    onSurface.onGround = false
  } else {
    onSurface.onGround = true
  }

  if (!onSurface.onPlatform || !onSurface.onGround) {
    characterParam.gravity = 500
  }
}
