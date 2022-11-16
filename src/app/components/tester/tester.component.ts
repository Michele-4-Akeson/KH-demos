import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import AssetManager from 'src/KhDecorators/Pattern/AssetManager';
import ScaleOnClick from 'src/KhDecorators/Decorators/ScaleOnClick';





@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.css']
})
export class TesterComponent implements OnInit, AfterViewInit {
  @ViewChild('svgref') svgRef!:ElementRef<SVGSVGElement>
  @ViewChild('spritedef') spriteDefs!: ElementRef<SVGSVGElement>



  constructor() {}
  ngAfterViewInit(): void {
    let sprite = AssetManager.createSpriteIn(this.svgRef.nativeElement, "1", 0, 400)
    sprite.element.addEventListener("click", (e)=>sprite.onClick())

    sprite = new ScaleOnClick(sprite)

    sprite.setParent(this.svgRef.nativeElement)


    
  }

  ngOnInit(): void {
    
  }


 
 
}
