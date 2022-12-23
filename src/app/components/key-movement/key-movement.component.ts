import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import AssetManager from 'src/KhDecorators/Pattern/AssetManager';
import UseSprite from 'src/KhDecorators/Pattern/UseSprite';

@Component({
  selector: 'app-key-movement',
  templateUrl: './key-movement.component.html',
  styleUrls: ['./key-movement.component.css']
})
export class KeyMovementComponent implements OnInit, AfterViewInit {
  @ViewChild('svgref') svgRef!:ElementRef
  @ViewChild('spritedef') spriteDefs!: ElementRef<SVGSVGElement>
  heldKeys:string[] = []
  character:UseSprite|null = null
  speed:number = 5
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.character = AssetManager.createSpriteIn(this.svgRef.nativeElement, "redBalloon", 350, 0)
    this.character.setScale(2)
    
    document.addEventListener("keydown", (e)=>{
      let key = e.key
      console.log(key)
      switch(key){
        case "ArrowUp":
          this.onKeyDown(key)
          break
        case "ArrowDown":
          this.onKeyDown(key)
          break
        case "ArrowRight":
          this.onKeyDown(key)
          break
        case "ArrowLeft":
          this.onKeyDown(key)
          break
      }

      if (this.isKeyDown("ArrowRight") && !this.isKeyDown("ArrowLeft") ) {
        this.character?.moveX(this.speed, 0)
      } 
      
      if (this.isKeyDown("ArrowLeft") && !this.isKeyDown("ArrowRight")) {
        this.character?.moveX(-this.speed, 0)

      }


      if (this.isKeyDown("ArrowUp") && !this.isKeyDown("ArrowDown")){
        this.character?.moveY(-this.speed, 0)

      }

      if (!this.isKeyDown("ArrowUp") && this.isKeyDown("ArrowDown")){
        this.character?.moveY(this.speed, 0)

      }


    })




    document.addEventListener("keyup", (e)=>{
      let key = e.key
      console.log(key)
      switch(key){
        case "ArrowUp":
          this.onKeyUp(key)
          break
        case "ArrowDown":
          this.onKeyUp(key)
          break
        case "ArrowRight":
          this.onKeyUp(key)
          break
        case "ArrowLeft":
          this.onKeyUp(key)
          break
      }
  })
}


  isKeyDown(key:string):boolean{
    return (this.heldKeys.indexOf(key) != -1)
  }



  onKeyDown(key:string){
    if (!this.isKeyDown(key)) this.heldKeys.unshift(key) 
  }
  
  onKeyUp(key:string){
    if (this.isKeyDown(key)){
        let index = this.heldKeys.indexOf(key)
        this.heldKeys.splice(index, 1)
    }
}
 

}
