import SpriteAbility from "../Pattern/SpriteAbility"
import UseSprite from "../Pattern/UseSprite"

// class is acting as the current default option for impacting all child sprite elements attached
// should extract group functionality to something else
class Weight extends SpriteAbility{
    currentX: number
    currentY: number
    /**
     * NOTE: SHOULD ABSTRACT FUNCTIONALITY IN ANOTHER WAY
     * Weight adds the functionality that whenever a sprite
     * is attached to the current useSprite, it's position, and the position 
     * of all attached sprites in the y direction will change based on the weight 
     * of the useSprite being added
     * @param useSprite
     */
    constructor(useSprite:UseSprite){
        super(useSprite)
        this.currentX = useSprite.getX()
        this.currentY = useSprite.getY()
    }

    override onDrag(dragX: number, dragY: number): void {
        for(let sprite of this.getAttachedSprites()){
            sprite.moveX(dragX, 0)
            sprite.moveY(dragY, 0)
        }
    }

   
    override onDragEnd(): void {
        let difference = this.currentY - this.getY()
        this.setIsDraggable(false)
        this.callAfterMove('y', difference, 1, ()=>this.setIsDraggable(true))
        for (let sprite of this.getAttachedSprites()){
            sprite.moveY(difference, 1)
        }

    }


    override addSprite(useSprite: UseSprite): void {
        super.addSprite(useSprite)
        let spriteWeight = useSprite.getPhysics().weight
        this.adjustWeight(spriteWeight)
    }



    override removeSprite(useSprite: UseSprite): void {
        super.removeSprite(useSprite)
        let spriteWeight = useSprite.getPhysics().weight
        this.adjustWeight(-spriteWeight)
    }


    adjustWeight(weight:number){
        let previousWeight = this.getPhysics().weight
        this.getPhysics().weight += weight
        this.setIsDraggable(false)
        this.callAfterMove("y", this.getPhysics().weight - previousWeight, 1, ()=>this.setIsDraggable(true))
        this.currentY = this.currentY + this.getPhysics().weight - previousWeight
        for (let sprite of this.getAttachedSprites()){
            sprite.moveY(weight, 1)
        }

    }


} export default Weight