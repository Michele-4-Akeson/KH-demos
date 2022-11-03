import { Sprite } from "./Sprite";

class SpriteAbility implements Sprite{
    sprite:Sprite
    constructor(sprite:Sprite){
        this.sprite = sprite
    }
  
  
    getElement(): SVGUseElement | SVGSVGElement {
        return this.sprite.getElement()
    }

    getParent(): SVGSVGElement {
        return this.sprite.getParent()
    }
  
    

    click(): void {
        this.sprite.click()
    }


    drag(e:PointerEvent): void {
        this.sprite.drag(e)
    }


    useKeyEvent(key: string): void {
        this.sprite.useKeyEvent(key)
    }

    


} export default SpriteAbility