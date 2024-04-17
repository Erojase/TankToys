export interface dimensions {
    width: number;
    height: number;
  }
  
  export const angleToCoords = (Xi:number, Yi:number, angle: number, length:number) => {

    let Xf = Xi + Math.cos(angle) * length    // unchanged
    let Yf = Yi - Math.sin(angle) * length
  
  
    return {x: Xf, y: Yf}
  }