// import { useState } from "react"
import { Platform, CharacterCoords, CharacterParam, OnSurface } from "./types"

export function Falling(
  deltaTime: number,
  staticPlatforms: Array<Platform>,
  characterCoords: CharacterCoords,
  characterParam: CharacterParam,
  canvas: HTMLCanvasElement | null,
  onSurface: OnSurface
  // currentLevel: number
  // onPlatformRef: React.MutableRefObject<boolean>,
  // onGroundRef: React.MutableRefObject<boolean>
) {
  // console.log("falling запущен")
  // let onPlatform: boolean = false
  // let onGround: boolean = true

  // falling + "onPlatform" check

  onSurface.onPlatform = false
  staticPlatforms.forEach((platform) => {
    if (
      // characterCoords.bottom >= platform.topBorder &&
      // characterCoords.bottom <= platform.topBorder + characterParam.gravity * deltaTime &&
      // ((characterCoords.left > platform.leftBorder &&
      //   characterCoords.left < platform.rightBorder) ||
      //   (characterCoords.left > platform.leftBorder &&
      //     characterCoords.right < platform.rightBorder) ||
      //   (characterCoords.right > platform.leftBorder &&
      //     characterCoords.right < platform.rightBorder))
      characterCoords.bottom >= platform.topBorder &&
      characterCoords.bottom <=
        platform.topBorder + characterParam.gravity * deltaTime * 1.5 &&
      // + platform.height / 3
      ((characterCoords.right >= platform.leftBorder &&
        characterCoords.right <= platform.rightBorder) ||
        (characterCoords.left >= platform.leftBorder &&
          characterCoords.left <= platform.rightBorder))
    ) {
      characterParam.gravity = 0
      onSurface.onPlatform = true
      // setOnPlatform(true)
      characterParam.y = platform.topBorder - characterParam.height + 1
    }
  })
  if (characterParam.y <= canvas!.height - characterParam.height) {
    characterParam.y = Math.round(
      characterParam.y + characterParam.gravity * deltaTime
    )
    // onGroundRef.current = false
    onSurface.onGround = false
    // setOnGround(false)
  } else {
    // onGroundRef.current = true
    onSurface.onGround = true
    // setOnGround(true)
  }

  // if (!onPlatformRef.current || !onGroundRef.current) {
  if (!onSurface.onPlatform || !onSurface.onGround) {
    characterParam.gravity = 500
  }

  // console.log(onSurface, currentLevel)
  // console.log(characterParam.y)
}
