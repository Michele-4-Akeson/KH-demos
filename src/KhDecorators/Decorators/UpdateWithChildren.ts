import gsap, { TweenLite } from "gsap";
import SpriteAbility from "../Pattern/SpriteAbility";
import UseSprite from "../Pattern/UseSprite";

class UpdateWithChildren extends SpriteAbility{
    self:UseSprite = this
    constructor(useSprite:UseSprite){
        super(useSprite)

    }



    override moveX(x: number, duration: number): void {
        gsap.to(this.element, {x:x, duration:duration, onUpdate:this.updateChildren, onUpdateParams:[this.self]})
    }

    override moveY(y: number, duration: number): void {
        gsap.to(this.element, {y:y, duration:duration, onUpdate:()=>this.updateChildren(this)})
    }


    updateChildren(useSprite:UseSprite){
    
        const tween = this as unknown as gsap.TweenVars
        let x = tween['_targets'][0].x.animVal
        console.log(gsap.getProperty(tween['_targets'][0], "x"))
        /*
        for (let sprite of this.getAttachedSprites()){
            sprite.moveX(tween.target.x, 1)
            sprite.moveY(tween.target.y, 1)

        }
        */
    }
} export default UpdateWithChildren