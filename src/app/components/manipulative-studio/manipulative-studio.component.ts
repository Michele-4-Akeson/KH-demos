import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import gsap from 'gsap';
import GraphManagerAPI from './GraphManagerAPI';

@Component({
  selector: 'app-manipulative-studio',
  templateUrl: './manipulative-studio.component.html',
  styleUrls: ['./manipulative-studio.component.css']
})
export class ManipulativeStudioComponent implements OnInit, AfterViewInit {
  @ViewChild('scene') scene!:ElementRef
  graphManagerApi : GraphManagerAPI | null = null
  x:number = 0
  y:number = 0
  graphWidth:number = 700
  graphHeight:number = 200

  barValue = 25
  constructor() { }
  ngOnInit(): void {
   
  }



  ngAfterViewInit(): void {
    gsap.set(this.scene.nativeElement, {attr:{viewBox:`${0} ${0} ${this.graphWidth} ${this.graphHeight}`}})
    this.graphManagerApi = new GraphManagerAPI(this.scene.nativeElement, this.graphWidth, this.graphWidth, 0, this.graphWidth, 100) // need to set viewBox size dynamically 
    this.graphManagerApi.addLines()
    
  }


  onGraphSubmit(){

  }

  onBarSubmit(){
    this.graphManagerApi?.addBar(this.barValue, this.x, this.y)
  }

  

}
