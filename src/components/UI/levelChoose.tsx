import { useState } from "react"
import style from "./levelChoose.module.scss"

interface LevelChooseProps {
  changeLevel(index: number): void
  startEndgameLevel(diff: number): void
}
const LevelChoose: React.FC<LevelChooseProps> = ({
  changeLevel,
  startEndgameLevel,
}) => {
  //New object to levelCount must be increased manually when adding a new level
  //No automation as there are no plans to add more levels
  const levelCount: Array<{ level: number; difficulty: number }> = [
    { level: 1, difficulty: 1 },
    { level: 2, difficulty: 2 },
    { level: 3, difficulty: 3 },
  ]

  function changeDifficulty(count: number) {
    if (count >= 1) setlevelDifficulty(count)
  }
  const [levelDifficulty, setlevelDifficulty] = useState<number>(1)

  return (
    <div className={style.container}>
      <span className={style.levelChooseText}>Choose level:</span>
      <div>
        {levelCount.map((level) => (
          <button
            className={style.levelChooseButton}
            key={level.level}
            onClick={() => changeLevel(level.level - 1)}
          >
            {level.level}
          </button>
        ))}
      </div>

      <div className={style.endgameLevelBox}>
        <div>
          <span>Endgame levels! Choose your difficulty: </span>
          <span>{levelDifficulty}</span>

          <button
            className={style.buttonChangeDiff}
            onClick={() => {
              changeDifficulty(levelDifficulty - 1)
              ;(document.activeElement as HTMLElement)?.blur()
            }}
          >
            -
          </button>

          <button
            className={style.buttonChangeDiff}
            onClick={() => {
              changeDifficulty(levelDifficulty + 1)
              ;(document.activeElement as HTMLElement)?.blur()
            }}
          >
            +
          </button>
        </div>
        <button
          className={style.startButton}
          onClick={() => {
            startEndgameLevel(levelDifficulty)
            ;(document.activeElement as HTMLElement)?.blur()
          }}
        >
          START
        </button>
        <div className={style.diffTipIcon}>
          i
          <span className={style.diffTipText}>
            Increasing the difficulty increases the distance between platforms
            and the chance for a rarer reward at the end
          </span>
        </div>
      </div>
    </div>
  )
}
export default LevelChoose
