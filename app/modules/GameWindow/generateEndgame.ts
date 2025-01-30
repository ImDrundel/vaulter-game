import { PlatformJSON } from "./types"

export const generateEndgameLevel = (diff: number) =>
  // diff
  // { "x": 680, "y": 550, "width": 120, "height": 32 },
  {
    const endgameLevel: Array<PlatformJSON> = [
      { x: 680, y: 550, width: 120, height: 32 },
    ]
    for (let i = 1; i < 100; i++) {
      const newX: number = endgameLevel[i - 1].x + 1000 * diff * 0.01
      const newY: number = endgameLevel[i - 1].y - 10
      const newWidth: number = endgameLevel[i - 1].width - 1
      endgameLevel[i] = { x: newX, y: newY, width: newWidth, height: 32 }
    }
    const endgameLevelJSON = JSON.stringify(endgameLevel)
    return endgameLevelJSON
  }
