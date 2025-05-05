export interface Platform {
  x: number
  y: number
  width: number
  height: number
  leftBorder: number
  rightBorder: number
  topBorder: number
}

// export interface Wall {
//   x: number
//   y: number
//   width: number
//   height: number
//   leftBorder: number
//   rightBorder: number
//   topBorder: number
// }

export interface CharacterParam {
  x: number
  y: number
  width: number
  height: number
  speed: number
  gravity: number
  jumpHeight: number
  jumpSpeed: number
}

export interface PlatformJSON {
  x: number
  y: number
  width: number
  height: number
}

export interface CharacterCoords {
  left: number
  right: number
  top: number
  bottom: number
}

export interface OnSurface {
  onLava?: boolean
  onPlatform?: boolean
}

export interface LevelBoundary {
  leftBorder: number
  // rightBorder: number
}
