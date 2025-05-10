import { CharacterParam, OnSurface } from "../../../../types/types"

let onJump = false

export function jump(
  keysHold: {
    [key: string]: boolean
  },
  characterParam: CharacterParam,
  onSurface: OnSurface
) {
  if (keysHold["Space"] && onSurface.onPlatform == true && onJump == false) {
    onJump = true
    let currentJumpHeight = characterParam.jumpHeight / 4.8
    const jumping = setInterval(() => {
      characterParam.gravity = 0
      characterParam.y = characterParam.y - currentJumpHeight
      currentJumpHeight = currentJumpHeight - 0.5
    }, 20)
    setTimeout(() => {
      clearInterval(jumping)
      currentJumpHeight = characterParam.jumpHeight
      onJump = false
    }, 240)
  }
}
