import style from "./Inventory.module.scss"
import Image from "next/image"
// imsport artifact_of_soul from "@/public/assets/equipment/artifact_of_soul.json"
// import chest from "@/public/assets/images/texture_chest.png"
// import { equippingStrArt } from "@/src/modules/inventory/equippingItems"

import { LocalPlayerData, TrialsData } from "@/src/types/types"
import InventoryItemChoose from "./InventoryItemChoose"
import { Dispatch, SetStateAction, useState } from "react"
// import { useState } from "react"
interface InventoryLocalProps {
  temporaryPersonalInfo: LocalPlayerData
  setTemporaryPersonalInfo: Dispatch<SetStateAction<LocalPlayerData>>
}

const Inventory: React.FC<InventoryLocalProps> = ({
  temporaryPersonalInfo,
  setTemporaryPersonalInfo,
}) => {
  const [playerData, setPlayerData] = useState<LocalPlayerData>(
    temporaryPersonalInfo
  )
  //console.log(temporaryPersonalInfo)
  // const imageUrl = `/assets/images/${trials.equippedArtId}.png`
  // equippingStrArtUIUpdate(playerData, equippingStrArt, 1)
  return (
    <div className={style.container}>
      <h1 className={style.inventoryHeader}>
        {temporaryPersonalInfo.nickname}`s Inventory
      </h1>

      {temporaryPersonalInfo.trials.map((trials: TrialsData) => (
        <div key={trials.typeID} className={style.itemSlot}>
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
          <InventoryItemChoose
            // temporaryPersonalInfo={temporaryPersonalInfo}
            trials={trials}
            playerData={playerData}
            setPlayerData={setPlayerData}
            setTemporaryPersonalInfo={setTemporaryPersonalInfo}
          />
          {/* <div
            className={style.itemDropListBox}
            onClick={() => {
              equippingStrArtUIUpdate(playerData, equippingStrArt, 2)
            }}
          >
            <span className={style.itemName}>
              {trials.equippedArtId == "none"
                ? "No equppied item"
                : trials.name}
            </span>

            <div className={`style.${trials.typeID}DropList`}></div>
          </div> */}
        </div>
      ))}

      <div className={style.characterStatsBox}>
        <p className={style.characterStatsHeader}>Character stats:</p>

        <p>
          Speed:
          {Math.round(
            (100 + playerData.flatSpeedFromArts) *
              (1 + playerData.multiplierSpeedFromArts / 100)
          )}
          %
        </p>

        <p>
          Jump height:
          {Math.round(
            (100 + playerData.flatJumpHeightFromArts) *
              (1 + playerData.multiplierJumpHeightFromArts / 100)
          )}
          %
        </p>
        <p>
          Luck:
          {Math.round(100 + playerData.flatLuckFromArts)}%
        </p>
      </div>
    </div>
  )
}
export default Inventory
