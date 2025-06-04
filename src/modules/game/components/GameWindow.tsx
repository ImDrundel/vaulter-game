"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import style from "./GameWindow.module.scss"
import strTrial from "@/public/assets/levels/strTrial.json"
import dexTrial from "@/public/assets/levels/dexTrial.json"
import soulTrial from "@/public/assets/levels/soulTrial.json"
import luckTrial from "@/public/assets/levels/luckTrial.json"
import { moving } from "@/src/modules/game/engine/input/moving"
import { falling } from "@/src/modules/game/engine/physics/falling"
import { jump } from "@/src/modules/game/engine/input/jump"
import { generateEndgameLevel } from "@/src/modules/game/levels/generateEndgame"
import {
  Platform,
  CharacterParam,
  PlatformJSON,
  CharacterCoords,
  OnSurface,
  characterPermanentParam,
  characterModifiableParam,
  LocalPlayerData,
} from "@/src/types/types"
import {
  drawCharacter,
  drawStaticPlatform,
  drawChest,
} from "@/src/modules/game/engine/rendering/drawsStatic"
import { drawLava } from "@/src/modules/game/engine/rendering/drawLavaAnimation"
import LevelChoose from "@/src/components/UI/LevelChoose"
import GameInfo from "@/src/components/UI/InfoBoxes/GameInfo"
import playerPersonalInfo from "@/src/modules/game/playerPersonalInfo/playerPersonalInfo.json"
import Inventory from "@/src/components/UI/Inventory"

export default function GameWindow() {
  // const temporaryPersonalInfo: LocalPlayerData = playerPersonalInfo[0]
  const [temporaryPersonalInfo, setTemporaryPersonalInfo] =
    useState<LocalPlayerData>(playerPersonalInfo[0])
  // console.log(temporaryPersonalInfo)
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
    setCurrentLevel(4)
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

  const frameIdRef = useRef<number | null>(null)
  const blockedKeysRef = useRef<{ [code: string]: boolean }>({})

  useEffect(() => {
    const onSurface: OnSurface = {
      onLava: false,
      onPlatform: false,
      onLastPlatform: false,
    }

    const levelChoose = [
      strTrial,
      dexTrial,
      soulTrial,
      luckTrial,
      memoizedEndgameLevel,
    ]

    const canvas = document.getElementById(
      "mainCanvas"
    ) as HTMLCanvasElement | null

    function blockOnReset() {
      blockedKeysRef.current = { ...keysHold }
      keysHold = {}
    }

    let keysHold: { [code: string]: boolean } = {}
    function keyDown(e: KeyboardEvent) {
      if (blockedKeysRef.current[e.code]) return
      keysHold[e.code] = true
    }
    function keyUp(e: KeyboardEvent) {
      keysHold[e.code] = false
      if (blockedKeysRef.current[e.code]) {
        delete blockedKeysRef.current[e.code]
      }
    }

    window.addEventListener("keydown", keyDown)
    window.addEventListener("keyup", keyUp)

    if (canvas) {
      let lastFrameRate: number = 0
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d")
      canvas.height = canvas.clientHeight
      canvas.width = canvas.clientWidth

      // character parameters are located here because they are bound to the canvas element.
      const characterPermanentParam: characterPermanentParam = {
        x: canvas.width / 2,
        y: canvas.height - 290,
        width: 37,
        height: 100,
        gravity: 0, //real gravity 500 (sets in falling.ts)
      }
      const characterBaseModifiableParam: characterModifiableParam = {
        speed: 100,
        jumpHeight: 100,
      }
      // console.log(temporaryPersonalInfo)
      const characterParam: CharacterParam = {
        x: characterPermanentParam.x,
        y: characterPermanentParam.y,
        width: characterPermanentParam.width,
        height: characterPermanentParam.height,
        gravity: characterPermanentParam.gravity,

        speed: Math.round(
          (characterBaseModifiableParam.speed +
            temporaryPersonalInfo.flatSpeedFromArts) *
            (1 + temporaryPersonalInfo.multiplierSpeedFromArts / 100)
        ),
        jumpHeight: Math.round(
          (characterBaseModifiableParam.jumpHeight +
            temporaryPersonalInfo.flatJumpHeightFromArts) *
            (1 + temporaryPersonalInfo.multiplierJumpHeightFromArts / 100)
        ),
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
      const texture_platform = new Image()
      texture_platform.src = "/assets/images/texture_platform.avif"
      const texture_character = new Image()
      texture_character.src = "/assets/images/texture_character.png"
      const texture_chest = new Image()
      texture_chest.src = "/assets/images/texture_chest.png"
      let lavaTime = 0

      function gameLoop(timestamp: number) {
        const deltaTime = (timestamp - lastFrameRate) / 1000
        lastFrameRate = timestamp
        lavaTime += deltaTime
        // console.log(deltaTime, timestamp, lavaTime)
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

        drawCharacter(ctx!, characterParam, texture_character)
        drawStaticPlatform(staticPlatforms, ctx, texture_platform)
        //if
        drawChest(staticPlatforms, ctx, texture_chest)
        drawLava(ctx, canvas, lavaTime, 0)
        drawLava(ctx, canvas, lavaTime, 1)

        falling(
          deltaTime,
          staticPlatforms,
          characterCoords,
          characterParam,
          canvas,
          onSurface
        )
        // console.log(temporaryPersonalInfo.flatSpeedFromArts)
        moving(deltaTime, keysHold, characterParam, staticPlatforms)
        jump(keysHold, characterParam, onSurface)

        //The block to continue movement after death was added because there is an unclear problem if the character will immediately fall into the lava from the start when the movement buttons are pressed.
        if (onSurface.onLava == true) {
          blockOnReset()
          setReset(true)
        } else {
          setReset(false)
        }

        updateCharacterCoords()
        frameIdRef.current = requestAnimationFrame(gameLoop)
        console.log(onSurface.onLastPlatform)
        //console.log(characterParam.jumpHeight)
      }

      if (ctx) {
        frameIdRef.current = requestAnimationFrame(gameLoop)
      } else {
        console.error("2D context not available")
      }
    } else {
      console.error("Canvas element not found...")
    }
    return () => {
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current)
      }
      window.removeEventListener("keydown", keyDown)
      window.removeEventListener("keyup", keyUp)
      keysHold = {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLevel, reset, memoizedEndgameLevel, temporaryPersonalInfo])

  return (
    <div className={style.container}>
      <LevelChoose
        changeLevel={changeLevel}
        startEndgameLevel={startEndgameLevel}
      />
      <Inventory
        temporaryPersonalInfo={temporaryPersonalInfo}
        setTemporaryPersonalInfo={setTemporaryPersonalInfo}
      />
      <canvas id="mainCanvas" className={style.canvasBox}></canvas>
      <GameInfo />
    </div>
  )
}
