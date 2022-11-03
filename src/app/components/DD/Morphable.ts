import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/all";
import { Sprite } from "./Sprite";
import SpriteAbility from "./SpriteAbility";
gsap.registerPlugin(MorphSVGPlugin)

class Morphable extends SpriteAbility{
    morphTarget: SVGPathElement;
    duration: number;
    constructor(sprite:Sprite, morphTarget:SVGPathElement, duration:number){
        super(sprite);
        this.morphTarget = morphTarget;  
        this.duration = duration; 
    }


    setMorphTarget(target:SVGPathElement){
        this.morphTarget = target;
    }


    morph(){
        gsap.to(this.getElement(), {morphSVG:this.morphTarget, duration:0.5})
    }
} export default Morphable