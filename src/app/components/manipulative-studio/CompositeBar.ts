
import { gsap, Draggable } from "gsap/all"
import GraphManagerAPI from "./GraphManagerAPI";

class CompositeBar {
    element: SVGGElement;
    barWidth: number;
    graph: GraphManagerAPI;
    svgPoint: DOMPoint;
   
    constructor(bar:SVGGElement, value:number, graph:GraphManagerAPI){
        this.element = bar
        this.barWidth = value
        this.graph = graph
        this.svgPoint = graph.scene.createSVGPoint()
      
        gsap.registerPlugin(Draggable)
        Draggable.create(this.element, {
            type:'x,y',
            onDragEnd: ()=>{
                this.cut()
            }
        })
        
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
       let endX = startX + this.barWidth

       console.log(startX, endX)
       let lineX = this.graph.getNextLine(startX)
       let rects = this.element.children
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



    /**
     * @param x the x coordinate the bar will be placed
     * @param y the y coordinate the bar will be placed
     */
    setBarPosition(x:number, y:number){
        gsap.to(this.element, {x:x, y:y})

    }



    /**
     * @returns return the position of the element's top left corner relative to the viewBox
     */
    getPositionOfElementInViewBox(){
        this.svgPoint.x = this.element.getBoundingClientRect().x
        let svgMousePosition = this.svgPoint.matrixTransform(this.graph.scene.getScreenCTM()!.inverse())
        return svgMousePosition.x
    }

 

    



} export default CompositeBar