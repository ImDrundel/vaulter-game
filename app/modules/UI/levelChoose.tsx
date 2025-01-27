import style from "./levelChoose.module.scss"

interface LevelChooseProps {
  changeLevel(index: number): void
}
const LevelChoose: React.FC<LevelChooseProps> = ({ changeLevel }) => {
  //levelCount must be increased manually when adding a new level
  const levelCount: Array<{ level: number; difficulty: number }> = [
    { level: 1, difficulty: 1 },
    { level: 2, difficulty: 2 },
    { level: 3, difficulty: 3 },
  ]

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
    </div>
  )
}
export default LevelChoose
