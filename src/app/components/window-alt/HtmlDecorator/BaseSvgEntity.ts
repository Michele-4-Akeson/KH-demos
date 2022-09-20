import { SvgEntity } from "./SvgEntity";

class BaseSvgEntity implements SvgEntity{
    element:SVGSVGElement

    constructor(element:SVGSVGElement){
        this.element = element
    }
    
    getElement(): SVGSVGElement {
        return this.element
    }
    

    drag(e:any): void {}
  

  


    click(): void {}



    useKeyEvent(key: string): void {}


} export default BaseSvgEntity