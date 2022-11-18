import UseSprite from "src/KhDecorators/Pattern/UseSprite";
import ReturnAfterDrag from "./ReturnAfterDrag";

class SpringyDrag extends ReturnAfterDrag{
    constructor(useSprite:UseSprite){
        super(useSprite)
    }

    /**
     * when drag is ended, the useSprite is moved back to it's 
     */
    override onDragEnd(): void {
        // the difference between where the basket is and where it was before the drag started
        let differenceY = this.getY() - this.getPreviousY()
        let differenceX = this.getX() - this.getPreviousX()

        //resets the initial previousY
       
        this.setPreviousY(this.getY())
        console.log(this.getAttachedSprites())
        // moves the element and its attached sprite to its position before it was dragged 
        this.elasticMove('y', -differenceY, 1, ()=>{
           this.moveChildren()
        })

        this.sprite.onDragEnd()

    }


    moveChildren(){
        let diffY = this.getY() - this.getPreviousY()
        for (let sprite of this.getAttachedSprites()){
            sprite.moveY(diffY, 0)
        }

        
        this.setPreviousY(this.getY())
    }

   
} export default SpringyDrag