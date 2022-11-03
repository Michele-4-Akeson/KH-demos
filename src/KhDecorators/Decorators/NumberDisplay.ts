import gsap from "gsap";
import Sprite from "../Pattern/Sprite";
import SpriteAbility from "../Pattern/SpriteAbility";
import UseSprite from "../Pattern/UseSprite";
const svgNS = "http://www.w3.org/2000/svg"

class NumberDisplay extends SpriteAbility{
    value: number;
    text: SVGTextElement | null = null
    position: number[];
    offsetX: number;
    offsetY: number;
    constructor(useSprite:UseSprite, value:number, offsetX:number, offsetY:number){
        super(useSprite)
        this.value = value
        this.position = [offsetX, offsetY]
        this.offsetX = offsetX
        this.offsetY = offsetY
        this.createNumber()
        
    }

    override moveX(x: number, duration: number): void {
        this.position[0] += x
        gsap.to(this.text, {x:this.position[0], duration:duration})
        super.moveX(x, duration)
    }

    override moveY(y: number, duration: number): void {
        this.position[1] += y
        gsap.to(this.text, {y:this.position[1], duration:duration})
        super.moveY(y, duration)
    }

    override onDrag(dragX:number, dragY:number): void {
        let center = Sprite.getCenter(this)
        this.position[0] = center[0] + this.offsetX
        this.position[1] = center[1] + this.offsetY
        gsap.set(this.text, {x:this.position[0], y:this.position[1]})
        super.onDrag(dragX, dragY)
        
    }

    override destroy(): void {
        this.parent?.removeChild(this.text!)
        super.destroy()
    }



    createNumber(){
        this.text = document.createElementNS(svgNS, "text")
        this.sprite.parent?.append(this.text)
        this.text.textContent = this.value.toString()
        let center = Sprite.getCenter(this)
        this.position[0] += center[0]
        this.position[1] += center[1]
        gsap.set(this.text, {x:this.position[0], y:this.position[1]})

    }






   
} export default NumberDisplay