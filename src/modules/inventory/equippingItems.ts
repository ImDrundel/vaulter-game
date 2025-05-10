import { LocalPlayerData } from "@/src/types/types"
// import artifact_of_dexterity from "@/public/assets/equipment/artifact_of_dexterity.json"
// import artifact_of_soul from "@/public/assets/equipment/artifact_of_dexterity.json"
import artifact_of_strength from "@/public/assets/equipment/artifact_of_dexterity.json"
// import playerData from "@/src/modules/game/playerPersonalInfo/playerPersonalInfo.json"
// import god_fragment from "@/public/assets/equipment/god_fragment.json"

// export function equipStrArt( artIndex: number) {
//   if (playerData[0].isStrTrialComplete) {
//     if (playerData[0].equippedStrArt == "none") {
//       playerData[0].flatSpeedFromArts =
//         playerData[0].flatSpeedFromArts + artifact_of_strength[artIndex].speed

//       playerData[0].flatJumpHeightFromArts =
//         playerData[0].flatJumpHeightFromArts +
//         artifact_of_strength[artIndex].jumpHeight
//     } else {
//       const prevArtStat: { speed: number; jumpHeight: number } = {
//         speed: 0,
//         jumpHeight: 0,
//       }

//       artifact_of_strength.forEach((art) => {
//         if (art.name == playerData[0].equippedStrArt) {
//           prevArtStat.speed = art.speed
//           prevArtStat.jumpHeight = art.jumpHeight
//         }
//       })

//       playerData[0].flatSpeedFromArts =
//         playerData[0].flatSpeedFromArts -
//         prevArtStat.speed +
//         artifact_of_strength[artIndex].speed

//       playerData[0].flatJumpHeightFromArts =
//         playerData[0].flatJumpHeightFromArts -
//         prevArtStat.jumpHeight +
//         artifact_of_strength[artIndex].jumpHeight
//     }
//   }
// }
export function equipStrArt(
  localPlayerData: LocalPlayerData,
  artIndex: number
) {
  if (localPlayerData.trials[0].isTrialComplete) {
    if (localPlayerData.trials[0].equippedArtId == "none") {
      localPlayerData.flatSpeedFromArts =
        localPlayerData.flatSpeedFromArts + artifact_of_strength[artIndex].speed

      localPlayerData.flatJumpHeightFromArts =
        localPlayerData.flatJumpHeightFromArts +
        artifact_of_strength[artIndex].jumpHeight
    } else {
      const prevArtStat: { speed: number; jumpHeight: number } = {
        speed: 0,
        jumpHeight: 0,
      }

      artifact_of_strength.forEach((art) => {
        if (art.name == localPlayerData.trials[0].equippedArtId) {
          prevArtStat.speed = art.speed
          prevArtStat.jumpHeight = art.jumpHeight
        }
      })

      localPlayerData.flatSpeedFromArts =
        localPlayerData.flatSpeedFromArts -
        prevArtStat.speed +
        artifact_of_strength[artIndex].speed

      localPlayerData.flatJumpHeightFromArts =
        localPlayerData.flatJumpHeightFromArts -
        prevArtStat.jumpHeight +
        artifact_of_strength[artIndex].jumpHeight
    }
  }
}
