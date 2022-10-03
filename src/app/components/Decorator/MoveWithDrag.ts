import gsap from "gsap";
import SpriteAbility from "./SpriteAbility";
import { Sprite } from "./Sprite";

class MoveWithDrag extends SpriteAbility{
    svgPoint: DOMPoint
    isDragging:boolean = false
    hasCenter:boolean = false
    svgCenter = {x:0, y:0}
    constructor(sprite:Sprite){
        super(sprite)
        this.svgPoint = sprite.getParent().createSVGPoint()



    }


    /**
     * this function takes a pointer event and moves the stored svg element from its center,
     * to the position of the mouse within the svgParent element
     * @param {PointerEvent} e the pointer event of the mouse touching the svg element
     */
    override drag(e:PointerEvent): void {
        switch(e.type){
            case "pointerdown":
                console.log(this)
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
    // HELPER FUNCTION
    //////////////////////////////////////////////



    /**
     * @param {PointerEvent} event the pointer event of the mouse touching the svg element
     * @returns returns the coordinates of the mouse within a given svg (relative to that svg)
     */
    getMousePositionInSVG(event:PointerEvent):DOMPoint{
        this.svgPoint.x = event.clientX;
        this.svgPoint.y = event.clientY;

        // gets the coordinates of the mouse in a given svg relative to that svg
        let svgMousePosition = this.svgPoint.matrixTransform(this.getParent().getScreenCTM()!.inverse())
        return svgMousePosition
    }


    /**
     * sets the svg element to be at position (x,y) within it's respective parent svg
     * @param {number} x the x coordinate the element will be moved to
     * @param {number} y the y coordinate the element will be moved to 
     */
    setSVGPosition(x:number, y:number){
        gsap.set(this.getElement(), {attr:{x:x, y:y}})
    }


    /**
     * calculates the center of the SVG element stored 
     * in the svgEntity
     * 
     * 
     * getBBox() is only a method of SVGSVGElement
     */
    setCenterOfSVG(){
        let bbox = this.getElement().getBBox()
        let centerX = bbox.width/2
        let centerY = bbox.height/2 
        this.svgCenter.x = centerX
        this.svgCenter.y = centerY
        this.hasCenter = true
    }


    /**
     * moves the svg element from its center by calculating the current mouse position
     * in the svgParent, and then setting the position of the svgEntity element to be at 
     * mouse position, but offset by it center
     * @param {PointerEvent} e the pointer event repersenting when the user is touching this element
     */
    dragByCenter(e:PointerEvent){
        if (!this.hasCenter) this.setCenterOfSVG()
        let touch = this.getMousePositionInSVG(e)
        //console.log(this.svgCenter)
        this.setSVGPosition(touch.x - this.svgCenter.x, touch.y - this.svgCenter.y)
    }
    



} export default MoveWithDrag