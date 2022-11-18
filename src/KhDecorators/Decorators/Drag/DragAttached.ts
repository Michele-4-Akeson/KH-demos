import SpriteAbility from "src/KhDecorators/Pattern/SpriteAbility";
import UseSprite from "src/KhDecorators/Pattern/UseSprite";

class DragAttached extends SpriteAbility{
    /**
     * Adds the functionality that when the useSprite is dragged
     * all other attached sprites are dragged with the useSprite
     * @param useSprite
     */
    constructor(useSprite:UseSprite){
        super(useSprite)
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

        super.onDrag(dragX, dragY)

    }
} export default DragAttached