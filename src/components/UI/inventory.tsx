import style from "./inventory.module.scss"
import Image from "next/image"
// imsport artifact_of_soul from "@/public/assets/equipment/artifact_of_soul.json"
// import chest from "@/public/assets/images/texture_chest.png"

import { LocalPlayerData, TrialsData } from "@/src/types/types"
interface InventoryLocalProps {
  temporaryPersonalInfo: LocalPlayerData
}

const Inventory: React.FC<InventoryLocalProps> = ({
  temporaryPersonalInfo,
}) => {
  // console.log(temporaryPersonalInfo)
  // const imageUrl = `/assets/images/${trials.equippedArtId}.png`

  return (
    <div className={style.container}>
      <h1 className={style.inventoryHeader}>
        {temporaryPersonalInfo.nickname}`s Inventory
      </h1>

      {temporaryPersonalInfo.trials.map((trials: TrialsData) => (
        <div key={trials.type} className={style.itemSlot}>
          <div className={style.itemType}>{trials.type}</div>

          <Image
            className={`${style.itemImage} ${style.customFrame} ${
              trials.quality === "common"
                ? style.common
                : trials.quality === "uncommon"
                ? style.uncommon
                : trials.quality === "rare"
                ? style.rare
                : trials.quality === "epic"
                ? style.epic
                : trials.quality === "legendary"
                ? style.legendary
                : style.none
            }`}
            //   onClick={}
            src={
              trials.isTrialComplete == true
                ? trials.equippedArtId !== "none"
                  ? `/assets/equipmentImages/${trials.equippedArtId}.png`
                  : `/assets/equipmentImages/default.png`
                : `/assets/equipmentImages/block.png`
            }
            width={64}
            height={64}
            alt="artImg"
          />
          <div className={style.itemDropList}>
            <span className={style.itemName}>
              {trials.equippedArtId == "none"
                ? "No equppied item"
                : trials.name}
            </span>
          </div>
        </div>
      ))}

      <div className={style.characterStatsBox}>
        <p className={style.characterStatsHeader}>Character stats:</p>

        <p>
          Speed:
          {Math.round(
            (100 + temporaryPersonalInfo.flatSpeedFromArts) *
              (1 + temporaryPersonalInfo.multiplierSpeedFromArts / 100)
          )}
          %
        </p>

        <p>
          Jump height:
          {Math.round(
            (100 + temporaryPersonalInfo.flatJumpHeightFromArts) *
              (1 + temporaryPersonalInfo.multiplierJumpHeightFromArts / 100)
          )}
          %
        </p>
      </div>
    </div>
  )
}
export default Inventory
