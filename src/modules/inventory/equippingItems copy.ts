import { LocalPlayerData } from "@/src/types/types"
// import artifact_of_dexterity from "@/public/assets/equipment/artifact_of_dexterity.json"
// import artifact_of_soul from "@/public/assets/equipment/artifact_of_dexterity.json"
import artifact_of_strength from "@/public/assets/equipment/artifact_of_strength.json"
// import { Dispatch, SetStateAction } from "react"
// import playerData from "@/src/modules/game/playerPersonalInfo/playerPersonalInfo.json"
// import god_fragment from "@/public/assets/equipment/god_fragment.json"

export function equippingStrArt(
  currentPlayerData: LocalPlayerData,
  artIndex: number
  // setTemporaryPersonalInfo: Dispatch<SetStateAction<LocalPlayerData>>
) {
  const newPlayerData = JSON.parse(JSON.stringify(currentPlayerData))

  if (currentPlayerData.trials[0].isTrialComplete) {
    if (currentPlayerData.trials[0].equippedArtId == "none") {
      newPlayerData.flatSpeedFromArts =
        currentPlayerData.flatSpeedFromArts +
        artifact_of_strength[artIndex].speed

      newPlayerData.flatJumpHeightFromArts =
        currentPlayerData.flatJumpHeightFromArts +
        artifact_of_strength[artIndex].jumpHeight
    } else {
      const currentArtStat: { speed: number; jumpHeight: number } = {
        speed: 0,
        jumpHeight: 0,
      }

      artifact_of_strength.forEach((art) => {
        if (art.id === currentPlayerData.trials[0].equippedArtId) {
          currentArtStat.speed = art.speed
          currentArtStat.jumpHeight = art.jumpHeight
        }
      })

      newPlayerData.flatSpeedFromArts =
        currentPlayerData.flatSpeedFromArts -
        currentArtStat.speed +
        artifact_of_strength[artIndex].speed

      newPlayerData.flatJumpHeightFromArts =
        currentPlayerData.flatJumpHeightFromArts -
        currentArtStat.jumpHeight +
        artifact_of_strength[artIndex].jumpHeight
    }
    newPlayerData.trials[0].equippedArtId = artifact_of_strength[artIndex].id
    newPlayerData.trials[0].name = artifact_of_strength[artIndex].name
    newPlayerData.trials[0].quality = artifact_of_strength[artIndex].quality
  }
  return newPlayerData
}
