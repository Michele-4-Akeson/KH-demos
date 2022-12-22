import { gsap, Draggable } from "gsap/all"
import MoveGroup from "../DD/MoveGroup";
import CompositeBar from "./CompositeBar";
import GraphManager from "./GraphManager";
const svgNS = "http://www.w3.org/2000/svg"

class ResizeBar {
    element: SVGGElement | null = null
    rect : SVGRectElement | null = null
    leftButton: SVGGElement | null = null
    rightButton: SVGGElement | null = null
    xprev = 0

    width: number
    height: number
    graph: GraphManager;
    svgPoint: DOMPoint;

    compositeBar:CompositeBar | null = null
  
    constructor(graph:GraphManager, width:number, height:number){
        this.graph = graph
        this.svgPoint = graph.scene.createSVGPoint()
        this.width = width
        this.height = height
        
    }


    /**
     * Decouple rect, left, right control points, to be just sperate elements not in same group
     * 
     * -- don't need cirlce to be group -> just have circle with border stroke
     * -- control dots should be hidden when composite bar is moved, and visible when not moving
     * -- 
     */

    /**
     * creates the html elements for the ResizeBar and adds it to the graph
     */
    init(){
        this.element = document.createElementNS(svgNS, "g")
        
        //rect
        //should be seperate and not a child -- 
        this.rect = document.createElementNS(svgNS, "rect")
        gsap.set(this.rect, {attr:{width:this.width, height:this.height, fill:"none"}, stroke:"gray", strokeWidth:3, strokeDasharray:"10 15"})
        
        this.leftButton = document.createElementNS(svgNS, "g")
        this.rightButton = document.createElementNS(svgNS, "g")


        // alternative -- scaleX ->> .element to ensure correct position
        this.makeControlButton(this.leftButton, 0, this.height/2)
        this.makeControlButton(this.rightButton, this.width, this.height/2)

        this.element.append(this.rect)
        this.element.append(this.leftButton)
        this.element.append(this.rightButton)
        this.graph.scene.append(this.element)

        gsap.set(this.element, {x:30, y:30})
        gsap.registerPlugin(Draggable)




        //ASK ANDREW IF A BETTER APPROACH EXSISTS TO MOVE
        //ELEMENTS WITH ANOTHER
        Draggable.create(this.leftButton, {
            type:'x',
            onDrag: ()=>{
                let x1 = this.getViewBoxX(this.leftButton)
                let x2 = this.getViewBoxX(this.rightButton)
                let transform = (this.leftButton?.getAttribute("transform"))
                
                let barWidth = x2 - x1 // calculates the width of the bar in pixels

                gsap.set(this.rect, {transform:transform!, width: barWidth})

                // if compositeBar, set the width of the composite bar to be the
                // width of the resize rect and set the x position of the composite
                //bar to be the position of the rect
                if (this.compositeBar) {
                    this.compositeBar.setWidth(barWidth)
                    let x = this.getViewBoxX(this.rect)
                    this.compositeBar.setX(x)
                }
                
            }
        })


        gsap.registerPlugin(Draggable)
        Draggable.create(this.rightButton, {
            type:'x',
            onDrag: ()=>{
                let x1 = this.getViewBoxX(this.leftButton)
                let x2 = this.getViewBoxX(this.rightButton)
                let newWidth = x2 - x1
                gsap.set(this.rect, {width: newWidth})  
                if (this.compositeBar) this.compositeBar.setWidth(newWidth)

            }
        })
        
    }


    setCompositeBar(bar:CompositeBar){
        this.compositeBar = bar
        let barX = this.compositeBar.x
        let barY = this.compositeBar.y
        //console.log(barX, barY)
        this.setWidth(this.compositeBar.width)
        gsap.set(this.element, {x:barX, y:barY})

       this.graph.scene.removeChild(this.element!)
       this.graph.scene.append(this.element!)

       //this.compositeBar.resizeBar = this


        
    }



    /**
     * @param group the <g> element the set of circles will be added to
     * @param x the x position of the button
     * @param y the y position of the button
     */
    makeControlButton(group:SVGGElement, x:number, y:number){
        let outerCircle = document.createElementNS(svgNS, "circle")
        let innerCircle = document.createElementNS(svgNS, "circle")
        group.append(outerCircle)
        group.append(innerCircle)

        gsap.set(outerCircle, {attr:{fill:"rgba(1, 1, 1, 0.2)", r:12, cx:x, cy:y}})
        gsap.set(innerCircle, {attr:{fill:"white", r:5, cx:x, cy:y}})

    }






    //////////////////////////////////
    // HELPER FUNCTIONS
    //////////////////////////////////

    setWidth(width:number){
        gsap.set(this.rect, {attr:{width:width}})
        let w = Number(this.rect!.getAttribute("width"))
        gsap.to(this.rightButton, {attr:{x:width}})
       
    }

    
    /**
     * @returns return the position of the element's top left corner relative to the viewBox
     */
     getPositionOfElementInViewBox(){
        this.svgPoint.x = this.element!.getBoundingClientRect().x
        let svgMousePosition = this.svgPoint.matrixTransform(this.graph.scene.getScreenCTM()!.inverse())
        return svgMousePosition.x
    }


    getViewBoxX(element:any){
        this.svgPoint.x = element!.getBoundingClientRect().x
        let svgMousePosition = this.svgPoint.matrixTransform(this.graph.scene.getScreenCTM()!.inverse())
        return svgMousePosition.x

    }








    

} export default ResizeBar