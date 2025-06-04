export interface Platform {
  x: number
  y: number
  width: number
  height: number
  leftBorder: number
  rightBorder: number
  topBorder: number
}

export interface characterPermanentParam {
  x: number
  y: number
  width: number
  height: number
  gravity: number
}

export interface characterModifiableParam {
  speed: number
  jumpHeight: number
}

export interface CharacterParam {
  x: number
  y: number
  width: number
  height: number
  speed: number
  gravity: number
  jumpHeight: number
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
  onLastPlatform?: boolean
}

export interface TrialsData {
  type: string
  typeID: string
  isTrialComplete: boolean
  equippedArtId: string
  name: string
  quality: string
}

export interface Inventory {
  type: string
  typeID: string
  id: string
  name: string
  quality: string
  quantity: number
  speed?: number
  jumpHeight?: number
  luck?: number
}

export interface LocalPlayerData {
  nickname: string
  flatSpeedFromArts: number
  flatJumpHeightFromArts: number
  multiplierSpeedFromArts: number
  multiplierJumpHeightFromArts: number
  flatLuckFromArts: number
  trials: TrialsData[]
  inventory: Inventory[]
}

export interface Artifact {
  type: string
  id: string
  name: string
  quality: string
  speed?: number
  jumpHeight?: number
  luck?: number
}
