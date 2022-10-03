import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {gsap, Draggable} from 'gsap/all';

@Component({
  selector: 'app-clip-template',
  templateUrl: './clip-template.component.html',
  styleUrls: ['./clip-template.component.css']
})
export class ClipTemplateComponent implements OnInit, AfterViewInit {
  @ViewChild("clip") clip!:ElementRef
  timeline = gsap.timeline({repeat:-1, yoyo:true})
  constructor() { 

  }
  ngAfterViewInit(): void {
    
    this.timeline.to(this.clip.nativeElement, {x:-50})
    this.timeline.to(this.clip.nativeElement, {x:-30, y:60})
    this.timeline.to(this.clip.nativeElement, {x:-60, y:60})


    this.timeline.play()
    
  }
  ngOnInit(): void {
    
  }

}
