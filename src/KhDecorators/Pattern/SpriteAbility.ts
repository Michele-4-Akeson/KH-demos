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

    getIsDraggable(): boolean {
        return this.sprite.getIsDraggable()
    }
    
    setIsDraggable(canDrag: boolean): void {
        this.sprite.setIsDraggable(canDrag)
    }

    getDragRef(): Draggable[] {
        return this.sprite.getDragRef()
    }
    setDragRef(drag: Draggable[]): void {
        this.sprite.setDragRef(drag)
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