import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import gsap from 'gsap';
import AssetManager from 'src/KhDecorators/Pattern/AssetManager';
import ScaleOnClick from 'src/KhDecorators/Decorators/ScaleOnClick';
import Sprite from 'src/KhDecorators/Pattern/Sprite';
import UseSprite from 'src/KhDecorators/Pattern/UseSprite';
import GraphManager from './GraphManager';

@Component({
  selector: 'app-manipulative-studio',
  templateUrl: './manipulative-studio.component.html',
  styleUrls: ['./manipulative-studio.component.css']
})

/*
Add form that allows for background images to be added to bar-tool 
https://res.cloudinary.com/dg9cqf9zn/image/upload/v1659473813/barrels2_1_mbrlo2.svg
*/
export class ManipulativeStudioComponent implements OnInit, AfterViewInit {
  @ViewChild('scene') scene!:ElementRef
  graphManager : GraphManager | null = null
  x:number = 0
  y:number = 0
  graphWidth:number = 700
  graphHeight:number = 200
  min : number = 0
  max : number = 700
  increment : number = 200
  barValue = 25


  defs:SVGDefsElement|null = null
  imageUrl:string = ""





  constructor() { }
  ngOnInit(): void {
   
  }



  ngAfterViewInit(): void {
    gsap.set(this.scene.nativeElement, {attr:{viewBox:`${0} ${0} ${this.graphWidth} ${this.graphHeight}`}})
    this.graphManager = new GraphManager(this.scene.nativeElement, this.graphWidth, this.graphWidth, this.min, this.max, this.increment) // need to set viewBox size dynamically 
    this.graphManager.addLines()
    
  }


  onGraphSubmit(){

    /*
    TODO:graph adjustments still need to be completed
    */
    this.graphManager?.setMinMax(this.min, this.max)
    this.graphManager?.setWidthHeight(this.graphWidth, this.graphHeight)
    this.graphManager?.setIncrement(this.increment)
    this.graphManager?.updateLines()
    


  }

  addImage(){

    AssetManager.addImageDef(this.defs!, this.imageUrl, "h1", 100, 100)
    let sprite:UseSprite = AssetManager.createSpriteFromId("h1")
    sprite = new ScaleOnClick(sprite)

    sprite.element.addEventListener("click", (e)=>sprite.onClick())

    this.scene.nativeElement.append(sprite.element)
  }




  onBarSubmit(){
    this.graphManager?.addBar(this.barValue, this.x, this.y)
  }

  

}
