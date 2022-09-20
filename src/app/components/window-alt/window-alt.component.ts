import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import gsap from 'gsap';
import BaseSvgEntity from './HtmlDecorator/BaseSvgEntity';
import MoveWithDrag from './HtmlDecorator/MoveWithDrag';
import { SvgEntity } from './HtmlDecorator/SvgEntity';
import TextInput from './HtmlDecorator/TextInput';
import SvgTextManager from './HtmlObserver/SvgTextManager';



const svgNS = "http://www.w3.org/2000/svg"
//createElementNS(namespace, element) - ensures the element added is considered by  the correct XML software module?



@Component({
  selector: 'app-window-alt',
  templateUrl: './window-alt.component.html',
  styleUrls: ['./window-alt.component.css']
})

/**
 * Window-Alt: A proof of concept for dynamically injecting svg <image> and <use> tags
 * via an SVG <text> element
 * 
 * -------------------------
 * Addtional: The dynamic application of element function
 */

//TODO - Add function to add svg <image> and <use> to page based on text input
//     - apply data from textInputs to manipulate this <use>

//     - Figure out if data can be added and retreived from <input/>


//https://res.cloudinary.com/dg9cqf9zn/image/upload/v1659473813/barrels2_1_mbrlo2.svg
export class WindowAltComponent implements OnInit, AfterViewInit {
  @ViewChild('svgref') svgRef!:ElementRef<SVGSVGElement>
  @ViewChild('sprites') spriteDefs!: ElementRef<SVGSVGElement>
  @ViewChild('urlinput') urlInput!:ElementRef<SVGSVGElement>
  @ViewChild('urllist') urllist!:ElementRef<SVGSVGElement>
  @ViewChild('xinput') positionInput!:ElementRef<SVGSVGElement>
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


    let xtextInput:SvgEntity = new BaseSvgEntity(this.positionInput.nativeElement)
    xtextInput = new TextInput(xtextInput, this.svgTextManager)

    xtextInput.getElement().addEventListener("click", (e:any)=>{
      xtextInput.click()
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

    let urlText = document.createElementNS(svgNS, 'text')
    urlText.textContent = this.urlInput.nativeElement.textContent
    gsap.set(urlText, {attr:{x:20, y:this.y}})
    this.urllist.nativeElement.appendChild(urlText)
    this.y += 25

  }


  addSVG(){
    
    //create <use>
    let useElement = document.createElementNS(svgNS, 'use')
    gsap.set(useElement, {attr:{id:"use" + this.idCounter, href:'#'+this.idCounter}})

    let xposition = Number(this.positionInput.nativeElement.textContent)
    let yPosition = Number(this.positionInput.nativeElement.textContent)
    let groupElement = document.createElementNS(svgNS, 'svg')
    gsap.set(groupElement, {attr:{id:"svg" + this.idCounter, x:xposition, y:yPosition}})

    groupElement.appendChild(useElement)

    //Add Functionality:
    let svgEntity:SvgEntity = new BaseSvgEntity(groupElement)
    svgEntity = new MoveWithDrag(svgEntity, this.svgRef.nativeElement)


    useElement.addEventListener("pointerdown", (e)=>{
      svgEntity.drag(e)
    })

    useElement.addEventListener("pointermove", (e)=>{
      svgEntity.drag(e)
    })

    useElement.addEventListener("pointerup", (e)=>{
      svgEntity.drag(e)
    })

    this.svgRef.nativeElement.appendChild(groupElement)
    this.idCounter += 1

  }




}
