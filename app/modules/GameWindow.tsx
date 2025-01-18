"use client"
import { useEffect, useState } from "react"
import styles from "./GameWindow.module.scss"
import level_01 from "@/public/level_01.json"
import level_02 from "@/public/level_02.json"
import level_03 from "@/public/level_03.json"

interface Wall {
  x: number
  y: number
  width: number
  height: number
  leftBorder: number
  rightBorder: number
  topBorder: number
}
interface Platform {
  x: number
  y: number
  width: number
  height: number
}
// let currentLevel: number = 0

export default function GameWindow() {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [reset, setReset] = useState(false)
  // let currentLevel = 1
  function changeLevel(level: number) {
    setCurrentLevel(level)
    // console.log("change", currentLevel)
    // localStorage.set("currentLevel", currentLevel)
  }

  // const isResetPressed = { pressed: false }
  window.addEventListener("keydown", (e) => {
    if (e.key === "r") {
      // isResetPressed.pressed = true
      setReset(true)
    }
  })
  window.addEventListener("keyup", (e) => {
    if (e.key === "r") {
      // isResetPressed.pressed = false
      setReset(false)
    }
  })

  useEffect(() => {
    const levelChoose = [level_01, level_02, level_03]
    const canvas = document.getElementById(
      "mainCanvas"
    ) as HTMLCanvasElement | null
    if (canvas) {
      //Main code start
      let onPlatform: boolean = false
      let onGround: boolean = true
      let lastFrameRate: number = 0

      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d")
      canvas.height = canvas.clientHeight
      canvas.width = canvas.clientWidth

      const player = {
        x: canvas.width / 2,
        y: canvas.height - 100,
        width: 37,
        height: 100,
        speed: 400,
        gravity: 0,
        jumpHeight: 3,
        jumpSpeed: 100,
      }
      const playerCoords = {
        left: player.x,
        right: player.x + player.width,
        top: player.y,
        bottom: player.y + player.height,
      }

      const levelBoundaryWall: Array<Wall> = [
        {
          x: 620,
          y: 0,
          width: 10,
          height: 1000,
          leftBorder: 620,
          rightBorder: 630,
          topBorder: 0,
        },
        {
          x: 4630,
          y: 0,
          width: 10,
          height: 1000,
          leftBorder: 4630,
          rightBorder: 4640,
          topBorder: 0,
        },
      ]
      const levelBoundary = {
        leftBorder: levelBoundaryWall[0].rightBorder,
        rightBorder: levelBoundaryWall[1].leftBorder,
      }

      const blankStaticPlatforms: Array<Platform> = levelChoose[currentLevel]
      const staticPlatforms = blankStaticPlatforms.map((object) => {
        return {
          x: object.x,
          y: object.y,
          width: object.width,
          height: object.height,
          leftBorder: object.x,
          rightBorder: object.x + object.width,
          topBorder: object.y,
        }
      })

      const character = new Image()
      character.src = "/character.png"
      function drawPlayer(ctx: CanvasRenderingContext2D) {
        // ctx.fillStyle = "green"
        // ctx.fillRect(player.x, player.y, player.width, player.height)
        ctx!.drawImage(
          character,
          0,
          0,
          player.width,
          player.height,
          player.x,
          player.y,
          player.width,
          player.height
        )
      }

      const platformSprite = new Image()
      platformSprite.src = "/rock.avif"
      function drawStaticPlatform() {
        staticPlatforms.forEach((platform) => {
          // ctx!.fillStyle = "#eee"
          // ctx!.fillRect(platform.x, platform.y, platform.width, platform.height)

          ctx!.drawImage(
            platformSprite,
            platform.width,
            platform.width / 2,
            platform.width,
            platform.height,
            platform.x,
            platform.y,
            platform.width,
            platform.height
          )
        })
      }

      const wallSprite = new Image()
      wallSprite.src = "/castle_wall_texture.jpg"
      function drawLevelBoundaryWall() {
        levelBoundaryWall.forEach((wall) => {
          // ctx!.fillStyle = "#eee"
          // ctx!.fillRect(platform.x, platform.y, platform.width, platform.height)
          ctx!.drawImage(
            wallSprite,
            0,
            0,
            wall.width,
            wall.height / 2,
            wall.x,
            wall.y,
            wall.width,
            wall.height
          )
        })
      }

      const chest = new Image()
      chest.src = "/chest.png"
      function drawChest() {
        ctx!.drawImage(
          chest,
          0,
          0,
          50,
          32,
          staticPlatforms[staticPlatforms.length - 1].rightBorder - 50,
          staticPlatforms[staticPlatforms.length - 1].topBorder - 32,
          50,
          32
        )
      }

      function updatePlayerCoords() {
        playerCoords.left = player.x
        playerCoords.right = player.x + player.width
        playerCoords.top = player.y
        playerCoords.bottom = player.y + player.height
        // requestAnimationFrame(updatePlayerCoords)
      }

      //Controls
      const keysHold: { [key: string]: boolean } = {}

      window.addEventListener("keydown", (e) => {
        keysHold[e.key] = true
      })
      window.addEventListener("keyup", (e) => {
        keysHold[e.key] = false
        // console.log(keysHold)
      })

      function moving(deltaTime: number) {
        // if (keysHold["a"] && player.x > 0) {
        //   player.x -= player.speed * deltaTime
        // }
        // if (keysHold["d"] && player.x < canvas!.width - player.width) {
        //   player.x += player.speed * deltaTime
        // }

        if (keysHold["a"] && player.x >= levelBoundary.leftBorder) {
          staticPlatforms.map((platform) => {
            platform.x += player.speed * deltaTime
            platform.leftBorder += player.speed * deltaTime
            platform.rightBorder += player.speed * deltaTime
          })
          levelBoundaryWall.map((platform) => {
            platform.x += player.speed * deltaTime
          })
          levelBoundary.leftBorder += player.speed * deltaTime
          levelBoundary.rightBorder += player.speed * deltaTime
          // player.x -= player.speed * deltaTime
        }
        if (
          keysHold["d"] &&
          player.x + player.width <= levelBoundary.rightBorder
        ) {
          staticPlatforms.map((platform) => {
            platform.x -= player.speed * deltaTime
            platform.leftBorder -= player.speed * deltaTime
            platform.rightBorder -= player.speed * deltaTime
          })
          levelBoundaryWall.map((platform) => {
            platform.x -= player.speed * deltaTime
          })
          levelBoundary.leftBorder -= player.speed * deltaTime
          levelBoundary.rightBorder -= player.speed * deltaTime
          // player.x += player.speed * deltaTime
        }
      }

      function falling(deltaTime: number) {
        // falling + "onPlatform" check
        onPlatform = false
        staticPlatforms.forEach((platform) => {
          if (
            playerCoords.bottom >= platform.topBorder &&
            playerCoords.bottom <=
              platform.topBorder + player.gravity * deltaTime &&
            ((playerCoords.left > platform.leftBorder &&
              playerCoords.left < platform.rightBorder) ||
              (playerCoords.left > platform.leftBorder &&
                playerCoords.right < platform.rightBorder) ||
              (playerCoords.right > platform.leftBorder &&
                playerCoords.right < platform.rightBorder))
          ) {
            player.gravity = 0
            onPlatform = true
            player.y = platform.topBorder - player.height + 1
          }
        })

        if (player.y <= canvas!.height - player.height) {
          player.y = Math.round(player.y + player.gravity * deltaTime)
          onGround = false
          // console.log(player.y)
        } else {
          onGround = true
        }

        if (!onPlatform || !onGround) {
          player.gravity = 500
        }
      }

      //jump
      window.addEventListener("keydown", (e) => {
        if (e.key === " " && (onPlatform == true || onGround == true)) {
          const jumping = setInterval(() => {
            player.gravity = 0
            player.y = player.y - player.jumpHeight
          }, 1)
          setTimeout(() => {
            clearInterval(jumping)
          }, 250)
        }
      })

      //move character to start

      function gameLoop(timestamp: number) {
        const deltaTime = (timestamp - lastFrameRate) / 1000
        lastFrameRate = timestamp

        ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
        drawPlayer(ctx!)

        drawStaticPlatform()

        drawLevelBoundaryWall()
        drawChest()
        moving(deltaTime)
        falling(deltaTime)

        updatePlayerCoords()
        requestAnimationFrame(gameLoop)
        // console.log(playerCoords.left, playerCoords.bottom)
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
