import { Platform, PlayerCoords, Player } from "./types"

// eslint-disable-next-line prefer-const
// let onPlatform: boolean = false
// eslint-disable-next-line prefer-const
// let onGround: boolean = true
export function falling(
  deltaTime: number,

  staticPlatforms: Array<Platform>,
  playerCoords: PlayerCoords,
  player: Player,
  canvas: HTMLCanvasElement | null,
  onSurface: { onGround: boolean; onPlatform: boolean }
) {
  // falling + "onPlatform" check
  onSurface.onPlatform = false
  staticPlatforms.forEach((platform) => {
    if (
      playerCoords.bottom >= platform.topBorder &&
      playerCoords.bottom <= platform.topBorder + player.gravity * deltaTime &&
      ((playerCoords.left > platform.leftBorder &&
        playerCoords.left < platform.rightBorder) ||
        (playerCoords.left > platform.leftBorder &&
          playerCoords.right < platform.rightBorder) ||
        (playerCoords.right > platform.leftBorder &&
          playerCoords.right < platform.rightBorder))
    ) {
      player.gravity = 0
      onSurface.onPlatform = true
      player.y = platform.topBorder - player.height + 1
    }
  })

  if (player.y <= canvas!.height - player.height) {
    player.y = Math.round(player.y + player.gravity * deltaTime)
    onSurface.onGround = false
  } else {
    onSurface.onGround = true
  }

  if (!onSurface.onPlatform || !onSurface.onGround) {
    player.gravity = 500
  }
}

// export function jump(player: Player) {

// }
