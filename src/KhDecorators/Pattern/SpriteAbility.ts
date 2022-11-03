import gsap from "gsap";
import Physics from "../Components/Physics";
import UseSprite from "./UseSprite";


class SpriteAbility implements UseSprite{
    sprite:UseSprite
    element: SVGUseElement | SVGGElement | SVGSVGElement;
    parent: SVGSVGElement | null = null

    constructor(useSprite:UseSprite){
        this.sprite = useSprite
        this.element = this.sprite.element
        this.parent = this.sprite.parent

    }
  
  
   
 

  
  


   


    /////////////////////////////////
    // GETTERS
    /////////////////////////////////
    getPhysics(): Physics {
        return this.sprite.getPhysics()
    }

    getAttachedSprites(): UseSprite[] {
        return this.sprite.getAttachedSprites()
    }


    getX():number{
        return gsap.getProperty(this.element, "x") as number
    }

    getY():number{
        return gsap.getProperty(this.element, "y") as number
    }

    


    /////////////////////////////////
    // SETTERS
    /////////////////////////////////

    setScale(scale: number): void {
        this.sprite.setScale(scale)
    }

    addSprite(useSprite: UseSprite): void {
        this.sprite.addSprite(useSprite)
    }

    removeSprite(useSprite: UseSprite): void {
        this.sprite.removeSprite(useSprite)
    }

   
    moveX(x: number, duration: number): void {
        this.sprite.moveX(x, duration)
    }
    moveY(y: number, duration: number): void {
        this.sprite.moveY(y, duration)
    }

    moveWithAction(direction: string, value: number, duration:number, callback: Function): void {
        this.sprite.moveWithAction(direction, value, duration, callback)
    }

    setX(x: number, duration: number): void {
        this.sprite.setX(x, duration)
    }
    setY(y: number, duration: number): void {
        this.sprite.setY(y, duration)
    }


    setParent(targetParent: SVGSVGElement): void {
        if (this.parent) this.parent.removeChild(this.element)
        targetParent.append(this.element)
        this.parent = targetParent
        this.sprite.setParent(targetParent)
    }


  

    onClick(): void {
        this.sprite.onClick()
    }

    onDrag(dragX: number, dragY: number): void {
        this.sprite.onDrag(dragX, dragY)
    }

    onDragEnd(): void {
        this.sprite.onDragEnd()
    }

    destroy(): void {
        this.sprite.destroy()
    }




} export default SpriteAbility