import gsap from "gsap";
import Physics from "../Components/Physics";
import UseSprite from "./UseSprite";
class Sprite implements UseSprite {
    element: SVGUseElement | SVGGElement | SVGSVGElement;
    parent: SVGSVGElement | null = null
    physics:Physics = new Physics()
    attachedSprites:UseSprite[] = []
    
    constructor(svgUseElement:SVGUseElement){
        this.element = svgUseElement
       
    }
  
  

  


    ///////////////////////
    // GETTER
    ///////////////////////
    getX():number{
        return gsap.getProperty(this.element, "x") as number
    }

    getY():number{
        return gsap.getProperty(this.element, "y") as number
    }

    getPhysics(): Physics {
        return this.physics
    }

    getAttachedSprites(): UseSprite[] {
        return this.attachedSprites
    }


    ///////////////////////
    // SETTERS
    ///////////////////////

    setScale(scale: number): void {
        gsap.set(this.element, {scale:scale})
    }
    

    addSprite(useSprite: UseSprite): void {
        this.attachedSprites.push(useSprite)
    }

    removeSprite(useSprite: UseSprite): void {
        this.attachedSprites = this.attachedSprites.filter(sprite=>sprite != useSprite)
        console.log(this.attachedSprites)
    }
    

    moveX(x: number, duration: number): void {
        let newX = this.getX() + x
        console.log(newX)
        gsap.to(this.element, {x:newX, duration:duration})
    }

    
    moveY(y: number, duration: number): void {
        let newY = this.getY() + y
        gsap.to(this.element, {y:newY, duration:duration})     
    }

    setX(x: number, duration: number): void {
        gsap.to(this.element, {x:x, duration:duration})
    }

    setY(y: number, duration: number): void {
        gsap.to(this.element, {y:y, duration:duration})
    }

    setParent(targetParent: SVGSVGElement): void {
        if (this.parent) this.parent.removeChild(this.element)
        targetParent.append(this.element)
        this.parent = targetParent
        
    }

  
    onClick(): void {
        console.log("click")
    }


    onDrag(dragX: number, dragY: number): void {
        console.log(dragX, dragY)
    }


    onDragEnd(): void {
        console.log("drag ended")
    }
   

    destroy(): void {
        this.parent?.removeChild(this.element)
        for (let sprite of this.attachedSprites){
            sprite.destroy()
        }
    }

    moveWithAction(direction: string, value: number, duration:number, callback: Function): void {
        switch(direction){
            case "x":
                let newX = this.getX() + value
                gsap.to(this.element, {x:newX, duration:duration, onComplete(){callback()}})
                break
            case "y":
                let newY = this.getY() + value
                gsap.to(this.element, {y:newY, duration:duration, onComplete(){callback()}})
                break



        }
    }

    //////////////////////////////////
    // STATIC FUNCTION
    //////////////////////////////////

    /**
     * 
     * @param sprite1 
     * @param sprite2 
     * @returns the distance from the center from both sprites
     */
    static getDistance(sprite1:UseSprite, sprite2:UseSprite){
        let center1 = Sprite.getCenter(sprite1)
        let center2 = Sprite.getCenter(sprite2)
        let xTerm = (center1[0] - center2[0]) ** 2
        let yTerm = (center1[1] - center2[1]) ** 2

        return Math.sqrt(xTerm + yTerm)


    }

    /**
     * 
     * @param useSprite 
     * @returns the center point [x, y] of the sprite
     */
    static getCenter(useSprite:UseSprite):number[]{
        let x = useSprite.getX() + useSprite.element.getBBox().width/2
        let y = useSprite.getY() + useSprite.element.getBBox().height/2

        return [x, y]
    }


    /**
     * 
     * @param useSprite 
     * @returns the x position of the right side of the sprite
     */
    static getRight(useSprite:UseSprite):number{
        return useSprite.getX() + useSprite.element.getBBox().width
    }

    /**
     * 
     * @param useSprite 
     * @returns the point of [x,y] the bottom center of the sprite
     */
    static getBottomCenter(useSprite:UseSprite):number[]{
        let x = useSprite.getX() + (useSprite.element.getBBox().width/2)
        let y = useSprite.getY() + (useSprite.element.getBBox().height)

        return [x, y]
    }


    /**
     * 
     * @param useSprite 
     * @returns the point [x,y] of the top center of the sprite
     */
    static getTopCenter(useSprite:UseSprite):number[]{
        let x = useSprite.getX() + (useSprite.element.getBBox().width/2)
        let y = useSprite.getY()
        return [x, y]
    }

    














   

    
} export default Sprite