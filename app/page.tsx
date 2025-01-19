import styles from "./page.module.scss"
import GameWindow from "./modules/GameWindow/GameWindow"

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.gameWindow}>
        <GameWindow />
      </div>
    </div>
  )
}
