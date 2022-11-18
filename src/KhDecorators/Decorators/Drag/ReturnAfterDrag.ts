import SpriteAbility from "src/KhDecorators/Pattern/SpriteAbility";
import UseSprite from "src/KhDecorators/Pattern/UseSprite";

class ReturnAfterDrag extends SpriteAbility{
  
    
    constructor(useSprite:UseSprite){
        super(useSprite)
        this.setPreviousX(this.getX())
        this.setPreviousY(this.getY())
    }


   


    /**
     * after a drag has ended, the useSpirte and all it's children will 
     * be moved back to the position they were at prior to the drag
     */
    override onDragEnd(): void {
        // the distance between where the element was before being dragged and where it is corrently
        super.onDragEnd()
        let differenceY = this.getPreviousY() - this.getY()
        let differenceX = this.getPreviousX() - this.getX()
        this.getDraggable()[0].disable()

        // moves the element and its attached sprite to its position before it was dragged 
        this.callAfterMove('x', differenceX, 1, ()=>this.getDraggable()[0].enable())
        for (let sprite of this.getAttachedSprites()){
            sprite.moveX(differenceX, 1)
        }

        this.callAfterMove('y', differenceY, 1, ()=>this.getDraggable()[0].enable())
        for (let sprite of this.getAttachedSprites()){
            sprite.moveY(differenceY, 1)
            
        }

    }

    /**
     * updates the previous position of where the element is considered moved to, such that,
     * when a drag event ends, the element will return to the position it was last "moved to"
     * before being dragged
     */
    override elasticMove(direction: string, value: number, duration: number, onUpdate: Function): void {
        super.elasticMove(direction, value, duration, ()=>{
            onUpdate()
            this.updatePrevious()
        })

    }

    updatePrevious(){
        this.setPreviousX(this.getX())
        this.setPreviousY(this.getY())
    }

} export default ReturnAfterDrag