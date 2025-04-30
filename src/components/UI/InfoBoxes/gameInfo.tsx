import { useState } from "react"
import style from "./gameInfo.module.scss"
import Image from "next/image"
import rule_icon from "./rule_icon.png"
import info_icon from "./info_icon.png"

export default function GameInfo() {
  const keyFunctions = [
    { key: "A", function: "Move left" },
    { key: "D", function: "Move right" },
    { key: "Space", function: "Jump" },
    { key: "R", function: "Reset level" },
  ]
  const [keyFunction, setKeyFunction] = useState({
    isRulesOpen: false,
    // isCollectionsOpen: false,
    isInfoOpen: false,
  })

  function changeRulesStatus() {
    if (keyFunction.isRulesOpen) {
      setKeyFunction((prevState) => ({ ...prevState, isRulesOpen: false }))
    } else {
      setKeyFunction((prevState) => ({ ...prevState, isRulesOpen: true }))
    }
  }
  function changeInfoStatus() {
    if (keyFunction.isInfoOpen) {
      setKeyFunction((prevState) => ({ ...prevState, isInfoOpen: false }))
    } else {
      setKeyFunction((prevState) => ({ ...prevState, isInfoOpen: true }))
    }
  }
  //future feature
  // function changeCollectionStatus() {
  //   if (keyFunction.isRulesOpen) {
  //     setKeyFunction((prevState) => ({ ...prevState, isRulesOpen: false }))
  //   } else {
  //     setKeyFunction((prevState) => ({ ...prevState, isRulesOpen: true }))
  //   }
  // }

  return (
    <div className={style.container}>
      <div>
        <Image
          className={style.ruleIcon}
          onClick={changeRulesStatus}
          src={rule_icon}
          width={70}
          height={80}
          alt="rule icon"
        />
      </div>
      <div
        className={keyFunction.isRulesOpen ? style.rulesClose : style.rulesOpen}
      >
        {keyFunctions.map((object) => (
          <div key={object.key} className={style.keyFunctionBox}>
            <div className={style.keyIcon}>{object.key}</div>
            <span className={style.keyDescription}>- {object.function}</span>
          </div>
        ))}
      </div>
      <div>
        <Image
          className={style.infoIcon}
          onClick={changeInfoStatus}
          src={info_icon}
          width={70}
          height={70}
          alt="info icon"
        />
      </div>
      <div
        className={keyFunction.isInfoOpen ? style.infoClose : style.infoOpen}
      >
        Thanks for playing my game! <br />
        Any feedback you can send for: <br /> vaultergame@andcher.com
      </div>
    </div>
  )
}
