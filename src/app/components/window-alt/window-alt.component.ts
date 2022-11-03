import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import gsap from 'gsap';
import BaseSprite from '../DD/BaseSprite';
import MoveWithDrag from '../DD/MoveWithDrag';
import { Sprite } from '../DD/Sprite';
import TextInput from '../Observer/TextInput';
import SvgTextManager from '../Observer/SvgTextManager';
import SnapWithDrag from '../DD/SnapWithDrag';

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
  @ViewChild('snapinput') snapInput!:ElementRef<SVGSVGElement>
  svgTextManager:SvgTextManager = new SvgTextManager()
  idCounter:number = 0
  y = 100;
  constructor() {}

  //explore reducing reference passing in this pattern -try to stop passing svgEntity

  ngAfterViewInit(): void {
    let textInput:Sprite = new BaseSprite(this.urlInput.nativeElement, this.svgRef.nativeElement)
    textInput = new TextInput(textInput, this.svgTextManager)

    textInput.getElement().addEventListener("click", (e:any)=>{
      textInput.click()
    })

    this.submit.nativeElement.addEventListener("click", (e)=>{
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
    gsap.set(useElement, {attr:{id:"use" + this.idCounter, href:'#'+this.idCounter}})


    //add abilities
    let sprite:Sprite = new BaseSprite(useElement, this.svgRef.nativeElement)
    sprite = new MoveWithDrag(sprite)
    sprite = new SnapWithDrag(sprite, [{x:25, y:25}, {x:450, y:25}, {x:25, y:450}, {x:450, y:450}], 100)




    // add listeners
    useElement.addEventListener("pointerdown", (e)=>{
      sprite.drag(e)
    })

    useElement.addEventListener("pointermove", (e)=>{
      sprite.drag(e)
    })

    useElement.addEventListener("pointerup", (e)=>{
      sprite.drag(e)
    })

    useElement.addEventListener("click", (e)=>{
      console.log(sprite)
    })


    this.svgRef.nativeElement.appendChild(useElement)
    this.idCounter += 1

  }




}
