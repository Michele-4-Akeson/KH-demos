import UseSprite from "../../Pattern/UseSprite";
import VerticalLine from "./VerticalLine";

class WeakLine extends VerticalLine{
    constructor(useSprite:UseSprite, connectTarget:UseSprite, from:string, to:string, color:string){
        super(useSprite, connectTarget, from, to, color)
    }


    override callAfterMove(direction: string, value: number, duration: number, callback: Function): void {
        this.line?.parentElement?.removeChild(this.line)
        super.callAfterMove(direction, value, duration, callback)

    }
} export default WeakLine