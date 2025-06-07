import { LocalPlayerData } from "@/src/types/types"
import { Dispatch, SetStateAction } from "react"

export function unlockArtSlot(
  temporaryPersonalInfo: LocalPlayerData,
  setTemporaryPersonalInfo: Dispatch<SetStateAction<LocalPlayerData>>,
  currentLevel: number,
  onLastPlatform: boolean
) {
  if (
    temporaryPersonalInfo.trials[currentLevel].isTrialComplete == false &&
    onLastPlatform == true
  ) {
    const updated = JSON.parse(JSON.stringify(temporaryPersonalInfo))
    updated.trials[currentLevel].isTrialComplete = true
    setTemporaryPersonalInfo(updated)
  }
}
