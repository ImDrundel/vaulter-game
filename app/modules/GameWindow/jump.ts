import { CharacterParam, OnSurface } from "./types"

let onJump = false

export function jump(
  keysHold: {
    [key: string]: boolean
  },
  characterParam: CharacterParam,
  onSurface: OnSurface
) {
  if (
    keysHold["Space"] &&
    (onSurface.onPlatform == true || onSurface.onGround == true) &&
    onJump == false
    //onSurface.onPlatform & onGround check occurs in the 'falling' function in the 'falling.ts' file
  ) {
    onJump = true
    console.log("start jump")
    const jumping = setInterval(() => {
      characterParam.gravity = 0
      characterParam.y = characterParam.y - characterParam.jumpHeight
      console.log("frame")
      characterParam.jumpHeight = characterParam.jumpHeight - 0.3
    }, 20)
    setTimeout(() => {
      clearInterval(jumping)
      characterParam.jumpHeight = 21
      console.log("finish jump")
      onJump = false
    }, 240)
  }
}
