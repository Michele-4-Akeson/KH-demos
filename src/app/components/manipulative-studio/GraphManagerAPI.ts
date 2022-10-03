import gsap from "gsap"
import CompositeBar from "./CompositeBar"

const svgNS = "http://www.w3.org/2000/svg"

class GraphManagerAPI{
    scene: SVGSVGElement
    min:number = 0
    max:number = 0
    width:number = 0
    height:number = 0
    increment = 0
    barHeight = 25
    lines:SVGLineElement[] = []
    bars:CompositeBar[] = []

    constructor(scene:SVGSVGElement, graphWidth:number, graphHeight:number, min:number, max:number, increment:number){
        this.scene = scene
        this.min = min
        this.max = max
        this.width = graphWidth
        this.height = graphHeight
        this.increment = increment
    }


 


    /*
    GRAPH METRICS
    */

    graphRange(){
        return Math.abs(this.min) + Math.abs(this.max)
    }

    numberOfRects():number{
        return Math.ceil(this.graphRange()/this.increment)
    }




    /*
    ELEMENT CREATION
    */

   
    addLines(){
        let numberOfLines = this.numberOfRects() + 2
        for (let i=0; i < numberOfLines && this.increment != 0; i+=1){
            this.createLine(this.increment * i)
        }
        
    }

    addBar(value:number, x:number, y:number){
        let bar = document.createElementNS(svgNS, "g")
        for (let i = 0; i < this.numberOfRects(); i++){
            let rect = document.createElementNS(svgNS, "rect")
            if (i == 0) gsap.set(rect, {attr:{width: value, height:this.barHeight, fill:this.getColor(i), rx:5}, strokeWidth:2, stroke:"white" })
            else gsap.set(rect, {attr:{width: 0, height:this.barHeight, fill:this.getColor(i), rx:5}, strokeWidth:2, stroke:"white" })

            bar.appendChild(rect)
        }

        let compositeBar = new CompositeBar(bar, value, this)
        this.bars.push(compositeBar)
        compositeBar.setBarPosition(x,y)
        this.scene.append(bar)


    }
    
    createLine(x:number){
        let line:SVGLineElement = document.createElementNS(svgNS, "line")
        gsap.set(line, {attr: {x1:x, y1:0, x2:x, y2:"100%", stroke:"black"}})
        this.scene.append(line)
        this.lines.push(line)

    }





    /*
    HELPER FUNCTIONS
    */



    /*
    asPercentOfGraph(num1:number):number{
        return (num1/this.graphRange())*this.width
    }
    */

    getNextLine(x:number):number{
        for (let i = 0; i < this.lines.length; i++){
            if (x < this.lines[i].getBBox().x){
                return this.lines[i].getBBox().x
            }
        }

        return -1

    }

    getColor(n:number):string{
        if (n % 3==0) return "blue"
        else if (n % 2 == 0) return "red" 
        else return "green"

    }

   




} export default GraphManagerAPI