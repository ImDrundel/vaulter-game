import { PlatformJSON } from "../../../types/types"

export const generateEndgameLevel = (diff: number) => {
  const endgameLevel: Array<PlatformJSON> = [
    { x: 640, y: 530, width: 100, height: 32 },
  ]

  function getRandom(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  function generateRandomY(prevY: number) {
    let newY = getRandom(100, 520)
    while (newY < prevY - 180) {
      newY = getRandom(100, 520)
    }
    return newY
  }
  function generateRandomX(
    prevX: number,
    prevY: number,
    prevWidth: number,
    newY: number
  ) {
    let xMultiplier
    if (prevY - newY > 0) {
      xMultiplier = (prevY - newY) * 1.35
    } else {
      xMultiplier = (prevY - newY) * 0.8 // the smaller the multiplier, the smaller the distance to the next platform, if the next platform is below the current one
    }

    const newX =
      prevX +
      getRandom(prevWidth + 180 - xMultiplier, prevWidth + 210 - xMultiplier)

    return newX
  }

  for (let i = 1; i < 100 + diff * 2; i++) {
    const newY = generateRandomY(endgameLevel[i - 1].y)
    const newX = generateRandomX(
      endgameLevel[i - 1].x,
      endgameLevel[i - 1].y,
      endgameLevel[i - 1].width,
      newY
    )
    // const newX: number = endgameLevel[i - 1].x + gener

    const newWidth: number = endgameLevel[i - 1].width
    endgameLevel[i] = { x: newX, y: newY, width: newWidth, height: 32 }
  }
  const endgameLevelJSON = JSON.stringify(endgameLevel)
  return endgameLevelJSON
}
