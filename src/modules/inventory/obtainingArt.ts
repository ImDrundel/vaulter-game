import { LocalPlayerData } from "@/src/types/types"
import { Dispatch, SetStateAction } from "react"
import artifact_of_strength from "@/public/assets/equipment/artifact_of_strength.json"
import artifact_of_dexterity from "@/public/assets/equipment/artifact_of_dexterity.json"
import artifact_of_soul from "@/public/assets/equipment/artifact_of_soul.json"
import artifact_of_luck from "@/public/assets/equipment/artifact_of_luck.json"

function rollArtifactRarity(diff: number, luck: number) {
  const maxDifficulty = 125
  const dropRatio = diff + luck

  const commonChance = Math.max(0, 0.45 - (0.45 / maxDifficulty) * dropRatio)
  const uncommonChance = 0.25

  const freedChance = 0.45 - commonChance
  const rareChance = 0.15 + 0.5 * freedChance
  const epicChance = 0.1 + (1 / 3) * freedChance
  const legendaryChance = 0.05 + (1 / 6) * freedChance

  const probabilities = [
    commonChance,
    uncommonChance,
    rareChance,
    epicChance,
    legendaryChance,
  ]
  const rand = Math.random()
  let cumulative = 0
  for (let i = 0; i < probabilities.length; i++) {
    cumulative += probabilities[i]
    if (rand < cumulative) {
      return i
    }
  }

  return probabilities.length - 1
}

export function obtainingArt(
  temporaryPersonalInfo: LocalPlayerData,
  setTemporaryPersonalInfo: Dispatch<SetStateAction<LocalPlayerData>>,
  currentLevel: number,
  onLastPlatform: boolean
) {
  if (currentLevel >= 4 && onLastPlatform == true) {
    const updated = JSON.parse(JSON.stringify(temporaryPersonalInfo))
    const droppedArtIndex: number = rollArtifactRarity(
      1,
      temporaryPersonalInfo.flatLuckFromArts
    )

    const randomNumber = Math.floor(Math.random() * 4) + 1
    const droppedArtType =
      randomNumber === 1
        ? artifact_of_strength
        : randomNumber === 2
        ? artifact_of_dexterity
        : randomNumber === 3
        ? artifact_of_soul
        : artifact_of_luck

    updated.inventory.push(droppedArtType[droppedArtIndex])
    console.log(droppedArtType[droppedArtIndex])
    setTemporaryPersonalInfo(updated)
  }
}
