import gsap from "gsap";
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

    
    getX():number{
        return gsap.getProperty(this.element, "x") as number
    }


    getY():number{
        return gsap.getProperty(this.element, "y") as number
    }


    getAttachedSprites(): UseSprite[] {
        return this.sprite.getAttachedSprites()
    }


    getDraggable(): Draggable[] {
        return this.sprite.getDraggable()
    }

    
    setDraggable(drag: Draggable[]): void {
        this.sprite.setDraggable(drag)
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


    callAfterMove(direction: string, value: number, duration:number, callback: Function): void {
        this.sprite.callAfterMove(direction, value, duration, callback)
    }


    moveWithUpdate(direction: string, value: number, duration: number, onUpdate: Function): void {
        this.sprite.moveWithUpdate(direction, value, duration, onUpdate)
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