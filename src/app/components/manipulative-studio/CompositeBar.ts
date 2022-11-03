
import { gsap, Draggable } from "gsap/all"

import ControlPoints from "./ControlPoints";
import GraphManager from "./GraphManager";
const svgNS = "http://www.w3.org/2000/svg"

class CompositeBar {
    element: SVGGElement | null = null
    rects:SVGRectElement[] = []
    width: number;
    height: number;
    x:number = 0
    y:number = 0
    graph: GraphManager;
    svgPoint: DOMPoint;
    
    controlPoints:ControlPoints|null = null
    ref:globalThis.Draggable[] = []
   
    constructor(width:number, height:number, graph:GraphManager){
        this.width = width
        this.height = height
        this.graph = graph
        this.svgPoint = graph.scene.createSVGPoint()
      
       
        
    }


    /**
     * 
     * creates and adds a bar element to the svg parent at position (x, y), with 
     * a pixel width equal to value
     * 
     * Note: the value in pixels doesn't need to be converted as it is relative to 
     * the viewbox of the parent (if the viewBox="0, 0, 100, 200"), a value of 25 
     * will be displayed as a quater of the graphs width as the width of the graph is 100
     * 
     */
    init(){
        this.element = document.createElementNS(svgNS, "g")
        let rectCount = this.graph.numberOfRects()
        for (let i = 0; i < rectCount; i++){
            let rect = document.createElementNS(svgNS, "rect")
            let color = this.graph.getColor(i)

            if (i == 0) gsap.set(rect, {attr:{width: this.width, height:this.height, fill:color, rx:5}, strokeWidth:2, stroke:"white" })

            else gsap.set(rect, {attr:{width: 0, height:this.height, fill:color, rx:5}, strokeWidth:2, stroke:"white" })

            this.rects.push(rect)
            this.element.appendChild(rect)
        }

        this.graph.scene.append(this.element)

        gsap.registerPlugin(Draggable)
        this.ref = Draggable.create(this.element, {
            type:'x,y',
            onDragStart:()=>{
                if (this.controlPoints){
                    this.controlPoints.hide()
                    
                    
                }
            },
            onDragEnd: ()=>{
                this.cut()
                if (this.controlPoints){
                    this.controlPoints.reveal()
                    this.controlPoints.setPosition()
                    

                    
                    
                }

            }
        })

    }

    setWidth(width:number){
        this.width = width
        this.cut()

    }

    /**
     * sets the width of each rect in the "bar element" by  
     * checking where the element starts relative to the lines of the graph
     * and where the element ends:
     * 
     * With this data, each rect is iterated over, and the width of that rect is
     * set to be from it's start position to the minimum of either the end position 
     * of the bar element, or the position of the next line in the graph
     */
    cut(){
       let startX = this.getPositionOfElementInViewBox()
       let endX = startX + this.width

       //console.log(startX, endX)
       let lineX = this.graph.getNextLine(startX)
       let rects = this.element!.children
       let distanceFromStart = 0
       let length = 0
       let i = 0
       while (i < rects.length){
        if (endX < lineX){
            length = endX - startX
            gsap.set(rects[i], {attr:{width:length}, x:distanceFromStart})
            i++ 
            break
        } else {
            length = lineX - startX
            gsap.set(rects[i], {attr:{width:length}, x:distanceFromStart})
            distanceFromStart += length
            startX = lineX
            lineX = this.graph.getNextLine(lineX)
            i++ 
        }


       }
       
        while (i < rects.length){
            gsap.set(rects[i], {attr:{width:0}, x:0})
            i++
        }
       
    
    }






    ////////////////////////////
    // HELPER FUNCTIONS
    ////////////////////////////





    /**
     * @param x the x coordinate the bar will be placed
     * @param y the y coordinate the bar will be placed
     */
    setBarPosition(x:number, y:number){
        this.x = x
        this.y = y
        gsap.set(this.element, {x:this.x, y:this.y})

    }

    setX(x:number){
        this.x = x
        gsap.set(this.element, {x:this.x})

    }



    /**
     * @returns return the position of the element's top left corner relative to the viewBox
     */
    getPositionOfElementInViewBox(){
        this.svgPoint.x = this.element!.getBoundingClientRect().x
        let svgMousePosition = this.svgPoint.matrixTransform(this.graph.scene.getScreenCTM()!.inverse())
        return svgMousePosition.x
    }

 

    



} export default CompositeBar