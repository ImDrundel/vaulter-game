"use client"
import { useEffect } from "react"
import styles from "./GameWindow.module.scss"
// interface Keys{

// }
export default function GameWindow() {
  useEffect(() => {
    const canvas = document.getElementById(
      "mainCanvas"
    ) as HTMLCanvasElement | null
    if (canvas) {
      //Main code start
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d")
      canvas.height = canvas.clientHeight
      canvas.width = canvas.clientWidth

      const player = {
        x: 50,
        y: canvas.height - 100,
        width: 30,
        height: 100,
        speed: 3,
        gravity: 2,
        jumpHeight: 400,
        jumpSpeed: 4,
      }
      const playerCoords = {
        left: player.x,
        right: player.x + player.width,
        top: player.y,
        bottom: player.y + player.height,
      }
      const platformSize = {
        x: 450,
        y: 450,
        width: 150,
        height: 10,
      }
      const platformCoords = {
        leftBorder: platformSize.x,
        rightBorder: platformSize.x + platformSize.width,
        topBorder: platformSize.y,
        // bottom: ,
      }
      let onPlatform = false
      const keysHold: { [key: string]: boolean } = {}

      function drawPlayer(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "green"
        ctx.fillRect(player.x, player.y, player.width, player.height)
      }
      function drawPlatform() {
        ctx!.fillStyle = "#eee"
        ctx!.fillRect(
          platformSize.x,
          platformSize.y,
          platformSize.width,
          platformSize.height
        )
        requestAnimationFrame(drawPlatform)
      }
      function updatePlayerCoords() {
        playerCoords.left = player.x
        playerCoords.right = player.x + player.width
        playerCoords.top = player.y
        playerCoords.bottom = player.y + player.height
        requestAnimationFrame(updatePlayerCoords)
      }

      window.addEventListener("keydown", (e) => {
        keysHold[e.key] = true
        // console.log(keysHold)
      })
      window.addEventListener("keyup", (e) => {
        keysHold[e.key] = false
        // console.log(keysHold)
      })

      function moving() {
        if (keysHold["a"] && player.x > 0) {
          player.x -= player.speed
        }
        if (keysHold["d"] && player.x < canvas!.width - player.width) {
          player.x += player.speed
        }

        ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
        drawPlayer(ctx!)

        requestAnimationFrame(moving)
        // console.log(player)
        // console.log(playerCoords)
        // console.log(platformCoords)
      }
      function falling() {
        if (
          playerCoords.bottom == platformCoords.topBorder &&
          ((playerCoords.left > platformCoords.leftBorder &&
            playerCoords.left < platformCoords.rightBorder) ||
            (playerCoords.left > platformCoords.leftBorder &&
              playerCoords.right < platformCoords.rightBorder) ||
            (playerCoords.right > platformCoords.leftBorder &&
              playerCoords.right < platformCoords.rightBorder))
        ) {
          player.gravity = 0
          onPlatform = true
        } else {
          player.gravity = 2
          onPlatform = false
        }

        if (player.y <= canvas!.height - 100) {
          player.y = player.y + player.gravity
        } else {
          onPlatform = true
        }
        drawPlayer(ctx!)
        requestAnimationFrame(falling)
      }

      //Controls
      window.addEventListener("keydown", (e) => {
        if (e.key === " " && onPlatform == true) {
          // if (player.y > canvas.height - player.jumpHeight - player.y) {
          //   player.y = player.y - player.jumpSpeed
          // }
          player.y = player.y - player.jumpHeight
        }
      })
      if (ctx) {
        moving()
        falling()
        drawPlatform()
        updatePlayerCoords()

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
