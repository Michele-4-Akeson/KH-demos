import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import gsap from 'gsap';
import AssetManager from 'src/KhDecorators/Pattern/AssetManager';
import Drag from 'src/KhDecorators/Decorators/Drag';
import Weight from 'src/KhDecorators/Decorators/Weight';
import UseSprite from 'src/KhDecorators/Pattern/UseSprite';
import Sprite from 'src/KhDecorators/Pattern/Sprite';
import NumberDisplay from 'src/KhDecorators/Decorators/NumberDisplay';
import VerticalLine from 'src/KhDecorators/Decorators/VerticalLine';
import Strechable from 'src/KhDecorators/Decorators/Strechable';




@Component({
  selector: 'app-balloons',
  templateUrl: './balloons.component.html',
  styleUrls: ['./balloons.component.css']
})
export class BalloonsComponent implements OnInit, AfterViewInit {
  @ViewChild('svgref') svgRef!:ElementRef
  @ViewChild('spritedef') spriteDefs!: ElementRef<SVGSVGElement>
  basket:UseSprite | null = null
  spring:UseSprite | null = null
  weight:number = 65
  canBalloon:boolean = true
  canSandBag:boolean = true


  constructor() { }
  


  ngAfterViewInit(): void {
    setTimeout(()=>{
      AssetManager.createSpriteIn(this.svgRef.nativeElement, "cloud", 300, 150)
      AssetManager.createSpriteIn(this.svgRef.nativeElement, "cloud", 100, 180)
      AssetManager.createSpriteIn(this.svgRef.nativeElement, "cloud", 1100, 200)
      AssetManager.createSpriteIn(this.svgRef.nativeElement, "cloud", 10, 10)
      AssetManager.createSpriteIn(this.svgRef.nativeElement, "cloud", 1000, 50)
      

      this.basket = new Drag(new Weight(AssetManager.createSpriteIn(this.svgRef.nativeElement, "basket", 600, 270)), 'y', null, null)
      let basketBottom = Sprite.getBottomCenter(this.basket)

      AssetManager.createSpriteIn(this.svgRef.nativeElement, "ruler", Sprite.getRight(this.basket), 0)
      AssetManager.createSpriteIn(this.svgRef.nativeElement, "bush", 200, basketBottom[1] - 35)
      AssetManager.createSpriteIn(this.svgRef.nativeElement, "bush", 1100, basketBottom[1] - 35)
      AssetManager.createSpriteIn(this.svgRef.nativeElement, "dirtCircle", basketBottom[0] - 25, basketBottom[1] + 80)
      AssetManager.createSpriteIn(this.svgRef.nativeElement, "dirtCircle", basketBottom[0] - 50, basketBottom[1] + 120)
      AssetManager.createSpriteIn(this.svgRef.nativeElement, "dirtCircle", basketBottom[0] - 80, basketBottom[1] + 20)
      AssetManager.createSpriteIn(this.svgRef.nativeElement, "dirtCircle", basketBottom[0] + 40, basketBottom[1] + 200)
      AssetManager.createSpriteIn(this.svgRef.nativeElement, "dirtCircle", basketBottom[0] + 65, basketBottom[1] + 80)
      AssetManager.createSpriteIn(this.svgRef.nativeElement, "dirtCircle", basketBottom[0] + 45, basketBottom[1] + 100)
      AssetManager.createSpriteIn(this.svgRef.nativeElement, "dirtCircle", basketBottom[0] - 75, basketBottom[1] + 190)


      this.spring = new Strechable(AssetManager.createSpriteIn(this.svgRef.nativeElement, "spring", this.basket.getX() + 25, basketBottom[1]), null, 720)
      this.basket.addSprite(this.spring)
      this.addEnvironment() // sets up the position of elements already in the dom
      this.basket.setParent(this.svgRef.nativeElement) // bring to front of svg


    }, 250)
    
    
  }


  addEnvironment(){
    let basketBottom = Sprite.getBottomCenter(this.basket!)

    let grassLeft = document.getElementById("grassLeft")
    let grassRight = document.getElementById("grassRight")
    gsap.set(grassLeft, {y:basketBottom[1] - 10, attr:{width:this.basket!.getX()}})
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
    let balloon = AssetManager.createSpriteFromId("redBalloon")

    balloon.setParent(this.svgRef.nativeElement)
    balloon.setX(this.basket!.getX() + (Math.random() * (this.basket!.element.getBBox().width - 30)), 0)
    balloon.getPhysics().weight -= this.weight

    balloon.moveWithAction("y", this.basket!.getY() - 100 - (Math.random() * 150), 1, ()=>{
    balloon = new VerticalLine(balloon, this.basket!, "bottom", "top", "white") 
    balloon = new Drag(balloon, 'x,y', null, ()=>this.checkBalloon(balloon, this.basket!)) 
    this.basket!.addSprite(balloon)
    })

  }


  addSandBag(){
    let sandBag = AssetManager.createSpriteFromId("sandBag")
    sandBag.setParent(this.svgRef.nativeElement)
    sandBag.setX(this.basket!.getX() + (Math.random() * (this.basket!.element.getBBox().width - 30)), 0)
    sandBag.getPhysics().weight += this.weight
    sandBag.moveWithAction('y', this.basket!.getY() + (Math.random() * this.basket!.element.getBBox().height + 20), 1, ()=>{
      sandBag = new VerticalLine(sandBag, this.basket!, "top", "top", "white")
      sandBag = new Drag(sandBag, 'x,y', null, ()=>this.checkSandBag(sandBag, this.basket!))
      this.basket!.addSprite(sandBag)
    })
  }



  


  checkBalloon(balloon:UseSprite, basket:UseSprite){
    let balloonCenter = Sprite.getCenter(balloon)
    let basketCenter = Sprite.getTopCenter(basket)
    let distanceX = Math.abs(basketCenter[0] - balloonCenter[0])
    let distanceY = (basketCenter[1] - balloonCenter[1])

    if (distanceX > basket.element.getBBox().width/2){
      this.basket!.removeSprite(balloon)
      balloon.moveWithAction('y', -200, 1.2, ()=>{balloon.destroy()})
    }

    if (distanceY < 0){
      this.basket!.removeSprite(balloon)
      balloon.moveWithAction('y', -200, 1.2, ()=>{balloon.destroy()})

    }

  }



  checkSandBag(sandBag:UseSprite, basket:UseSprite){
    let bagCenter = Sprite.getCenter(sandBag)
    let basketCenter = Sprite.getTopCenter(basket)
    let distanceX = Math.abs(basketCenter[0] - bagCenter[0])
    let distanceY = (basketCenter[1] - bagCenter[1])

    if (distanceX > basket.element.getBBox().width/2){
      this.basket!.removeSprite(sandBag)
      sandBag.moveWithAction('y', -200, 1.2, ()=>{sandBag.destroy()})
    }

    if (distanceY > 0){
      this.basket!.removeSprite(sandBag)
      sandBag.moveWithAction('y', -200, 1.2, ()=>{sandBag.destroy()})

    }

  }


  

  ngOnInit(): void {

  }



}
