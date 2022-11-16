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

  /*
  bbox of basket isn't initalized, thus the width and height are 0; quick fix was to use 
  a timeout and then execute code
  */
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.basket = AssetManager.createSpriteIn(this.svgRef.nativeElement, "basket", 600, 270)
      this.basket = new MoveWithChildren(this.basket)
      this.basket = new DragWithChildren(this.basket)
      this.basket = new Drag(this.basket, 'y', null, null)

      let basketBottom = Sprite.getBottomCenter(this.basket)[1]
      let basketRight = Sprite.getRight(this.basket)

      AssetManager.createSpritesInRange(this.svgRef.nativeElement, "cloud", 15, -1220, 4000, 150, -1400, 1.5)
      AssetManager.createSpritesInRange(this.svgRef.nativeElement, "bush", 3, this.basket.getX() - 800, 700, basketBottom - 35, 0, null)
      AssetManager.createSpritesInRange(this.svgRef.nativeElement, "bush", 3, basketRight + 200, 700, basketBottom - 35, 0, null)
      AssetManager.createSpritesInRange(this.svgRef.nativeElement, "dirtCircle", 8, this.basket.getX() + 10, this.basket.element.getBBox().width - 20, basketBottom, 350, 1.2)
      this.ruler = AssetManager.createSpriteIn(this.svgRef.nativeElement, "ruler", basketRight, 0)


      this.spring = new Strechable(AssetManager.createSpriteIn(this.svgRef.nativeElement, "spring", this.basket.getX() + 10, basketBottom), null, 720)
      this.basket.addSprite(this.spring)
      this.addEnvironment() // sets up the position of elements already in the dom
      this.basket.setParent(this.svgRef.nativeElement) // bring to front of svg
      
      this.zoomIn()

      this.recordText = new GroupText(this.svgRef.nativeElement, 10, 10, "25px")
      this.recordText.group.classList.add("hide")
      gsap.set(this.recordText.group, {y:basketBottom, x:Sprite.getRight(this.ruler)})
      this.moveEquationLine()
    

    }, 450)
    
    
  }


  addEnvironment(){
    let basketBottom = Sprite.getBottomCenter(this.basket!)

    let grassLeft = document.getElementById("grassLeft")
    let grassRight = document.getElementById("grassRight")


    gsap.set(grassLeft, {y:basketBottom[1] - 10})
    gsap.set(grassRight, {x:Sprite.getRight(this.basket!), y:basketBottom[1] - 10, attr:{width:"100%"}})

    let dirtLayer1 = document.getElementById("dirtLayer1")
    let dirtLayer2 = document.getElementById("dirtLayer2")

    gsap.set(dirtLayer1, {y:basketBottom[1]})
    let layer2Y = Number(gsap.getProperty(dirtLayer1, "y")) + Number(gsap.getProperty(dirtLayer1, "height"))
    gsap.set(dirtLayer2, {y:layer2Y})

    let holeLayer1 = document.getElementById("holeLayer1")
    let holeLayer2 = document.getElementById("holeLayer2")

    gsap.set(holeLayer1, {x:this.basket?.getX(), y:basketBottom[1], attr:{width:this.basket!.element.getBBox().width}})
    gsap.set(holeLayer2, {x:this.basket?.getX(), y:layer2Y, attr:{width:this.basket!.element.getBBox().width}})
    
  }


  addBalloon(){
    if (this.canAdd){
      this.canAdd = false
      this.currentValue += 1
      this.outputValues.balloonsAdded += 1
      this.add(this.outputOrder, "balloonsAdded")
      this.updateOutputValue()

      this.basket?.getDraggable()[0].disable()
      let balloon = AssetManager.createSpriteFromId("redBalloon")

      balloon.setParent(this.svgRef.nativeElement)
      balloon.setX(this.basket!.getX() + (Math.random() * (this.basket!.element.getBBox().width - 70)), 0)

      balloon.callAfterMove("y", this.basket!.getY() - 100 - (Math.random() * 50), 1, ()=>{
      balloon = new VerticalLine(balloon, this.basket!, "bottom", "top", "white") 
      balloon = new Drag(balloon, 'x,y', null, ()=>this.checkBalloon(balloon, this.basket!)) 
      this.basket!.addSprite(balloon)



      this.basket?.moveWithUpdate("y", -this.incrementDistance, 1, ()=>{
        this.moveEquationLine()
      
      })




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
      this.add(this.outputOrder, "sandBagsAdded")
      this.updateOutputValue()

      this.basket?.getDraggable()[0].disable()
      let sandBag = AssetManager.createSpriteFromId("sandBag")
      sandBag.setParent(this.svgRef.nativeElement)
      sandBag.setX(this.basket!.getX() + (Math.random() * (this.basket!.element.getBBox().width - 70)), 0)
      
      
      sandBag.callAfterMove('y', this.basket!.getY() + (Math.random() * this.basket!.element.getBBox().height + 20), 1, ()=>{
        sandBag = new VerticalLine(sandBag, this.basket!, "top", "top", "white")
        sandBag = new Drag(sandBag, 'x,y', null, ()=>this.checkSandBag(sandBag, this.basket!))
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


  
  checkBalloon(balloon:UseSprite, basket:UseSprite){
    let balloonCenter = Sprite.getCenter(balloon)
    let basketCenter = Sprite.getTopCenter(basket)
    let distanceX = Math.abs(basketCenter[0] - balloonCenter[0])
    let distanceY = (basketCenter[1] - balloonCenter[1])

    if (distanceX > basket.element.getBBox().width/2){
      this.outputValues.balloonsRemoved += 1
      this.currentValue -= 1
      this.add(this.outputOrder, "balloonsRemoved")
      this.basket!.removeSprite(balloon)
      balloon.callAfterMove('y', balloon.getY() - 200, 1.2, ()=>{
        balloon.destroy()
      })

      this.basket?.moveWithUpdate("y", this.incrementDistance, 1, ()=>{
        this.moveEquationLine()
      })

    } else if (distanceY < 0){
      this.add(this.outputOrder, "balloonsRemoved")
      this.currentValue += 1
      this.outputValues.balloonsRemoved += 1
      this.basket!.removeSprite(balloon)
      balloon.callAfterMove('y', balloon.getY() - 200, 1.2, ()=>{
        balloon.destroy()
      })

      this.basket?.moveWithUpdate("y", this.incrementDistance, 1, ()=>{
        this.moveEquationLine()
      })


    }

    this.updateOutputValue()

  }



  checkSandBag(sandBag:UseSprite, basket:UseSprite){
    let bagCenter = Sprite.getCenter(sandBag)
    let basketCenter = Sprite.getTopCenter(basket)
    let distanceX = Math.abs(basketCenter[0] - bagCenter[0])
    let distanceY = (basketCenter[1] - bagCenter[1])

    if (distanceX > basket.element.getBBox().width/2){
      this.outputValues.sandBagsRemoved += 1
      this.currentValue += 1
      this.add(this.outputOrder, "sandBagsRemoved")
      this.basket!.removeSprite(sandBag)
      sandBag.callAfterMove('y', sandBag.getY() + 100, 1.2, ()=>{
        sandBag.destroy()
      })

      this.basket?.moveWithUpdate("y", -this.incrementDistance, 1, ()=>{
        this.moveEquationLine()
      })

    } else if (distanceY > 0){
      this.currentValue += 1
      this.outputValues.sandBagsRemoved += 1
      this.add(this.outputOrder, "sandBagsRemoved")
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

  signString(n:number){
    if (n < 0){
      return `${n}`
    } else if (n > 0){
      return `+${n}`
    } else {
      return `${n}`
    }
  }

  add(array:string[], s:string){
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
