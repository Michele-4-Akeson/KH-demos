import { ThisReceiver } from "@angular/compiler";
import { Sprite } from "./Sprite";

class BaseSprite implements Sprite{
    element:SVGUseElement | SVGSVGElement
    parent:SVGSVGElement
    constructor(element:SVGUseElement | SVGSVGElement, parent:SVGSVGElement){
        this.element = element
        this.parent = parent
    }


    set(attribute:string, val:any){
        this.element.setAttribute(attribute, val)
    }

    addToScene(scene:any){
        scene.append(this.element)
        this.parent = scene
    }

    getElement(): SVGUseElement |SVGSVGElement {
        return this.element
    }

    getParent(): SVGSVGElement {
        return this.parent
    }
    

    drag(e:PointerEvent): void {}
    click(): void {}
    useKeyEvent(key: string): void {}
  


} export default BaseSprite