import { Platform, CharacterParam, Wall } from "./types"
// import levelBoundaryWall from "@/public/levelBoundaryWall.json"

// const character = new Image()
// character.src = "/character.png"
export function drawCharacter(
  ctx: CanvasRenderingContext2D,
  characterParam: CharacterParam,
  texture_character: HTMLImageElement
) {
  ctx!.drawImage(
    texture_character,
    0,
    0,
    characterParam.width,
    characterParam.height,
    characterParam.x,
    characterParam.y,
    characterParam.width,
    characterParam.height
  )
}

// const platformSprite = new Image()
// platformSprite.src = "/rock.avif"
export function drawStaticPlatform(
  staticPlatforms: Array<Platform>,
  ctx: CanvasRenderingContext2D | null,
  texture_platform: HTMLImageElement
) {
  staticPlatforms.forEach((platform: Platform) => {
    ctx!.drawImage(
      texture_platform,
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

// const wallSprite = new Image()
// wallSprite.src = "/castle_wall_texture.jpg"
export function drawLevelBoundaryWall(
  levelBoundaryWall: Array<Wall>,
  ctx: CanvasRenderingContext2D | null,
  texture_level_bounadry_wall: HTMLImageElement
) {
  levelBoundaryWall.forEach((wall) => {
    ctx!.drawImage(
      texture_level_bounadry_wall,
      0,
      0,
      wall.width,
      wall.height,
      wall.x,
      wall.y,
      wall.width,
      wall.height
    )
  })
}

// const chest = new Image()
// chest.src = "/chest.png"
export function drawChest(
  staticPlatforms: Array<Platform>,
  ctx: CanvasRenderingContext2D | null,
  texture_chest: HTMLImageElement
) {
  ctx!.drawImage(
    texture_chest,
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
