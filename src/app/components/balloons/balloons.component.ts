import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import gsap from 'gsap';
import AssetManager from 'src/KhDecorators/Pattern/AssetManager';
import Drag from 'src/KhDecorators/Decorators/Drag';
import UseSprite from 'src/KhDecorators/Pattern/UseSprite';
import Sprite from 'src/KhDecorators/Pattern/Sprite';
import VerticalLine from 'src/KhDecorators/Decorators/VerticalLine';
import Strechable from 'src/KhDecorators/Decorators/Strechable';
import GroupText from './GroupText';
import MoveWithChildren from 'src/KhDecorators/Decorators/MoveWithChildren';
import DragWithChildren from 'src/KhDecorators/Decorators/DragWithChildren';




@Component({
  selector: 'app-balloons',
  templateUrl: './balloons.component.html',
  styleUrls: ['./balloons.component.css']
})
export class BalloonsComponent implements OnInit, AfterViewInit {
  @ViewChild('svgref') svgRef!:ElementRef
  @ViewChild('spritedef') spriteDefs!: ElementRef<SVGSVGElement>

  @ViewChild('whiteline') whiteLine!:ElementRef<SVGLineElement>
  basket:UseSprite | null = null
  spring:UseSprite | null = null
  ruler:UseSprite | null = null
  incrementDistance:number = 65
  isRecording:boolean = false
  canAdd:boolean = true
  zoomValue = 0
  recordText:GroupText|null = null

  currentValue:number = 0
  outputOrder:string[] = ["start"]
  outputValues = {start:0, balloonsAdded:0, balloonsRemoved:0, sandBagsAdded:0, sandBagsRemoved:0}
  
  output:string = ""
  


  constructor() { }

  ngAfterViewInit(): void {
    setTimeout(()=>{

      // creates an adds basket UseSprite at position (600, 270) in the svg element
      this.basket = AssetManager.createSpriteIn(this.svgRef.nativeElement, "basket", 600, 270)
      // adds functionality such that when basket moves, all attached sprites move with it
      this.basket = new MoveWithChildren(this.basket)
      // adds functionality such that when the basket is dragged, all attached sprites move with the drag 
      this.basket = new DragWithChildren(this.basket)
      // adds the functionality of being able to drag the basket in the y axis
      this.basket = new Drag(this.basket, 'y', null, null)

      // the y position of the bottom of the basket useSprite
      const basketBottom = Sprite.getBottomCenter(this.basket)[1]
      const basketRight = Sprite.getRight(this.basket)



      // Addition of scene decorations (clouds, bushes, dirt) at random positions in a defined range
      AssetManager.createSpritesInRange(this.svgRef.nativeElement, "cloud", 15, -1220, 4000, 150, -1400, 1.5)
      AssetManager.createSpritesInRange(this.svgRef.nativeElement, "bush", 3, this.basket.getX() - 800, 700, basketBottom - 35, 0, null)
      AssetManager.createSpritesInRange(this.svgRef.nativeElement, "bush", 3, basketRight + 200, 700, basketBottom - 35, 0, null)
      AssetManager.createSpritesInRange(this.svgRef.nativeElement, "dirtCircle", 8, this.basket.getX() + 10, this.basket.element.getBBox().width - 20, basketBottom, 350, 1.2)


      // creates the ruler useSprite at the position which is just right of the basket useSprite
      this.ruler = AssetManager.createSpriteIn(this.svgRef.nativeElement, "ruler", basketRight, 0)
      // creates the spring useSprite with strechable functionality such that it is streched in along the y-axis from the point, 720, inthe svg
      this.spring = AssetManager.createSpriteIn(this.svgRef.nativeElement, "spring", this.basket.getX() + 10, basketBottom)
      this.spring = new Strechable(this.spring, null, 720)
      this.basket.addSprite(this.spring)


 

      //reappends the basket to the svg element such that visually in front of all other elements in that svg
      this.basket.setParent(this.svgRef.nativeElement)
      
      this.zoomIn()

      this.recordText = new GroupText(this.svgRef.nativeElement, 10, 10, "25px")
      this.recordText.group.classList.add("hide")
      gsap.set(this.recordText.group, {y:basketBottom, x:Sprite.getRight(this.ruler)})
      this.moveEquationLine()
    
    }, 450)
    
    
  }



