"use client"
import { useEffect, useState } from "react"
import styles from "./GameWindow.module.scss"
import levelBoundaryWallJSON from "@/public/levelBoundaryWall.json"
import level_01 from "@/public/levels/level_01.json"
import level_02 from "@/public/levels/level_02.json"
import level_03 from "@/public/levels/level_03.json"
import { moving } from "./moving"
import { falling } from "./falling"
import {
  Platform,
  Player,
  PlatformJSON,
  Wall,
  OnSurface,
  PlayerCoords,
  LevelBoundary,
} from "./types"
import {
  drawPlayer,
  drawStaticPlatform,
  drawLevelBoundaryWall,
  drawChest,
} from "./draws"

export default function GameWindow() {
  const [currentLevel, setCurrentLevel] = useState<number>(0)
  function changeLevel(level: number) {
    setCurrentLevel(level)
  }

  const [reset, setReset] = useState<boolean>(false)
  window.addEventListener("keydown", (e) => {
    if (e.code === "KeyR") {
      setReset(true)
    }
  })
  window.addEventListener("keyup", (e) => {
    if (e.code === "KeyR") {
      setReset(false)
    }
  })

  useEffect(() => {
    const onSurface: OnSurface = {
      onPlatform: false,
      onGround: true,
    }
    const levelChoose = [level_01, level_02, level_03]
    const canvas = document.getElementById(
      "mainCanvas"
    ) as HTMLCanvasElement | null
    if (canvas) {
      //Main code start
      let lastFrameRate: number = 0

      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d")
      canvas.height = canvas.clientHeight
      canvas.width = canvas.clientWidth

      const player: Player = {
        x: canvas.width / 2,
        y: canvas.height - 110,
        width: 37,
        height: 100,
        speed: 400,
        gravity: 0,
        jumpHeight: 3,
        jumpSpeed: 100,
      }
      const playerCoords: PlayerCoords = {
        left: player.x,
        right: player.x + player.width,
        top: player.y,
        bottom: player.y + player.height,
      }

      const levelBoundaryWall: Array<Wall> = levelBoundaryWallJSON.map(
        (object) => {
          return {
            ...object,
          }
        }
      )
      const levelBoundary: LevelBoundary = {
        leftBorder: levelBoundaryWall[0].rightBorder,
        rightBorder: levelBoundaryWall[1].leftBorder,
      }

      const blankStaticPlatforms: Array<PlatformJSON> =
        levelChoose[currentLevel]
      const staticPlatforms: Array<Platform> = blankStaticPlatforms.map(
        (object) => {
          return {
            ...object,
            leftBorder: object.x,
            rightBorder: object.x + object.width,
            topBorder: object.y,
          }
        }
      )

      function updatePlayerCoords() {
        playerCoords.left = player.x
        playerCoords.right = player.x + player.width
        playerCoords.top = player.y
        playerCoords.bottom = player.y + player.height
      }

      //controls
      const keysHold: { [code: string]: boolean } = {}
      window.addEventListener("keydown", (e) => {
        keysHold[e.code] = true
      })
      window.addEventListener("keyup", (e) => {
        keysHold[e.code] = false
      })

      //jumping
      window.addEventListener("keydown", (e) => {
        if (
          e.code === "Space" &&
          ((onSurface.onPlatform as boolean) == true ||
            onSurface.onGround == true)
          //onSurface.onPlatform & onGround check occurs in the 'falling' function in the 'falling.ts' file
        ) {
          const jumping = setInterval(() => {
            player.gravity = 0
            player.y = player.y - player.jumpHeight
          }, 1)
          setTimeout(() => {
            clearInterval(jumping)
          }, 250)
        }
      })

      function gameLoop(timestamp: number) {
        const deltaTime = (timestamp - lastFrameRate) / 1000
        lastFrameRate = timestamp
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

        drawPlayer(ctx!, player)
        drawStaticPlatform(staticPlatforms, ctx)
        drawLevelBoundaryWall(levelBoundaryWall, ctx)
        drawChest(staticPlatforms, ctx)
        moving(
          deltaTime,
          levelBoundary,
          levelBoundaryWall,
          keysHold,
          player,
          staticPlatforms
        )
        falling(
          deltaTime,
          staticPlatforms,
          playerCoords,
          player,
          canvas,
          onSurface
        )
        updatePlayerCoords()
        requestAnimationFrame(gameLoop)
      }

      //Main code end

      // Context checking
      if (ctx) {
        requestAnimationFrame(gameLoop)
      } else {
        console.error("2D context not available")
      }
    } else {
      console.error("Canvas element not found...")
    }
  }, [currentLevel, reset])

  return (
    <div className={styles.container}>
      <div className={styles.levelChooseBox}>
        <span className={styles.levelChooseText}>Choose level: </span>
        <button
          className={styles.levelChooseButton}
          onClick={() => changeLevel(0)}
        >
          1
        </button>
        <button
          className={styles.levelChooseButton}
          onClick={() => changeLevel(1)}
        >
          2
        </button>
        <button
          className={styles.levelChooseButton}
          onClick={() => changeLevel(2)}
        >
          3
        </button>
      </div>
      <canvas id="mainCanvas" className={styles.canvasBox}></canvas>
    </div>
  )
}
