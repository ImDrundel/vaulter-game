import style from "./ItemCard.module.scss"
import { Inventory } from "@/src/types/types"
import Image from "next/image"

interface ItemCard {
  item: Inventory
}

const ItemCard: React.FC<ItemCard> = ({ item }) => {
  return (
    <div className={style.container}>
      <Image
        className={`${style.image} ${style.customFrame} ${
          item.quality === "common"
            ? style.common
            : item.quality === "uncommon"
            ? style.uncommon
            : item.quality === "rare"
            ? style.rare
            : item.quality === "epic"
            ? style.epic
            : item.quality === "legendary"
            ? style.legendary
            : style.none
        }`}
        //   onClick={}
        src={`/assets/equipmentImages/${item.id}.png`}
        width={64}
        height={64}
        alt="artImg"
      />
      <span className={style.name}>{item.name}</span>

      <div className={style.statBox}>
        {item.speed && (item.typeID == "strArt" || item.typeID == "dexArt") ? (
          <p className={style.stat}>+{item.speed} speed</p>
        ) : item.typeID == "soulArt" ? (
          <p className={style.stat}>+{item.speed}% speed</p>
        ) : (
          <div className={style.hiddenStat} />
        )}
        {item.jumpHeight &&
        (item.typeID == "strArt" || item.typeID == "dexArt") ? (
          <p className={style.stat}>+{item.jumpHeight} jump height</p>
        ) : item.typeID == "soulArt" ? (
          <p className={style.stat}>+{item.jumpHeight}% jump height</p>
        ) : (
          <div className={style.hiddenStat} />
        )}
        {item.luck ? (
          <p className={style.stat}>+{item.luck}% luck</p>
        ) : (
          <div className={style.hiddenStat} />
        )}
      </div>

      <button
        className={style.disenchant}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <Image
          src={`/assets/equipmentImages/button_disenchant.png`}
          width={32}
          height={32}
          alt="dis icon"
        />
        <div className={style.futureFeatureTag}>
          This feature will be added in the future!
        </div>
      </button>
      <button
        className={style.delete}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <Image
          src={`/assets/equipmentImages/button_delete.png`}
          width={32}
          height={32}
          alt="del icon"
        />
        <div className={style.futureFeatureTag}>
          This feature will be added in the future!
        </div>
      </button>
      <div className={style.count}> x{item.quantity}</div>
    </div>
  )
}

export default ItemCard
