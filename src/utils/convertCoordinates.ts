type Dot = {
  x: number
  y: number
}

const polarToCartesian = (radius: number, center: number, angleInDegrees: number):Dot => {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0
  return {
    x: center + (radius * Math.cos(angleInRadians)),
    y: center + (radius * Math.sin(angleInRadians))
  }
}

export {polarToCartesian}