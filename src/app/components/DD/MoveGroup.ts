import gsap from "gsap";
import MoveWithDrag from "./MoveWithDrag";
import { Sprite } from "./Sprite";
import SpriteAbility from "./SpriteAbility";

class MoveGroup extends MoveWithDrag{
    constructor(sprite:Sprite){
        super(sprite)
    }

    override setSVGPosition(x: number, y: number): void {
        gsap.set(this.getElement(), {x:x, y:y})
    }
} export default MoveGroup