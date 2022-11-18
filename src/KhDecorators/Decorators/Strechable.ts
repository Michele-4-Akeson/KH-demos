import gsap from "gsap";
import SpriteAbility from "../Pattern/SpriteAbility";
import UseSprite from "../Pattern/UseSprite";

class Strechable extends SpriteAbility{
    startWidth:number = 0
    startHeight:number = 0
    anchorX:number | null = null
    anchorY: number | null = null
    /**
     * Strechable makes a useSprite strechable from an anchor point such
     * that if a user moves the useSprite in an x or y direction, the useSprite
     * will strech based on the distance it is from that anchor point
     * @param useSprite the useSprite to be streched
     * @param anchorX the x postion where this useSprite will be streched from unless null
     * @param anchorY the y postion where this useSprite will be streched from unless null
     */
    constructor(useSprite:UseSprite, anchorX:number|null, anchorY:number|null){
        super(useSprite)
        this.startWidth = this.element.getBBox().width
        this.startHeight = this.element.getBBox().height
        this.anchorX = anchorX
        this.anchorY = anchorY

        this.strechX(0, 1)
        this.strechY(0, 1)
    }


    override moveY(y: number, duration: number): void {
        this.strechY(y, duration)
        super.moveY(y, duration)
    }

    override moveX(x: number, duration: number): void {
        this.strechX(x, duration)
        super.moveX(x, duration)

    }

    override onDrag(dragX: number, dragY: number): void {
        this.strechX(dragX, 0)
        this.strechY(dragY, 0)
    }


    override setX(x: number, duration: number): void {
        super.setX(x, duration)
        this.strechX(x - this.getX(), duration)
    }

    override setY(y: number, duration: number): void {
        super.setY(y, duration)
        this.strechY(y - this.getY(), duration)
    }



    

    strechY(y:number, duration:number){
        if (this.anchorY){
            let strechDistance = this.anchorY - (this.getY() + y)
            let scale = strechDistance/this.startHeight
            gsap.to(this.element, {scaleY:scale, duration:duration})
        }

    }

    strechX(x:number, duration:number){
        if (this.anchorX){
            let strechDistance = this.anchorX - (this.getX() + x)
            let scale = strechDistance/this.startWidth
            gsap.to(this.element, {scaleX:scale, duration:duration})
        }

    }



} export default Strechable