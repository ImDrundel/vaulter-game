"use client"
import { useEffect } from "react"
import styles from "./GameWindow.module.scss"
interface Platform {
  x: number
  y: number
  width: number
  height: number
  leftBorder: number
  rightBorder: number
  topBorder: number
}
export default function GameWindow() {
  useEffect(() => {
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
        x: 50,
        y: canvas.height - 100,
        width: 30,
        height: 100,
        speed: 500,
        gravity: 0,
        jumpHeight: 250,
        jumpSpeed: 4,
      }
      const playerCoords = {
        left: player.x,
        right: player.x + player.width,
        top: player.y,
        bottom: player.y + player.height,
      }

      // const platformSize = {
      //   x: 450,
      //   y: 450,
      //   width: 150,
      //   height: 10,
      // }
      // const platformCoords = {
      //   leftBorder: platformSize.x,
      //   rightBorder: platformSize.x + platformSize.width,
      //   topBorder: platformSize.y,
      //   // bottom: ,
      // }

      const staticPlatforms: Array<Platform> = [
        {
          x: 750,
          y: 400,
          width: 150,
          height: 10,
          get leftBorder() {
            return this.x
          },
          get rightBorder() {
            return this.x + this.width
          },
          get topBorder() {
            return this.y
          },
        },
        {
          x: 650,
          y: 200,
          width: 150,
          height: 10,
          get leftBorder() {
            return this.x
          },
          get rightBorder() {
            return this.x + this.width
          },
          get topBorder() {
            return this.y
          },
        },
        {
          x: 450,
          y: 200,
          width: 150,
          height: 10,
          get leftBorder() {
            return this.x
          },
          get rightBorder() {
            return this.x + this.width
          },
          get topBorder() {
            return this.y
          },
        },
        {
          x: 250,
          y: 550,
          width: 150,
          height: 10,
          get leftBorder() {
            return this.x
          },
          get rightBorder() {
            return this.x + this.width
          },
          get topBorder() {
            return this.y
          },
        },
        {
          x: 450,
          y: 500,
          width: 150,
          height: 10,
          get leftBorder() {
            return this.x
          },
          get rightBorder() {
            return this.x + this.width
          },
          get topBorder() {
            return this.y
          },
        },
      ]

      function drawPlayer(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "green"
        ctx.fillRect(player.x, player.y, player.width, player.height)
      }
      // function drawPlatform() {
      //   ctx!.fillStyle = "#eee"
      //   ctx!.fillRect(
      //     platformSize.x,
      //     platformSize.y,
      //     platformSize.width,
      //     platformSize.height
      //   )
      //   requestAnimationFrame(drawPlatform)
      // }
      function drawStaticPlatform() {
        staticPlatforms.forEach((platform) => {
          ctx!.fillStyle = "#eee"
          ctx!.fillRect(platform.x, platform.y, platform.width, platform.height)
        })

        // requestAnimationFrame(drawAllPlatform)
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
        // console.log(keysHold)
      })
      window.addEventListener("keyup", (e) => {
        keysHold[e.key] = false
        // console.log(keysHold)
      })

      function moving(deltaTime: number) {
        // console.log(deltaTime)
        if (keysHold["a"] && player.x > 0) {
          player.x -= player.speed * deltaTime
        }
        if (keysHold["d"] && player.x < canvas!.width - player.width) {
          player.x += player.speed * deltaTime
        }
        // ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
        // drawPlayer(ctx!)

        // requestAnimationFrame(moving)
        // console.log(player)
        // console.log(playerCoords)
        // console.log(platformCoords)
      }
      // function falling() {
      //   if (
      //     playerCoords.bottom == platformCoords.topBorder &&
      //     ((playerCoords.left > platformCoords.leftBorder &&
      //       playerCoords.left < platformCoords.rightBorder) ||
      //       (playerCoords.left > platformCoords.leftBorder &&
      //         playerCoords.right < platformCoords.rightBorder) ||
      //       (playerCoords.right > platformCoords.leftBorder &&
      //         playerCoords.right < platformCoords.rightBorder))
      //   ) {
      //     player.gravity = 0
      //     onPlatform = true
      //   } else {
      //     player.gravity = 2
      //     onPlatform = false
      //   }

      //   if (player.y <= canvas!.height - 100) {
      //     player.y = player.y + player.gravity
      //   } else {
      //     onPlatform = true
      //   }
      //   drawPlayer(ctx!)
      //   requestAnimationFrame(falling)
      // }
      function falling(deltaTime: number) {
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
          }
        })

        if (player.y <= canvas!.height - player.height) {
          player.y = Math.round(player.y + player.gravity * deltaTime)
          onGround = false
          console.log(player.y)
        } else {
          onGround = true
        }

        if (!onPlatform || !onGround) {
          player.gravity = 500
        }
        // drawPlayer(ctx!)
        // requestAnimationFrame(fallingAll)
      }
      window.addEventListener("keydown", (e) => {
        if (e.key === " " && (onPlatform == true || onGround == true)) {
          // if (player.y > canvas.height - player.jumpHeight - player.y) {
          //   player.y = player.y - player.jumpSpeed
          // }
          player.y = player.y - player.jumpHeight
        }
      })

      function gameLoop(timestamp: number) {
        const deltaTime = (timestamp - lastFrameRate) / 1000
        lastFrameRate = timestamp

        ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
        drawPlayer(ctx!)
        drawStaticPlatform()
        moving(deltaTime)
        falling(deltaTime)
        updatePlayerCoords()
        // console.log(timestamp, deltaTime)
        requestAnimationFrame(gameLoop)
      }

      // Context checking
      if (ctx) {
        requestAnimationFrame(gameLoop)
        // moving()
        // falling()
        // fallingAll()
        // drawPlatform()
        // drawAllPlatform()
        // updatePlayerCoords()

        //Main code end
      } else {
        console.error("2D context not available")
      }
    } else {
      console.error("Canvas element not found...")
    }
  }, [])

  return (
    <div className={styles.container}>
      <canvas id="mainCanvas" className={styles.canvasBox}></canvas>
    </div>
  )
}
