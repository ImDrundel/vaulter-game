"use client"
import { useEffect, useMemo, useState } from "react"
import style from "./GameWindow.module.scss"
import levelBoundaryWallJSON from "@/public/levelBoundaryWall.json"
import level_01 from "@/public/levels/level_01.json"
import level_02 from "@/public/levels/level_02.json"
import level_03 from "@/public/levels/level_03.json"
import { moving } from "./moving"
import { falling } from "./falling"
import { generateEndgameLevel } from "./generateEndgame"
import {
  Platform,
  CharacterParam,
  PlatformJSON,
  Wall,
  OnSurface,
  CharacterCoords,
  LevelBoundary,
} from "./types"
import {
  drawCharacter,
  drawStaticPlatform,
  drawLevelBoundaryWall,
  drawChest,
} from "./draws"
import LevelChoose from "../UI/levelChoose"
import GameInfo from "../InfoBoxes/gameInfo"

export default function GameWindow() {
  const [currentLevel, setCurrentLevel] = useState<number>(0)
  function changeLevel(level: number) {
    setCurrentLevel(level)
  }

  const [finalEndgameLevel, setFinalEndgameLevel] = useState<
    Array<PlatformJSON>
  >([{ x: 680, y: 550, width: 120, height: 32 }])
  const memoizedEndgameLevel = useMemo(
    () => finalEndgameLevel,
    [finalEndgameLevel]
  )
  function startEndgameLevel(diff: number) {
    const endgameLevelJSON = generateEndgameLevel(diff)
    setFinalEndgameLevel(JSON.parse(endgameLevelJSON))
    //SetCurrentLevel('count of levels') must be increased manually when adding a new level
    //No automation as there are no plans to add more levels

    setCurrentLevel(3)
    return finalEndgameLevel
  }
  useEffect(() => {
    ;(document.activeElement as HTMLElement)?.blur()
  }, [currentLevel])

  const [reset, setReset] = useState<boolean>(false)
  useEffect(() => {
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
  }, [])

  useEffect(() => {
    const levelChoose = [level_01, level_02, level_03, memoizedEndgameLevel]

    const onSurface: OnSurface = {
      onPlatform: false,
      onGround: true,
    }
    const canvas = document.getElementById(
      "mainCanvas"
    ) as HTMLCanvasElement | null
    if (canvas) {
      let lastFrameRate: number = 0

      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d")
      canvas.height = canvas.clientHeight
      canvas.width = canvas.clientWidth

      const characterParam: CharacterParam = {
        x: canvas.width / 2,
        y: canvas.height - 110,
        width: 37,
        height: 100,
        speed: 400,
        gravity: 0,
        jumpHeight: 3,
        jumpSpeed: 100,
      }
      const characterCoords: CharacterCoords = {
        left: characterParam.x,
        right: characterParam.x + characterParam.width,
        top: characterParam.y,
        bottom: characterParam.y + characterParam.height,
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

      function updateCharacterCoords() {
        characterCoords.left = characterParam.x
        characterCoords.right = characterParam.x + characterParam.width
        characterCoords.top = characterParam.y
        characterCoords.bottom = characterParam.y + characterParam.height
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
          (onSurface.onPlatform == true || onSurface.onGround == true)
          //onSurface.onPlatform & onGround check occurs in the 'falling' function in the 'falling.ts' file
        ) {
          const jumping = setInterval(() => {
            characterParam.gravity = 0
            characterParam.y = characterParam.y - characterParam.jumpHeight
          }, 1)
          setTimeout(() => {
            clearInterval(jumping)
          }, 250)
        }
      })

      //images for functions in 'draws.ts'
      const texture_level_bounadry_wall = new Image()
      texture_level_bounadry_wall.src = "/texture_level_bounadry_wall.jpg"
      const texture_platform = new Image()
      texture_platform.src = "/texture_platform.avif"
      const texture_character = new Image()
      texture_character.src = "/texture_character.png"
      const texture_chest = new Image()
      texture_chest.src = "/texture_chest.png"

      function gameLoop(timestamp: number) {
        const deltaTime = (timestamp - lastFrameRate) / 1000
        lastFrameRate = timestamp
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

        drawCharacter(ctx!, characterParam, texture_character)
        drawStaticPlatform(staticPlatforms, ctx, texture_platform)
        drawLevelBoundaryWall(
          levelBoundaryWall,
          ctx,
          texture_level_bounadry_wall
        )
        drawChest(staticPlatforms, ctx, texture_chest)
        moving(
          deltaTime,
          levelBoundary,
          levelBoundaryWall,
          keysHold,
          characterParam,
          staticPlatforms
        )
        falling(
          deltaTime,
          staticPlatforms,
          characterCoords,
          characterParam,
          canvas,
          onSurface
        )
        updateCharacterCoords()
        requestAnimationFrame(gameLoop)
        // console.log("hello")
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
  }, [currentLevel, reset, memoizedEndgameLevel])

  return (
    <div className={style.container}>
      <LevelChoose
        changeLevel={changeLevel}
        startEndgameLevel={startEndgameLevel}
      />

      <canvas id="mainCanvas" className={style.canvasBox}></canvas>
      <GameInfo />
    </div>
  )
}
