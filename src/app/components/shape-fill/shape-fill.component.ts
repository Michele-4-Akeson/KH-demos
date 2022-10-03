import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import BaseSprite from '../Decorator/BaseSprite';
import Morphable from '../Decorator/Morphable';
import { Sprite } from '../Decorator/Sprite';
import MorphManager from './MorphManager';

@Component({
  selector: 'app-shape-fill',
  templateUrl: './shape-fill.component.html',
  styleUrls: ['./shape-fill.component.css']
})
export class ShapeFillComponent implements OnInit, AfterViewInit {
  morphManager = new MorphManager()
  @ViewChild('gsvg') parent!:ElementRef<SVGSVGElement>
  @ViewChild('x') x!:ElementRef<SVGSVGElement>
  @ViewChild('p') path!:ElementRef<SVGPathElement>
  @ViewChild('pn') path1!:ElementRef<SVGPathElement>

  constructor() { }
  ngAfterViewInit(): void {
    let a = new BaseSprite(this.x.nativeElement, this.parent.nativeElement)
    let n = new Morphable(a, this.path.nativeElement, 0.5)
    console.log(this.path.nativeElement.getAttribute("x"))

    this.morphManager.addMorphable(n)

    this.x.nativeElement.addEventListener("click", (e)=>{
      console.log("morph")
      this.morphManager.startMorph()
      
    })
  }

  ngOnInit(): void {
  
  }

}
