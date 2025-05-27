import { LocalPlayerData } from "@/src/types/types"
import artifact_of_strength from "@/public/assets/equipment/artifact_of_strength.json"
import artifact_of_dexterity from "@/public/assets/equipment/artifact_of_dexterity.json"
import artifact_of_soul from "@/public/assets/equipment/artifact_of_soul.json"
import artifact_of_luck from "@/public/assets/equipment/artifact_of_luck.json"

const artList = {
  strArt: artifact_of_strength,
  dexArt: artifact_of_dexterity,
  soulArt: artifact_of_soul,
  luckArt: artifact_of_luck,
}
type ArtifactType = "strArt" | "dexArt" | "soulArt" | "luckArt"

export function equippingStrArt(
  currentPlayerData: LocalPlayerData,
  typeID: string,
  id: string
) {
  const type: ArtifactType = typeID as ArtifactType
  const currentArtType = artList[type]

  const typeDict = {
    strArt: 0,
    dexArt: 1,
    soulArt: 2,
    luckArt: 3,
  }
  const typeIndex = typeDict[type]

  const currentArt = JSON.parse(
    JSON.stringify(
      currentArtType.find((item) => item.id === id) || {
        type: "none",
        id: "none",
        name: "none",
        quality: "none",
        luck: 0,
        speed: 0,
        jumpHeight: 0,
      }
    )
  )

  const newPlayerData = JSON.parse(JSON.stringify(currentPlayerData))

  if (currentPlayerData.trials[typeIndex].isTrialComplete) {
    if (currentPlayerData.trials[typeIndex].equippedArtId === "none") {
      if (typeID === "soulArt") {
        newPlayerData.multiplierSpeedFromArts =
          currentPlayerData.multiplierSpeedFromArts + currentArt.speed

        newPlayerData.multiplierJumpHeightFromArts =
          currentPlayerData.multiplierJumpHeightFromArts + currentArt.jumpHeight
      } else if (
        typeID === "strArt" ||
        typeID === "dexArt" ||
        typeID === "luckArt"
      ) {
        newPlayerData.flatSpeedFromArts =
          currentPlayerData.flatSpeedFromArts + (currentArt?.speed || 0)

        newPlayerData.flatJumpHeightFromArts =
          currentPlayerData.flatJumpHeightFromArts +
          (currentArt?.jumpHeight || 0)

        newPlayerData.flatLuckFromArts =
          currentPlayerData.flatLuckFromArts + (currentArt?.luck || 0)
      }
    } else {
      const prevArtStat: { speed: number; jumpHeight: number; luck: number } = {
        speed: 0,
        jumpHeight: 0,
        luck: 0,
      }
      const prevArt = currentPlayerData.inventory.find(
        (prevArt) =>
          prevArt.id === currentPlayerData.trials[typeIndex].equippedArtId
      )

      prevArtStat.speed = prevArt?.speed || 0
      prevArtStat.jumpHeight = prevArt?.jumpHeight || 0
      prevArtStat.luck = prevArt?.luck || 0

      if (typeID === "soulArt") {
        newPlayerData.multiplierSpeedFromArts =
          currentPlayerData.multiplierSpeedFromArts -
          (prevArtStat?.speed || 0) +
          (currentArt?.speed || 0)
        newPlayerData.multiplierJumpHeightFromArts =
          currentPlayerData.multiplierJumpHeightFromArts -
          (prevArtStat?.speed || 0) +
          (currentArt?.speed || 0)
      } else if (
        typeID === "strArt" ||
        typeID === "dexArt" ||
        typeID === "luckArt"
      ) {
        newPlayerData.flatSpeedFromArts =
          currentPlayerData.flatSpeedFromArts -
          (prevArtStat?.speed || 0) +
          (currentArt?.speed || 0)

        newPlayerData.flatJumpHeightFromArts =
          currentPlayerData.flatJumpHeightFromArts -
          (prevArtStat?.jumpHeight || 0) +
          (currentArt?.jumpHeight || 0)

        newPlayerData.flatLuckFromArts =
          currentPlayerData.flatLuckFromArts -
          (prevArtStat?.luck || 0) +
          (currentArt?.luck || 0)
      }
    }

    newPlayerData.trials[typeIndex].equippedArtId = currentArt.id
    newPlayerData.trials[typeIndex].name = currentArt.name
    newPlayerData.trials[typeIndex].quality = currentArt.quality
  }
  return newPlayerData
}
