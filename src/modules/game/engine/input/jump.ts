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
    const jumping = setInterval(() => {
      characterParam.gravity = 0
      characterParam.y = characterParam.y - characterParam.jumpHeight
      characterParam.jumpHeight = characterParam.jumpHeight - 0.3
    }, 20)
    setTimeout(() => {
      clearInterval(jumping)
      characterParam.jumpHeight = 21
      onJump = false
    }, 240)
  }
}