  /**
   * adds a balloon to the basket useSprite when the balloon button is clicked.
   * When a balloon is added, the basket, and all attached sprites will move upwards
   * by increment  
   */
  addBalloon(){
    if (this.canAdd){
      //disables the ability to add more than one a balloon at a time
      this.canAdd = false
      //increments the current value the basket has relative to the ruler/equation
      this.currentValue += 1
      this.outputValues.balloonsAdded += 1
      this.addToOrder(this.outputOrder, "balloonsAdded")
      this.updateOutputValue()

      //disbales drag while balloon is moving basket upwards
      this.basket?.getDraggable()[0].disable()
      let balloon = AssetManager.createSpriteFromId("redBalloon")

      //adds balloon to svg element at a random position both above the basket, and within it left and right side
      balloon.setParent(this.svgRef.nativeElement)
      balloon.setX(this.basket!.getX() + (Math.random() * (this.basket!.element.getBBox().width - 70)), 0)

      //after the balloon has reached its location, the vertical line and draggable functionality is added 
      balloon.callAfterMove("y", this.basket!.getY() - 100 - (Math.random() * 50), 1, ()=>{
        balloon = new VerticalLine(balloon, this.basket!, "bottom", "top", "white") 
        balloon = new Drag(balloon, 'x,y', null, ()=>this.checkBalloon(balloon)) 
        this.basket!.addSprite(balloon)

        // basket is moved upwards
        this.basket?.moveWithUpdate("y", -this.incrementDistance, 1, ()=>{
          this.moveEquationLine()
        
        })

        // after a period of time, the user can add another balloon and drag the basket
        setTimeout(()=>{
          this.canAdd = true
          this.basket?.getDraggable()[0].enable()

        }, 750)

    
    })

    }
    
  }


 

  addSandBag(){
    if (this.canAdd){
      this.canAdd = false

      this.currentValue -= 1
      this.outputValues.sandBagsAdded += 1
      this.addToOrder(this.outputOrder, "sandBagsAdded")
      this.updateOutputValue()

      this.basket?.getDraggable()[0].disable()
      let sandBag = AssetManager.createSpriteFromId("sandBag")
      sandBag.setParent(this.svgRef.nativeElement)
      sandBag.setX(this.basket!.getX() + (Math.random() * (this.basket!.element.getBBox().width - 70)), 0)
      
      
      sandBag.callAfterMove('y', this.basket!.getY() + (Math.random() * this.basket!.element.getBBox().height + 20), 1, ()=>{
        sandBag = new VerticalLine(sandBag, this.basket!, "top", "top", "white")
        sandBag = new Drag(sandBag, 'x,y', null, ()=>this.checkSandBag(sandBag))
        this.basket!.addSprite(sandBag)
        this.basket?.moveWithUpdate("y", this.incrementDistance, 1, ()=>{
          this.moveEquationLine()
        })

        setTimeout(()=>{
          this.canAdd = true
          this.basket?.getDraggable()[0].enable()

        }, 750)
        
      })

     

    }
   
  }


  /**
   * Checks if a balloon useSprite was moved far enough from the basket to be removed
   * from the scene, resulting in the basket and its attached sprites changing position 
   * 
   * @param balloon the useSprite balloon being checked to see if it was moved to 
   * far enough from the basket to be "removed" from the basekt
   */
  checkBalloon(balloon:UseSprite){
    // retrieves the center (x,y) of the basket
    let balloonCenter = Sprite.getCenter(balloon)
    // retireves the top center point of the basket
    let basketCenter = Sprite.getTopCenter(this.basket!)

    let distanceX = Math.abs(basketCenter[0] - balloonCenter[0])
    let distanceY = (basketCenter[1] - balloonCenter[1])

    // checks to see if the distance between the balloon and the basket results in removal of the balloon
    if (distanceX > this.basket!.element.getBBox().width/2 || distanceY < 0){
      this.currentValue -= 1
      this.outputValues.balloonsRemoved += 1
      this.addToOrder(this.outputOrder, "balloonsRemoved")
      this.basket?.removeSprite(balloon)

      // destroys the balloon after moving it upwards from it's current position
      balloon.callAfterMove('y', balloon.getY() - 200, 1.2, ()=>{
        balloon.destroy()
      })

      // basket is moved downwards along with all attached sprites and the equation/line
      this.basket?.moveWithUpdate("y", this.incrementDistance, 1, ()=>{
        this.moveEquationLine()
      })

    } 

    this.updateOutputValue()

  }




