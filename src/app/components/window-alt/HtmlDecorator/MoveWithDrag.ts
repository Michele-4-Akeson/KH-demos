import gsap from "gsap";
import SvgAbility from "./SvgAbility";
import { SvgEntity } from "./SvgEntity";

class MoveWithDrag extends SvgAbility{
    svgParent:SVGSVGElement
    svgPoint: DOMPoint
    isDragging:boolean = false
    hasCenter:boolean = false
    svgCenter = {x:0, y:0}
    constructor(svgEntity:SvgEntity, svgParent:SVGSVGElement){
        super(svgEntity)
        this.svgParent = svgParent
        this.svgPoint = svgParent.createSVGPoint()


    }


    override drag(e:PointerEvent): void {
        switch(e.type){
            case "pointerdown":
                this.isDragging = true
                this.dragByCenter(e)
                break;
            case "pointermove":
                if (this.isDragging) this.dragByCenter(e)
                break;
            case "pointerup":
                this.isDragging = false
                break;
    
            }
        super.drag(e)
    }


    //////////////////////////////////////////////
    // HELP FUNCTION
    //////////////////////////////////////////////
    /**
     * @param {PointerEvent} event the pointer event of the mouse touching the svg element
     * @returns returns the corrdinates of the mouse within a given svg (relative to that svg)
     */
    getMousePositionInSVG(event:PointerEvent):DOMPoint{
        // gets mouse position within svg
        this.svgPoint.x = event.clientX;
        this.svgPoint.y = event.clientY;
        // gets the coordinates of the mouse in a given svg relative to that svg
        let svgMousePosition = this.svgPoint.matrixTransform(this.svgParent.getScreenCTM()!.inverse())
        return svgMousePosition
    }


    /**
     * sets the svg element to be at position (x,y) within it's respective parent svg
     * @param point 
     */
    setSVGPosition(x:number, y:number){
        gsap.set(this.getElement(), {attr:{x:x, y:y}})
    }


    /**
     * @returns the center point of the svg
     */
    getCenterOfSVG(){
        let bbox = this.getElement().getBBox()
        let centerX = bbox.x + bbox.width/2
        let centerY = bbox.y + bbox.height/2 
        this.svgCenter.x = centerX
        this.svgCenter.y = centerY
        this.hasCenter = true
    }



    dragByCenter(e:PointerEvent){
        if (!this.hasCenter) this.getCenterOfSVG()
        let touch = this.getMousePositionInSVG(e)
        this.setSVGPosition(touch.x - this.svgCenter.x, touch.y - this.svgCenter.y)
    }
    



} export default MoveWithDrag