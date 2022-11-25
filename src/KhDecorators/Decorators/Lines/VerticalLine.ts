import gsap from "gsap";
import Sprite from "../../Pattern/Sprite";
import SpriteAbility from "../../Pattern/SpriteAbility";
import UseSprite from "../../Pattern/UseSprite";
const svgNS = "http://www.w3.org/2000/svg"



class VerticalLine extends SpriteAbility{
    connectTarget: UseSprite;
    line:SVGLineElement | null = null
    pointA:number[] = [0, 0] 
    pointB:number[] = [0, 0]
    from:string
    to:string
    color: string;
    /**
     * creates a line element that connects two elements and updates that line
     * when the position of an element changes
     * @param useSprite the useSprite a line element will be drawn from
     * @param connectTarget the useSprite a line will be drawn to
     * @param from the location where the line will start from on the useSprite (top or bottom)
     * @param to the location the line will travel to on the connect target (top or bottom)
     * @param color the color of the line
     */
    constructor(useSprite:UseSprite, connectTarget:UseSprite, from:string, to:string, color:string){
        super(useSprite)
        this.connectTarget = connectTarget
        this.from = from
        this.to = to
        this.color = color
        this.drawLine(from, to)
    }


    override moveY(y: number, duration: number): void {
        super.moveY(y, duration)
        this.moveLine(0, y, duration)
    }


    override onDrag(dragX:number, dragY:number): void {
        if (this.from == "top") this.pointA = Sprite.getTopCenter(this.sprite)
        else this.pointA = Sprite.getBottomCenter(this.sprite)

        if (this.to == "top") this.pointB = Sprite.getTopCenter(this.connectTarget)
        else this.pointB = Sprite.getBottomCenter(this.connectTarget)

        this.pointB[0] = this.pointA[0]
        gsap.set(this.line, {attr:{x1:this.pointA[0], y1:this.pointA[1], x2:this.pointB[0], y2:this.pointB[1]}})
        super.onDrag(dragX, dragY)
    }

    
    
    

    override destroy(): void {
        this.line?.parentElement?.removeChild(this.line)
        super.destroy()
    }


    /**
     * draws a vertical line element from the useSprite to the connectTarget
     * @param from a string indicating where to a draw a line from the useSprite
     * @param to a string indicating where to draw a line to on the connectTarget
     */
    drawLine(from:string, to:string){
        this.line = document.createElementNS(svgNS, "line")
        this.sprite.parent?.append(this.line)

        if (from == "top") this.pointA = Sprite.getTopCenter(this.sprite)
        else this.pointA = Sprite.getBottomCenter(this.sprite)

        if (to == "top") this.pointB = Sprite.getTopCenter(this.connectTarget)
        else this.pointB = Sprite.getBottomCenter(this.connectTarget)
        
        this.pointB[0] = this.pointA[0]
        this.setLine()


    }


    setLine(){
        gsap.set(this.line, {attr: {x1:this.pointA[0], y1:this.pointA[1], x2:this.pointB[0], y2:this.pointB[1], stroke:this.color}})
    }

    moveLine(x:number, y:number, duration:number){
        this.pointA = [this.pointA[0] + x, this.pointA[1] + y]
        this.pointB = [this.pointB[0] + x, this.pointB[1] + y]

        gsap.to(this.line, {attr:{y1:this.pointA[1], y2:this.pointB[1]}, duration:duration})


    }




} export default VerticalLine