  checkSandBag(sandBag:UseSprite){
    let bagCenter = Sprite.getCenter(sandBag)
    let basketCenter = Sprite.getTopCenter(this.basket!)
    let distanceX = Math.abs(basketCenter[0] - bagCenter[0])
    let distanceY = (basketCenter[1] - bagCenter[1])

    if (distanceX > this.basket!.element.getBBox().width/2 || distanceY > 0){
      this.outputValues.sandBagsRemoved += 1
      this.currentValue += 1
      this.addToOrder(this.outputOrder, "sandBagsRemoved")
      this.basket!.removeSprite(sandBag)
      sandBag.callAfterMove('y', sandBag.getY() + 100, 1.2, ()=>{
        sandBag.destroy()
      })

      this.basket?.moveWithUpdate("y", -this.incrementDistance, 1, ()=>{
        this.moveEquationLine()
      })
    }


    this.updateOutputValue()

  }



  /**
   * toggles the visibility of the dashed white line and equation of the basket.
   * Resets the equation such that the first term of the equation is the current value
   * of the basket 
   */
  toggleRecording(){
    this.isRecording=!this.isRecording

    if (this.isRecording){
      this.whiteLine.nativeElement.classList.remove("hide")
      this.recordText!.group.classList.remove("hide")
    } else {
      this.whiteLine.nativeElement.classList.add("hide")
      this.recordText!.group.classList.add("hide")

    }

    this.outputValues.balloonsAdded = 0
    this.outputValues.balloonsRemoved = 0
    this.outputValues.sandBagsAdded = 0
    this.outputValues.sandBagsRemoved = 0
    this.output = ""
    this.outputOrder = ["start"]
    this.outputValues.start = this.currentValue

    this.updateOutputValue()
  }



  /**
   * updates the output of the equation's text such that the addtion 
   * of balloons, and sandbags, and their removal are displayed in the
   * equation in the order that balloons and baskets are added or removed
   */
  updateOutputValue(){
    this.output = ""
    for (let i = 0; i < Object.keys(this.outputValues).length; i++){
      let value = this.outputOrder[i]
      switch(value){
        case "start":
          this.output += " = " + this.signString(this.outputValues[value])
          break
        case "balloonsAdded":
          this.output += " + " + `(${this.signString(this.outputValues[value])})`
          break
        case "balloonsRemoved":
          this.output += " - " + `(${this.signString(this.outputValues[value])})`
          break
        case "sandBagsAdded":
          this.output += " + " +`(${this.signString(-this.outputValues[value])})`
          break
        case "sandBagsRemoved":
          this.output += " - " + `(${this.signString(-this.outputValues[value])})`
          break
      }
    }

    this.recordText?.setText(this.output)
  }

  /**
   * 
   * @param n the value of the number being converted to a signed string
   * @returns return n if n <= 0, "+n" if n > 0
   */
  signString(n:number){
    if (n <= 0){
      return `${n}`

    } else {
      return `+${n}`
    }
  }

  addToOrder(array:string[], s:string){
    if (array.lastIndexOf(s) == -1){
      array.push(s)
    }
  }




  moveEquationLine(){
    const bottomCenter = Sprite.getBottomCenter(this.basket!)
    gsap.set(this.recordText!.group, {y:bottomCenter[1]})
    gsap.set(this.whiteLine.nativeElement!, {attr:{y1:bottomCenter[1] - 5, y2:bottomCenter[1] - 5}})    
  }




  zoomIn(){
    if (this.zoomValue < 4){
      AssetManager.zoomIn(this.svgRef.nativeElement)
      this.zoomValue += 1
      
    }
  }

  zoomOut(){
    if (this.zoomValue > 0){
      AssetManager.zoomOut(this.svgRef.nativeElement)
      this.zoomValue -= 1
     


    }
  }
  

  ngOnInit(): void {

  }



}
