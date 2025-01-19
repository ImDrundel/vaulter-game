import { Platform, Player, Wall } from "./types"
// import levelBoundaryWall from "@/public/levelBoundaryWall.json"

const character = new Image()
character.src = "/character.png"
export function drawPlayer(ctx: CanvasRenderingContext2D, player: Player) {
  ctx!.drawImage(
    character,
    0,
    0,
    player.width,
    player.height,
    player.x,
    player.y,
    player.width,
    player.height
  )
}

const platformSprite = new Image()
platformSprite.src = "/rock.avif"
export function drawStaticPlatform(
  staticPlatforms: Array<Platform>,
  ctx: CanvasRenderingContext2D | null
) {
  staticPlatforms.forEach((platform: Platform) => {
    ctx!.drawImage(
      platformSprite,
      platform.width,
      platform.width / 2,
      platform.width,
      platform.height,
      platform.x,
      platform.y,
      platform.width,
      platform.height
    )
  })
}

const wallSprite = new Image()
wallSprite.src = "/castle_wall_texture.jpg"
export function drawLevelBoundaryWall(
  levelBoundaryWall: Array<Wall>,
  ctx: CanvasRenderingContext2D | null
) {
  levelBoundaryWall.forEach((wall) => {
    ctx!.drawImage(
      wallSprite,
      0,
      0,
      wall.width,
      wall.height / 2,
      wall.x,
      wall.y,
      wall.width,
      wall.height
    )
  })
}

const chest = new Image()
chest.src = "/chest.png"
export function drawChest(
  staticPlatforms: Array<Platform>,
  ctx: CanvasRenderingContext2D | null
) {
  ctx!.drawImage(
    chest,
    0,
    0,
    50,
    32,
    staticPlatforms[staticPlatforms.length - 1].rightBorder - 50,
    staticPlatforms[staticPlatforms.length - 1].topBorder - 32,
    50,
    32
  )
}
