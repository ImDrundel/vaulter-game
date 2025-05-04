const lavaHeight = [15, 10]
const waveAmplitude = [5, 15]
const waveLength = [40, 70]

export function drawLava(
  ctx: CanvasRenderingContext2D | null,
  canvas: HTMLCanvasElement | null,
  lavaTime: number,
  index: number
) {
  ctx!.beginPath()
  ctx!.moveTo(0, canvas!.height - lavaHeight[index])
  for (let x = 0; x <= canvas!.width; x += 1) {
    const y =
      Math.sin(x / waveLength[index] + lavaTime * 2) * waveAmplitude[index]
    ctx!.lineTo(x, canvas!.height - lavaHeight[index] - y)
  }
  ctx!.lineTo(canvas!.width, canvas!.height)
  ctx!.lineTo(0, canvas!.height)
  ctx!.closePath()

  const gradient = ctx!.createLinearGradient(
    0,
    canvas!.height - lavaHeight[index],
    0,
    canvas!.height
  )
  gradient.addColorStop(0, "#ff9100")
  gradient.addColorStop(1, "#ff2e00")
  ctx!.fillStyle = gradient
  ctx!.fill()
}
