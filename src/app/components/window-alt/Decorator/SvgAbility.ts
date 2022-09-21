import { SvgEntity } from "./SvgEntity";

class SvgAbility implements SvgEntity{
    svgEntity:SvgEntity
    constructor(svgEntity:SvgEntity){
        this.svgEntity = svgEntity
    }
  
  
    getElement(): SVGSVGElement {
        return this.svgEntity.getElement()
    }
    

    click(): void {
        this.svgEntity.click()
    }


    drag(e:any): void {
        this.svgEntity.drag(e)
    }


    useKeyEvent(key: string): void {
        this.svgEntity.useKeyEvent(key)
    }

} export default SvgAbility