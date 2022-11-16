import SpriteAbility from "../Pattern/SpriteAbility";
import UseSprite from "../Pattern/UseSprite";

class DragWithChildren extends SpriteAbility{
    previousX: number;
    previousY: number;
    
    constructor(useSprite:UseSprite){
        super(useSprite)
        this.previousX = useSprite.getX()
        this.previousY = useSprite.getY()
    }

    override onDrag(dragX: number, dragY: number): void {
        for(let sprite of this.getAttachedSprites()){
            sprite.moveX(dragX, 0)
            sprite.moveY(dragY, 0)
        }

        
    }


    /**
     * after a drag has ended, the useSpirte and all it's children will 
     * be moved back to the position they were at prior to the drag
     */
    override onDragEnd(): void {
        let difference = this.previousY - this.getY()
        this.setIsDraggable(false)
        this.callAfterMove('y', difference, 1, ()=>this.setIsDraggable(true))
        for (let sprite of this.getAttachedSprites()){
            sprite.moveY(difference, 1)
        }

    }

    /**
     * when the position of the useSprite is changed outside of a drag event, the 'previous' position 
     * which the element will return to after the drag is considered to change
     */
    override moveWithUpdate(direction: string, value: number, duration: number, onUpdate: Function): void {
        super.moveWithUpdate(direction, value, duration, ()=>{
            onUpdate()
            this.previousX = this.getX()
            this.previousY = this.getY()
        })

    }

} export default DragWithChildren