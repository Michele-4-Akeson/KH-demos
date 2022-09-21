import gsap from "gsap";
import SvgAbility from "./SvgAbility";
import { SvgEntity } from "./SvgEntity";


interface Point {
    x:number,
    y:number
}


class SnapWithDrag extends SvgAbility{
    points:Point[]
    threshold:number
    constructor(svgEntity:SvgEntity, points:Point[], threshold:number){
        super(svgEntity)
        this.points = points
        this.threshold = threshold
    }



    /**
     * on the event of a "ponterup", this function will determine which point 
     * is the minimum distance from the svg element, and set the position of the 
     * svg element to that point
     * 
     * - If there is no point within the threshold distance, the position of the 
     *   svg will not be set to any of the point positions
     * 
     * @param {PointerEvent} e the pointer event of the mouse touching the svg element
     */
    override drag(e: PointerEvent): void {
        super.drag(e)

        if (e.type == "pointerup"){
            let indexOfPoint = -1
            let minDistance : number | null = null
            for (let i = 0; i < this.points.length; i++){
                let distance = this.getDistance(this.points[i])

                if (distance > this.threshold){
                    console.log(distance)
                    continue
                } else if (!minDistance){
                    minDistance = distance
                    indexOfPoint = i
                } else if (distance < minDistance){
                    minDistance = distance
                    indexOfPoint = i
                } 

              

            }

            if (indexOfPoint != -1){
                gsap.to(this.getElement(), {attr:{x:this.points[indexOfPoint].x, y:this.points[indexOfPoint].y}})
            }
        }
        
    }


    /**
     * @param {Point} point 
     * @returns the distance of the svg Element to the given point, point 
     */
    getDistance(point:Point):number{
        let currentPoint:Point = {x:Number(this.getElement().getAttribute("x")), y:Number(this.getElement().getAttribute("y"))}
        console.log(currentPoint)
        let distanceX = (currentPoint.x - point.x)**2
        let distanceY = (currentPoint.y - point.y)**2
        return Math.sqrt(distanceX + distanceY)

    }



} export default SnapWithDrag