import { CharacterParam, OnSurface } from "../../../../types/types"

let onJump = false

export function jump(
  keysHold: {
    [key: string]: boolean
  },
  characterParam: CharacterParam,
  onSurface: OnSurface
  // onPlatformRef: boolean,
  // onLavaRef: boolean
) {
  if (
    keysHold["Space"] &&
    onSurface.onPlatform == true &&
    //  || onSurface.onLava == true) &&
    onJump == false
    //onSurface.onPlatform & onLava check occurs in the 'falling' function in the 'falling.ts' file
  ) {
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
