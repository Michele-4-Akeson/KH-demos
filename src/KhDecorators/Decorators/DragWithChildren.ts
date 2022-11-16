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


    /**
     * Moves the attached sprites based on where the element being dragged is 
     * being dragged to
     * @param dragX the change in position x of the element
     * @param dragY the change in position y of the element
     */
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
        // the distance between where the element was before being dragged and where it is corrently
        let difference = this.previousY - this.getY()
        this.getDraggable()[0].disable()

        // moves the element and its attached sprite to its position before it was dragged 
        this.callAfterMove('y', difference, 1, ()=>this.getDraggable()[0].enable())
        for (let sprite of this.getAttachedSprites()){
            sprite.moveY(difference, 1)
        }

    }

    /**
     * updates the previous position of where the element is considered moved to, such that,
     * when a drag event ends, the element will return to the position it was last "moved to"
     * before being dragged
     */
    override moveWithUpdate(direction: string, value: number, duration: number, onUpdate: Function): void {
        super.moveWithUpdate(direction, value, duration, ()=>{
            onUpdate()
            this.previousX = this.getX()
            this.previousY = this.getY()
        })

    }

} export default DragWithChildren