import {gsap, Draggable} from "gsap/all"
import CompositeBar from "./CompositeBar"
import GraphManager from "./GraphManager"
const svgNS = "http://www.w3.org/2000/svg"

class ControlPoints{
    leftControl:SVGCircleElement | null = null
    rightControl:SVGCircleElement | null = null
    compositeBar:CompositeBar | null = null
    graph: GraphManager
    svgPoint: DOMPoint


    constructor(graph:GraphManager){
        this.graph = graph
        this.svgPoint = graph.scene.createSVGPoint()

    }


    init(){
        this.leftControl = document.createElementNS(svgNS, "circle")
        this.rightControl = document.createElementNS(svgNS, "circle")

        gsap.set(this.leftControl, {attr:{fill:"white", r:6, cx:50, cy:0}, strokeWidth:4, stroke:"rgba(1, 1, 1, 0.2)"})
        gsap.set(this.rightControl, {attr:{fill:"white", r:6, cx:50, cy:0},  strokeWidth:4, stroke:"rgba(1, 1, 1, 0.2)"})

        this.graph.scene.append(this.leftControl)
        this.graph.scene.append(this.rightControl)

        gsap.registerPlugin(Draggable)
        Draggable.create(this.leftControl, {
            type:'x',
            onDrag: ()=>{
                let leftX = this.getPositionOfElementInViewBox(this.leftControl).x
                let rightX = this.getPositionOfElementInViewBox(this.rightControl).x
                let width = rightX - leftX
                //console.log(leftX, rightX)
                if (this.compositeBar) {
                    this.compositeBar.setWidth(width)
                    this.compositeBar.setX(leftX)
                }

            }
        })

        Draggable.create(this.rightControl, {
            type:'x',
            onDrag: ()=>{
                let leftX = this.getPositionOfElementInViewBox(this.leftControl).x
                let rightX =  this.getPositionOfElementInViewBox(this.rightControl).x
                let width = rightX - leftX
                //console.log(leftX, rightX, width)
                if (this.compositeBar) this.compositeBar.setWidth(width)
                

            }
        })
    }



    setCompositeBar(compositeBar:CompositeBar){
        this.compositeBar = compositeBar
        compositeBar.controlPoints = this
        let x = Number(gsap.getProperty(compositeBar, "x"))
        let y = Number(gsap.getProperty(compositeBar, "y"))
        let width = compositeBar.width
        let height = compositeBar.height
        gsap.set(this.leftControl, {attr:{cx: x, cy:y + height/2}})
        gsap.set(this.rightControl, {attr:{cx: x + width, cy:y + height/2}})
        console.log(x, y)
        this.bringToFront(this.leftControl, this.graph.scene)
        this.bringToFront(this.rightControl, this.graph.scene)
        this.reveal()
        
    }




    hide(){
        this.leftControl?.classList.add("hide")
        this.rightControl?.classList.add("hide")
    }

    reveal(){
        this.leftControl?.classList.remove("hide")
        this.rightControl?.classList.remove("hide")
    }

    
    setPosition(){
        if (this.compositeBar){
            let transform = gsap.getProperty(this.compositeBar!.element, "transform")
            console.log(transform)
            gsap.set(this.leftControl, {transform:transform})
            gsap.set(this.rightControl, {transform:transform, cx:this.compositeBar.width})

        }
      
    }


    ///////////////////
    // HELPER FUNCTIONS
    ///////////////////



        /**
     * @returns return the position of the element's top left corner relative to the viewBox
     */
        getPositionOfElementInViewBox(element:any){
            this.svgPoint.x = element.getBoundingClientRect().x
            this.svgPoint.y = element.getBoundingClientRect().y
            
            let svgMousePosition = this.svgPoint.matrixTransform(this.graph.scene.getScreenCTM()!.inverse())
            return svgMousePosition
        }

     

        bringToFront(element:any, parent:any){
            parent.removeChild(element)
            parent.append(element)

        }
} export default ControlPoints