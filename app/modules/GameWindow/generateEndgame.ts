import { PlatformJSON } from "./types"

export const generateEndgameLevel = (diff: number) => {
  const endgameLevel: Array<PlatformJSON> = [
    { x: 640, y: 540, width: 100, height: 32 },
  ]
  function getRandom(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  function generateRandomX(prevX: number) {
    const newX = prevX + getRandom(250, 300)
    return newX
  }

  for (let i = 1; i < 100 + diff * 2; i++) {
    const newX = generateRandomX(endgameLevel[i - 1].x)
    // const newX: number = endgameLevel[i - 1].x + gener
    const newY: number = endgameLevel[i - 1].y - 0

    const newWidth: number = endgameLevel[i - 1].width
    endgameLevel[i] = { x: newX, y: newY, width: newWidth, height: 32 }
  }
  const endgameLevelJSON = JSON.stringify(endgameLevel)
  return endgameLevelJSON
}
