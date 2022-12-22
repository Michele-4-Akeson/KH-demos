import gsap from "gsap"
import CompositeBar from "./CompositeBar"
import ControlPoints from "./ControlPoints"


const svgNS = "http://www.w3.org/2000/svg"

class GraphManager{
    scene: SVGSVGElement
    min:number = 0
    max:number = 0
    width:number = 0
    height:number = 0
    increment = 0
    barHeight = 25
    lines:SVGLineElement[] = []
    bars:CompositeBar[] = []
    controlPoints: ControlPoints
    //resizeBar: ResizeBar

    constructor(scene:SVGSVGElement, graphWidth:number, graphHeight:number, min:number, max:number, increment:number){
        this.scene = scene
        this.min = min
        this.max = max
        this.width = graphWidth
        this.height = graphHeight
        this.increment = increment

        //this.resizeBar = new ResizeBar(this, 100, 25)
        //this.resizeBar.init()

        this.controlPoints = new ControlPoints(this)
        this.controlPoints.init()

        
    }


    setMinMax(min:number, max:number){
        this.min = min
        this.max = max
    }

    setWidthHeight(width:number, height:number){
        this.width = width
        this.height = height

        gsap.set(this.scene, {attr:{viewBox:`${0} ${0} ${this.width} ${this.height}`}})
    }

    setIncrement(increment:number){
        if (increment == 0){
            this.increment = 1
        } else {
            this.increment = increment
        }
        
    }


    /**
     * when the graph changes size, updateLines is called
     * to both reset the position of exsisting lines in the 
     * graph and:
     * 
     * 1. Removes lines from the dom that are no longer within 
     *    the graph view
     * 
     * 2. add new lines where not enough lines exsist to 
     *    fill the graph view
     */
    updateLines(){
        let newLines = this.numberOfRects() + 2
        console.log(this.increment, newLines, this.lines.length)
        if (newLines <= this.lines.length){
            let i = 0
            while (i < newLines){
                let pos = i * this.increment
                this.setLine(this.lines[i], pos)
                
                i++
            }

            while (i < this.lines.length){
                this.lines[i].remove()
                this.lines.splice(i, 1)
            }

            
        
        } else {
            let i = 0
            while (i < this.lines.length){
                let pos = i * this.increment
                this.setLine(this.lines[i], pos)
                
                i++
            }

            while (i < newLines){
                let pos = i * this.increment
                this.createLine(pos)
                i++
            }

        }


        this.cutAllBars()
       
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
        this.setLine(line, x)
        this.scene.append(line)
        this.lines.push(line)

    }


    setLine(line:SVGLineElement, x:number){
        gsap.set(line, {attr: {x1:x, y1:0, x2:x, y2:"100%", stroke:"black"}})
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
        let compositeBar = new CompositeBar(value, this.barHeight, this)
        compositeBar.init()
        compositeBar.setBarPosition(x,y)
        compositeBar.cut()
        
        
        this.bars.push(compositeBar)
        this.controlPoints.setCompositeBar(compositeBar)
        //this.resizeBar.setCompositeBar(compositeBar)
    }


    /**
     * calls cut on all compsite bar elements, spliting them between
     * the lines of the graph
     */
    cutAllBars(){
        for (let bar of this.bars){
            bar.cut()
        }
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

   




} export default GraphManager