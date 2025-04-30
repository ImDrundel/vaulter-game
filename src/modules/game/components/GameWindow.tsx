"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import style from "./GameWindow.module.scss"
import levelBoundaryWallJSON from "@/public/assets/levels/levelBoundaryWall.json"
import level_01 from "@/public/assets/levels/level_01.json"
import level_02 from "@/public/assets/levels/level_02.json"
import level_03 from "@/public/assets/levels/level_03.json"
import { moving } from "@/src/modules/game/engine/input/moving"
import { Falling } from "@/src/modules/game/engine/physics/falling"
import { jump } from "@/src/modules/game/engine/input/jump"
import { generateEndgameLevel } from "@/src/modules/game/levels/generateEndgame"
import {
  Platform,
  CharacterParam,
  PlatformJSON,
  Wall,
  // OnSurface,
  CharacterCoords,
  LevelBoundary,
  OnSurface,
} from "@/src/types/types"
import {
  drawCharacter,
  drawStaticPlatform,
  drawLevelBoundaryWall,
  drawChest,
} from "@/src/modules/game/engine/rendering/draws"
import LevelChoose from "@/src/components/UI/levelChoose"
import GameInfo from "@/src/components/UI/InfoBoxes/gameInfo"

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

  //reset level buy 'R' key
  const [reset, setReset] = useState<boolean>(false)
  useEffect(() => {
    function keyRDown(e: KeyboardEvent) {
      if (e.code === "KeyR") {
        setReset(true)
      }
    }
    function keyRUp(e: KeyboardEvent) {
      if (e.code === "KeyR") {
        setReset(false)
      }
    }

    window.addEventListener("keydown", keyRDown)
    window.addEventListener("keydown", keyRUp)
    return () => {
      window.removeEventListener("keydown", keyRDown)
      window.removeEventListener("keydown", keyRUp)
    }
  }, [])
  // const [onPlatform, setOnPlatform] = useState<boolean>(false)
  // const [onGround, setOnGround] = useState<boolean>(true)
  // const onSurface = useRef<OnSurface>({
  //   onPlatform: false,
  //   onGround: true,
  // })
  // const onPlatform = useRef<boolean>(false) as React.MutableRefObject<boolean>
  // const onGround = useRef<boolean>(true) as React.MutableRefObject<boolean>
  const frameIdRef = useRef<number | null>(null)
  useEffect(() => {
    const onSurface: OnSurface = {
      onGround: true,
      onPlatform: false,
    }
    const levelChoose = [level_01, level_02, level_03, memoizedEndgameLevel]

    const canvas = document.getElementById(
      "mainCanvas"
    ) as HTMLCanvasElement | null

    let keysHold: { [code: string]: boolean } = {}
    function keyDown(e: KeyboardEvent) {
      keysHold[e.code] = true
    }
    function keyUp(e: KeyboardEvent) {
      keysHold[e.code] = false
    }
    window.addEventListener("keydown", keyDown)
    window.addEventListener("keyup", keyUp)

    if (canvas) {
      let lastFrameRate: number = 0

      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d")
      canvas.height = canvas.clientHeight
      canvas.width = canvas.clientWidth

      const characterParam: CharacterParam = {
        x: canvas.width / 2,
        y: canvas.height - 99,
        width: 37,
        height: 100,
        speed: 400,
        gravity: 0,
        jumpHeight: 21,
        jumpSpeed: 100,
      }
      const characterCoords: CharacterCoords = {
        left: characterParam.x,
        right: characterParam.x + characterParam.width,
        top: characterParam.y,
        bottom: characterParam.y + characterParam.height,
      }
      function updateCharacterCoords() {
        characterCoords.left = characterParam.x
        characterCoords.right = characterParam.x + characterParam.width
        characterCoords.top = characterParam.y
        characterCoords.bottom = characterParam.y + characterParam.height
      }

      // Only one wall remains in the development process. I saved the structure in case other walls are added in the future
      const levelBoundaryWall: Array<Wall> = levelBoundaryWallJSON.map(
        (object) => {
          return {
            ...object,
          }
        }
      )
      const levelBoundary: LevelBoundary = {
        leftBorder: levelBoundaryWall[0].rightBorder,
        // rightBorder: levelBoundaryWall[1].leftBorder,
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

      //images for functions in 'draws.ts'
      const texture_level_bounadry_wall = new Image()
      texture_level_bounadry_wall.src =
        "/assets/images/texture_level_bounadry_wall.jpg"

      const texture_platform = new Image()
      texture_platform.src = "/assets/images/texture_platform.avif"

      const texture_character = new Image()
      texture_character.src = "/assets/images/texture_character.png"

      const texture_chest = new Image()
      texture_chest.src = "/assets/images/texture_chest.png"

      function gameLoop(timestamp: number) {
        const deltaTime = (timestamp - lastFrameRate) / 1000
        lastFrameRate = timestamp
        // console.log(deltaTime, timestamp)
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
        Falling(
          deltaTime,
          staticPlatforms,
          characterCoords,
          characterParam,
          canvas,
          onSurface
          // currentLevel
          // onPlatform,
          // onGround
        )
        jump(keysHold, characterParam, onSurface)
        // onPlatform,
        // onGround)

        updateCharacterCoords()
        frameIdRef.current = requestAnimationFrame(gameLoop)
        // console.log(onSurface, currentLevel)
      }

      //Main code end
      // Context checking
      if (ctx) {
        frameIdRef.current = requestAnimationFrame(gameLoop)
        // window.removeEventListener("keydown", jump)
      } else {
        console.error("2D context not available")
      }
    } else {
      console.error("Canvas element not found...")
    }
    // window.addEventListener("keydown", jump)
    return () => {
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current)
      }
      // console.log("falling удален")
      window.removeEventListener("keydown", keyDown)
      window.removeEventListener("keyup", keyUp)
      // console.log("---------")
      // console.log(onSurface, currentLevel)
      // console.log(keysHold)
      // console.log("очистка")
      keysHold = {}
      // delete onSurface.onGround
      // delete onSurface.onPlatform
      // onSurface = {}
      // console.log(onSurface, currentLevel)
      // console.log(keysHold)

      // onSurface.onGround = true
      // onSurface.onPlatform = false
      // onSurface.current = { onPlatform: false, onGround: true }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
