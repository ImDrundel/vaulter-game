import { Platform, CharacterParam } from "@/src/types/types"

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

export function drawChest(
  staticPlatforms: Array<Platform>,
  ctx: CanvasRenderingContext2D | null,
  texture_chest: HTMLImageElement
) {
  ctx!.drawImage(
    texture_chest,
    0,
    0,
    64,
    55,
    staticPlatforms[staticPlatforms.length - 1].rightBorder - 64,
    staticPlatforms[staticPlatforms.length - 1].topBorder - 55,
    64,
    55
  )
}
export function drawAltar(
  staticPlatforms: Array<Platform>,
  ctx: CanvasRenderingContext2D | null,
  texture_trial_altar: HTMLImageElement
) {
  ctx!.drawImage(
    texture_trial_altar,
    0,
    0,
    80,
    101,
    staticPlatforms[staticPlatforms.length - 1].rightBorder - 80,
    staticPlatforms[staticPlatforms.length - 1].topBorder - 101,
    80,
    101
  )
}
