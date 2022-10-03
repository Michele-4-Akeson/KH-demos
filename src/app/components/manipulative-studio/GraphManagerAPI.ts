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

    /**
     * @returns the absolute range of the graph (ex. if the graph is from -100 to 100, the range is 200)
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

   /**
    * adds SVGLine elements to the svg parent based on the increment of the graph
    * (ex. If the graph is from 0 to 100, and increments by 25, there is a line at: x=0, x=25, x=50, x=75, x=100) 
    */
    addLines(){
        let numberOfLines = this.numberOfRects() + 2
        for (let i=0; i < numberOfLines && this.increment != 0; i+=1){
            this.createLine(this.increment * i)
        }
        
    }

    /**
     * creates an SVGLineElement and appends to the svg parent at the position, x
     * @param x the position in pixels the line should be located in the graph
     */
    createLine(x:number){
        let line:SVGLineElement = document.createElementNS(svgNS, "line")
        gsap.set(line, {attr: {x1:x, y1:0, x2:x, y2:"100%", stroke:"black"}})
        this.scene.append(line)
        this.lines.push(line)

    }


    /**
     * creates and adds a bar element to the svg parent at position (x, y), with 
     * a pixel width equal to value
     * 
     * Note: the value in pixels doesn't need to be converted as it is relative to 
     * the viewbox of the parent (if the viewBox="0, 0, 100, 200"), a value of 25 
     * will be displayed as a quater of the graphs width as the width of the graph is 100
     * 
     * @param value the value of the bar (which corresponds to its width)
     * @param x the x coordinate the bar will be placed
     * @param y the y coordinate the bar will be placed
     */
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

        compositeBar.cut()


    }
    
    





    /*
    HELPER FUNCTIONS
    */



    /*
    asPercentOfGraph(num1:number):number{
        return (num1/this.graphRange())*this.width
    }
    */


    /**
     * @param x 
     * @returns the x position of the closest line in the graph that is right of parameter, x
     */
    getNextLine(x:number):number{
        for (let i = 0; i < this.lines.length; i++){
            if (x < this.lines[i].getBBox().x){
                return this.lines[i].getBBox().x
            }
        }

        return -1

    }


    /**
     * 
     * @param n the number of the rect in the bar element
     * @returns a color for the fill of a rect based on its index in its <g> parent
     */
    getColor(n:number):string{
        if (n % 3==0) return "blue"
        else if (n % 2 == 0) return "red" 
        else return "green"

    }

   




} export default GraphManagerAPI