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
        jumpHeight: 200,
        jumpSpeed: 4,
      }
      const playerCoords = {
        left: player.x,
        right: player.x + player.width,
        top: player.y,
        bottom: player.y + player.height,
      }
      const platform = {
        x: 450,
        y: 450,
        width: 150,
        height: 10,
      }
      const platformCoords = {
        left: platform.x,
        right: platform.x + platform.width,
        top: platform.y,
        // bottom: ,
      }
      // let onPlatform = false
      const keysHold: { [key: string]: boolean } = {}

      function drawPlayer(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "green"
        ctx.fillRect(player.x, player.y, player.width, player.height)
      }
      function drawPlatform() {
        ctx!.fillStyle = "#eee"
        ctx!.fillRect(platform.x, platform.y, platform.width, platform.height)
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
          playerCoords.bottom == platformCoords.top &&
          ((playerCoords.left > platformCoords.left &&
            playerCoords.left < platformCoords.right) ||
            (playerCoords.left > platformCoords.left &&
              playerCoords.right < platformCoords.right) ||
            (playerCoords.right > platformCoords.left &&
              playerCoords.right < platformCoords.right))
        ) {
          // onPlatform = true
          player.gravity = 0
        } else {
          // onPlatform = false
          player.gravity = 2
        }

        if (player.y <= canvas!.height - 100) {
          player.y = player.y + player.gravity
        }
        //ввести преременную "на плвтформе!"
        drawPlayer(ctx!)
        requestAnimationFrame(falling)
      }

      //Controls
      window.addEventListener("keydown", (e) => {
        if (e.key === " ") {
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
      console.error("Canvas element not found///")
    }
  }, [])

  return (
    <div className={styles.container}>
      <canvas id="mainCanvas" className={styles.canvasBox}></canvas>
    </div>
  )
}
