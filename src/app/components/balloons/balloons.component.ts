import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import gsap from 'gsap';
import AssetManager from 'src/KhDecorators/Pattern/AssetManager';
import Drag from 'src/KhDecorators/Decorators/Drag';
import UseSprite from 'src/KhDecorators/Pattern/UseSprite';
import Sprite from 'src/KhDecorators/Pattern/Sprite';
import VerticalLine from 'src/KhDecorators/Decorators/VerticalLine';
import Strechable from 'src/KhDecorators/Decorators/Strechable';
import Weight from 'src/KhDecorators/Decorators/Weight';
import GroupText from './GroupText';




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
  weight:number = 65
  line:UseSprite | null = null
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
      AssetManager.createSpritesInRange(this.svgRef.nativeElement, "cloud", 15, -1220, 150, 4000, -1400, 1.5)

      /**
       * Issue is that bbox of basket is not set when trying to get it's position: bbox = {0, 0, 0, 0} so 
       * when we use our methods that references the bbox, it doesn't do what we want it to
       */
      this.basket = AssetManager.createSpriteIn(this.svgRef.nativeElement, "basket", 600, 270)
      this.basket = new Weight(this.basket)
      this.basket = new Drag(this.basket, 'y', null, null)
      let basketBottom = Sprite.getBottomCenter(this.basket)

      this.ruler = AssetManager.createSpriteIn(this.svgRef.nativeElement, "ruler", Sprite.getRight(this.basket), 0)
      AssetManager.createSpritesInRange(this.svgRef.nativeElement, "bush", 3, this.basket.getX() - 800, basketBottom[1] - 35, 700, 0, null)
      AssetManager.createSpritesInRange(this.svgRef.nativeElement, "bush", 3, Sprite.getRight(this.basket) + 200, basketBottom[1] - 35, 700, 0, null)
      AssetManager.createSpritesInRange(this.svgRef.nativeElement, "dirtCircle", 8, this.basket.getX() + 10, basketBottom[1], this.basket.element.getBBox().width - 20, 350, 1.2)
      

      this.spring = new Strechable(AssetManager.createSpriteIn(this.svgRef.nativeElement, "spring", this.basket.getX() + 10, basketBottom[1]), null, 720)
      this.spring.element.setAttribute("transform-origin", "bottom")
      this.basket.addSprite(this.spring)
      this.addEnvironment() // sets up the position of elements already in the dom
      this.basket.setParent(this.svgRef.nativeElement) // bring to front of svg
      
      this.moveEquation()
      this.zoomIn()

      this.recordText = new GroupText(this.svgRef.nativeElement, 10, 10, "25px")
    

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
      this.currentValue += 1
      this.outputValues.balloonsAdded += 1
      this.add(this.outputOrder, "balloonsAdded")
      this.updateOutputValue()

      this.canAdd = false
      this.basket?.setIsDraggable(false)
      let balloon = AssetManager.createSpriteFromId("redBalloon")

      balloon.setParent(this.svgRef.nativeElement)
      balloon.setX(this.basket!.getX() + (Math.random() * (this.basket!.element.getBBox().width - 70)), 0)
      balloon.getPhysics().weight -= this.weight

      balloon.moveWithAction("y", this.basket!.getY() - 100 - (Math.random() * 50), 1, ()=>{
      balloon = new VerticalLine(balloon, this.basket!, "bottom", "top", "white") 
      balloon = new Drag(balloon, 'x,y', null, ()=>this.checkBalloon(balloon, this.basket!)) 
      this.basket!.addSprite(balloon)
      setTimeout(()=>{
        this.canAdd = true
        this.basket?.setIsDraggable(true)
        this.moveEquation()

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

      this.basket?.setIsDraggable(false)
      let sandBag = AssetManager.createSpriteFromId("sandBag")
      sandBag.setParent(this.svgRef.nativeElement)
      sandBag.setX(this.basket!.getX() + (Math.random() * (this.basket!.element.getBBox().width - 70)), 0)
      sandBag.getPhysics().weight += this.weight
      
      
      sandBag.moveWithAction('y', this.basket!.getY() + (Math.random() * this.basket!.element.getBBox().height + 20), 1, ()=>{
        sandBag = new VerticalLine(sandBag, this.basket!, "top", "top", "white")
        sandBag = new Drag(sandBag, 'x,y', null, ()=>this.checkSandBag(sandBag, this.basket!))
        this.basket!.addSprite(sandBag)
        setTimeout(()=>{
          this.canAdd = true
          this.basket?.setIsDraggable(true)
          this.moveEquation()

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
      balloon.moveWithAction('y', balloon.getY() - 200, 1.2, ()=>{
        balloon.destroy()
        this.moveEquation()
      })

    } else if (distanceY < 0){
      this.add(this.outputOrder, "balloonsRemoved")
      this.currentValue += 1
      this.outputValues.balloonsRemoved += 1
      this.basket!.removeSprite(balloon)
      balloon.moveWithAction('y', balloon.getY() - 200, 1.2, ()=>{
        balloon.destroy()
        this.moveEquation()
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
      sandBag.moveWithAction('y', sandBag.getY() + 100, 1.2, ()=>{
        sandBag.destroy()
        this.moveEquation()

      })

    } else if (distanceY > 0){
      this.currentValue += 1
      this.outputValues.sandBagsRemoved += 1
      this.add(this.outputOrder, "sandBagsRemoved")
      this.basket!.removeSprite(sandBag)
      sandBag.moveWithAction('y', sandBag.getY() + 100, 1.2, ()=>{
        sandBag.destroy()
      })
    }

    this.updateOutputValue()

  }






  toggleRecording(){
    this.isRecording=!this.isRecording
    this.moveEquation()

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
          this.output += " + " + this.signString(this.outputValues[value])
          break
        case "balloonsRemoved":
          this.output += " - " + this.signString(this.outputValues[value])
          break
        case "sandBagsAdded":
          this.output += " + " + this.signString(-this.outputValues[value])
          break
        case "sandBagsRemoved":
          this.output += " - " + this.signString(-this.outputValues[value])
          break
      }
    }

    this.recordText?.setText(this.output)
  }

  signString(n:number){
    if (n < 0){
      return `(${n})`
    } else if (n > 0){
      return `(+${n})`
    } else {
      return `${n}`
    }
  }

  add(array:string[], s:string){
    if (array.lastIndexOf(s) == -1){
      array.push(s)
    }
  }


  moveEquation(){
    let bottom = Sprite.getBottomCenter(this.basket!)[1]
    let rulerRight = Sprite.getRight(this.ruler!)
    this.recordText?.move(rulerRight, bottom)
    gsap.to(this.whiteLine.nativeElement, {attr:{y1:bottom - 5, y2:bottom - 5}})
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
