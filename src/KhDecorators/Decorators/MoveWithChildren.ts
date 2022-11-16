import SpriteAbility from "../Pattern/SpriteAbility";
import UseSprite from "../Pattern/UseSprite";

class MoveWithChildren extends SpriteAbility{
    previousX: number;
    previousY: number;
    constructor(useSprite:UseSprite){
        super(useSprite)
        this.previousX = this.getX()
        this.previousY = this.getY()
    }


    override moveWithUpdate(direction: string, value: number, duration: number, onUpdate: Function): void {
        super.moveWithUpdate(direction, value, duration, ()=>{
            this.moveChildren()
            onUpdate()
        })
    }


    moveChildren(){
        let differenceX = this.getX() - this.previousX
        let differenceY = this.getY() - this.previousY

        for(let sprite of this.getAttachedSprites()){
            sprite.moveY(differenceY, 0)
            sprite.moveX(differenceX, 0)
        }

        this.previousX = this.getX()
        this.previousY = this.getY()
    }
} export default MoveWithChildren