import Sprite from "src/KhDecorators/Pattern/Sprite";
import UseSprite from "src/KhDecorators/Pattern/UseSprite";
import SvgText from "./SvgText";

class SymbolText extends SvgText{
    symbol: UseSprite;
    constructor(svgParent:SVGSVGElement|SVGGElement, useSprite:UseSprite, paddingX:number, paddingY:number, fontSize:string){
        super(svgParent,paddingX, paddingY, fontSize)
        this.symbol = useSprite

        this.group.append(this.symbol.element)
    }

    /**
     * @param text the text that will be displayed beside the symbol
     */
    override setText(text: string): void {
        this.text.textContent = text
        let bbox = this.text.getBBox()
        let rightOfText = bbox.x + bbox.width - this.paddingX
        let middleOfText = bbox.y
        this.symbol.setX(rightOfText, 0)
        this.symbol.setY(middleOfText, 0)
    }


    moveSymbol(x:number|null, y:number|null){
        if (x){
            this.symbol.setX(x, 0)
        } 

        if (y){
            this.symbol.setY(y, 0)
        }
    }

  




} export default SymbolText