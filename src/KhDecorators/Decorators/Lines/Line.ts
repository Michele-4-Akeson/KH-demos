import gsap from "gsap";
import Sprite from "../../Pattern/Sprite";
import SpriteAbility from "../../Pattern/SpriteAbility";
import UseSprite from "../../Pattern/UseSprite";
const svgNS = "http://www.w3.org/2000/svg"



class Line extends SpriteAbility{
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

    override spriteTo(parameters: Object): void {
        let y = Sprite.getProperty(parameters, "y")
        let duration = Sprite.getProperty(parameters, "duration")
        if (duration){
            console.log("duration:\nxxxxxxxxxxxxxxx", duration)
            this.moveLine(0, y, duration)
        }

        super.spriteTo(parameters)
    }

    override spriteUpdate(parameters: Object, onUpdate: Function): void {
        super.spriteUpdate(parameters, ()=>{
            onUpdate()
            //this.moveLine(0, this.getY(), 0)
        })
    }


    override moveY(y: number, duration: number): void {
        super.moveY(y, duration)
        this.moveLine(0, y, duration)
    }


    /**
     * updates the line such that it's connected to both the center of the sprite
     * and the center of the target when being dragged
     * @param dragX the change in x position of the element being dragged
     * @param dragY the change in y position of the element being dragged
     */
    override onDrag(dragX:number, dragY:number): void {
        // retrieves the point the line should connect to the sprite from
        if (this.from == "top") this.pointA = Sprite.getTopCenter(this.sprite)
        else this.pointA = Sprite.getBottomCenter(this.sprite)

        // retrieves the point the line should connect to the target from
        if (this.to == "top") this.pointB = Sprite.getTopCenter(this.connectTarget)
        else this.pointB = Sprite.getBottomCenter(this.connectTarget)

        // updates the two points of the line when dragging such that one point is connected to the center of the sprite and the
        // other is connected to the center of the target
        gsap.set(this.line, {attr:{x1:this.pointA[0], y1:this.pointA[1], x2:this.pointB[0], y2:this.pointB[1]}})
        super.onDrag(dragX, dragY)
    }


    override destroy(): void {
        this.line?.parentElement?.removeChild(this.line)
        super.destroy()
    }


    /**
     * draws a line element from the useSprite to the connectTarget
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
        
        this.setLine()


    }


    setLine(){
        gsap.set(this.line, {attr: {x1:this.pointA[0], y1:this.pointA[1], x2:this.pointB[0], y2:this.pointB[1], stroke:this.color}})
    }


    /**
     * moves the line by x and y over a given amount of time
     * @param x horizontal distance the line will be moved
     * @param y the vertical distance the line will be moved
     * @param duration the time required to make that movement 
     */
    moveLine(x:number, y:number, duration:number){
        this.pointA = [this.pointA[0] + x, this.pointA[1] + y]
        this.pointB = [this.pointB[0] + x, this.pointB[1] + y]
        console.log("y", y, "duration",duration)
        gsap.to(this.line, {duration:duration, attr:{y1:this.pointA[1], y2:this.pointB[1]}})


    }




} export default Line