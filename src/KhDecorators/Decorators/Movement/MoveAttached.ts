import SpriteAbility from "src/KhDecorators/Pattern/SpriteAbility";
import UseSprite from "src/KhDecorators/Pattern/UseSprite";

class MoveAttached extends SpriteAbility{

    /**
     * adds the functionality of moving all attached sprites when
     * the useSprite is moved (x, y)
     * @param useSprite the useSprite to be given addtional functionality
     */
    constructor(useSprite:UseSprite){
        super(useSprite)
        this.setPreviousX(this.getX())
        this.setPreviousY(this.getY())
    }


   


    override elasticMove(direction: string, value: number, duration: number, onUpdate: Function): void {
        super.elasticMove(direction, value, duration, ()=>{
            this.moveChildren()
            onUpdate()
        })
    }


    moveChildren(){
        let differenceX = this.getX() - this.getPreviousX()
        let differenceY = this.getY() - this.getPreviousY()

        for(let sprite of this.getAttachedSprites()){
            sprite.moveY(differenceY, 0)
            sprite.moveX(differenceX, 0)
        }

        this.setPreviousX(this.getX())
        this.setPreviousY(this.getY())
    }
} export default MoveAttached