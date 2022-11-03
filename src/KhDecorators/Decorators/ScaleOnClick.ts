import gsap from "gsap";
import SpriteAbility from "../Pattern/SpriteAbility";
import UseSprite from "../Pattern/UseSprite";

class ScaleOnClick extends SpriteAbility{
    scale:number = 1
    constructor(useSprite:UseSprite){
        super(useSprite)
    }


    override onClick(): void {
        gsap.to(this.element, {scale:this.scale})

        this.scale += 0.2
        if (this.scale > 2){
            this.scale = 1
        }
        
        super.onClick()
    }
} export default ScaleOnClick