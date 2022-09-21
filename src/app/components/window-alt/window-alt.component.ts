import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import gsap from 'gsap';
import BaseSvgEntity from './Decorator/BaseSvgEntity';
import MoveWithDrag from './Decorator/MoveWithDrag';
import { SvgEntity } from './Decorator/SvgEntity';
import TextInput from './Observer/TextInput';
import SvgTextManager from './Observer/SvgTextManager';
import SnapWithDrag from './Decorator/SnapWithDrag';

/**
 * Window-Alt: A proof of concept for dynamically injecting svg <image> and <use> tags
 * via an SVG <text> element
 * 
 * -------------------------
 * https://res.cloudinary.com/dg9cqf9zn/image/upload/v1659473813/barrels2_1_mbrlo2.svg
 */

const svgNS = "http://www.w3.org/2000/svg"


@Component({
  selector: 'app-window-alt',
  templateUrl: './window-alt.component.html',
  styleUrls: ['./window-alt.component.css']
})


export class WindowAltComponent implements OnInit, AfterViewInit {
  @ViewChild('svgref') svgRef!:ElementRef<SVGSVGElement>
  @ViewChild('sprites') spriteDefs!: ElementRef<SVGSVGElement>
  @ViewChild('urlinput') urlInput!:ElementRef<SVGSVGElement>
  @ViewChild('urllist') urllist!:ElementRef<SVGSVGElement>
  @ViewChild('submit') submit!:ElementRef<SVGSVGElement>
  idCounter:number = 0
  y = 100;
  svgTextManager:SvgTextManager = new SvgTextManager()
  currentImage:SVGSVGElement | null = null

  constructor() {}

  ngAfterViewInit(): void {
    let textInput:SvgEntity = new BaseSvgEntity(this.urlInput.nativeElement)
    textInput = new TextInput(textInput, this.svgTextManager)

    textInput.getElement().addEventListener("click", (e:any)=>{
      textInput.click()
    })




    this.submit.nativeElement.addEventListener("click", (e:any)=>{
      this.addImage()
    })


  }

  ngOnInit(): void {

  }





  addImage(){
    //create <image>
    let image:SVGImageElement = document.createElementNS(svgNS, 'image')
    gsap.set(image, {attr:{id:this.idCounter, href:this.urlInput.nativeElement.textContent!, width:100, height:100}})


  
    //add <image> to <defs> 
    this.spriteDefs.nativeElement.appendChild(image)
    this.addSVG()


    // add <text> url
    let urlText = document.createElementNS(svgNS, 'text')
    urlText.textContent = this.urlInput.nativeElement.textContent
    gsap.set(urlText, {attr:{x:20, y:this.y}})
    this.urllist.nativeElement.appendChild(urlText)
    this.y += 25

  }


  addSVG(){
    //create <use>
    let useElement = document.createElementNS(svgNS, 'use')
    let svgElement = document.createElementNS(svgNS, 'svg')
    gsap.set(useElement, {attr:{id:"use" + this.idCounter, href:'#'+this.idCounter}})
    gsap.set(svgElement, {attr:{id:"svg" + this.idCounter}})
    svgElement.appendChild(useElement)


    //add abilities
    let svgEntity:SvgEntity = new BaseSvgEntity(svgElement)
    svgEntity = new MoveWithDrag(svgEntity, this.svgRef.nativeElement)
    svgEntity = new SnapWithDrag(svgEntity, [{x:25, y:25}, {x:450, y:25}, {x:25, y:450}, {x:450, y:450}], 100)



    // add listeners
    useElement.addEventListener("pointerdown", (e)=>{
      svgEntity.drag(e)
    })

    useElement.addEventListener("pointermove", (e)=>{
      svgEntity.drag(e)
    })

    useElement.addEventListener("pointerup", (e)=>{
      svgEntity.drag(e)
    })



    this.svgRef.nativeElement.appendChild(svgElement)
    this.idCounter += 1

  }




}
