import { LocalPlayerData, TrialsData } from "@/src/types/types"
import style from "./InventoryItemChoose.module.scss"
import { equippingStrArt } from "@/src/modules/inventory/equippingItems"
import { Dispatch, SetStateAction } from "react"
import ItemCard from "./ItemCard"
// import { useState } from "react"

interface InventoryItemChoose {
  //   temporaryPersonalInfo: LocalPlayerData
  trials: TrialsData
  playerData: LocalPlayerData
  setPlayerData: Dispatch<SetStateAction<LocalPlayerData>>
  setTemporaryPersonalInfo: Dispatch<SetStateAction<LocalPlayerData>>
}
const InventoryItemChoose: React.FC<InventoryItemChoose> = ({
  //   temporaryPersonalInfo,
  trials,
  playerData,
  setPlayerData,
  setTemporaryPersonalInfo,
}) => {
  function equippingArtUIUpdate(
    playerData: LocalPlayerData,

    equippingArt: (
      localPlayerData: LocalPlayerData,
      artIndex: number
      // setTemporaryPersonalInfo: Dispatch<SetStateAction<LocalPlayerData>>
    ) => LocalPlayerData,

    artIndex: number
  ) {
    // console.log(playerData)
    const updated = JSON.parse(JSON.stringify(playerData))
    const newPersonalData = equippingArt(updated, artIndex)
    setTemporaryPersonalInfo(newPersonalData)
    setPlayerData(newPersonalData)
    // console.log(temporaryPersonalInfo)
  }

  return (
    <div className={style.itemDropListBox}>
      <span className={style.itemName}>
        {trials.equippedArtId == "none" ? "No equppied item" : trials.name}
      </span>

      {trials.typeID == "strArt" ? (
        <div className={style[`${trials.typeID}DropList`]}>
          <div className={style.hiddenDropList}>
            {playerData.inventory.map((item) =>
              item.typeID == "strArt" && item.quantity > 0 ? (
                <div
                  key={item.id}
                  className={style.singlItemInInventory}
                  onClick={() => {
                    equippingArtUIUpdate(playerData, equippingStrArt, 4)
                  }}
                >
                  <ItemCard item={item} />
                </div>
              ) : (
                <div key={item.id} className={style.hiddenDueToWrongType} />
              )
            )}
          </div>
        </div>
      ) : //
      //
      //
      // dex art
      trials.typeID == "dexArt" ? (
        <div className={`style.${trials.typeID}DropList`}>
          <div className={style.hiddenDropList}>
            {playerData.inventory.map((item) =>
              item.typeID == "dexArt" && item.quantity > 0 ? (
                <div
                  key={item.id}
                  className={style.singlItemInInventory}
                  onClick={() => {
                    equippingArtUIUpdate(playerData, equippingStrArt, 4)
                  }}
                >
                  <ItemCard item={item} />
                </div>
              ) : (
                <div key={item.id} className={style.hiddenDueToWrongType} />
              )
            )}
          </div>
        </div>
      ) : //
      //
      //
      // soul art
      trials.typeID == "soulArt" ? (
        <div className={`style.${trials.typeID}DropList`}>
          <div className={style.hiddenDropList}>
            {playerData.inventory.map((item) =>
              item.typeID == "soulArt" && item.quantity > 0 ? (
                <div
                  key={item.id}
                  className={style.singlItemInInventory}
                  onClick={() => {
                    equippingArtUIUpdate(playerData, equippingStrArt, 4)
                  }}
                >
                  <ItemCard item={item} />
                </div>
              ) : (
                <div key={item.id} className={style.hiddenDueToWrongType} />
              )
            )}
          </div>
        </div>
      ) : //
      //
      //
      // luck art
      trials.typeID == "luckArt" ? (
        <div className={`style.${trials.typeID}DropList`}>
          <div className={style.hiddenDropList}>
            {playerData.inventory.map((item) =>
              item.typeID == "luckArt" && item.quantity > 0 ? (
                <div
                  key={item.id}
                  className={style.singlItemInInventory}
                  onClick={() => {
                    equippingArtUIUpdate(playerData, equippingStrArt, 4)
                  }}
                >
                  <ItemCard item={item} />
                </div>
              ) : (
                <div key={item.id} className={style.hiddenDueToWrongType} />
              )
            )}
          </div>
        </div>
      ) : (
        <div className={`style.errorDropList`}> error</div>
      )}
    </div>
  )
}

export default InventoryItemChoose
