import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import gsap from 'gsap';
import BaseHtmlEntity from './HtmlDecorator/BaseHtmlEntity';
import { HtmlEntity } from './HtmlDecorator/HtmlEntity';
import TextInput from './HtmlDecorator/TextInput';
import SVGTextManager from './SVGTextManager';


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
 
export class WindowAltComponent implements OnInit, AfterViewInit {
  @ViewChild('svgref') svgRef!:ElementRef<HTMLElement>
  @ViewChild('sprites') spriteDefs!: ElementRef<HTMLElement>
  @ViewChild('urlinput') urlInput!:ElementRef<HTMLElement>
  @ViewChild('urllist') urllist!:ElementRef<HTMLElement>
  @ViewChild('xinput') positionInput!:ElementRef<HTMLElement>
  @ViewChild('submit') submit!:ElementRef<HTMLElement>
  idCounter:number = 0
  y = 100;
  svgTextManager:SVGTextManager = new SVGTextManager()
  currentImage:HTMLElement | null = null

  constructor() {}
  ngAfterViewInit(): void {
    let textInput:HtmlEntity = new BaseHtmlEntity(this.urlInput.nativeElement)
    textInput = new TextInput(textInput, this.svgTextManager)

    textInput.getElement().addEventListener("click", (e:any)=>{
      textInput.click()
    })


    let xtextInput:HtmlEntity = new BaseHtmlEntity(this.positionInput.nativeElement)
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


    //create <use>
    let useElement = document.createElementNS(svgNS, 'use')
    let xposition = Number(this.positionInput.nativeElement.textContent)
    let yPosition = Number(this.positionInput.nativeElement.textContent)
    gsap.set(useElement, {attr:{id:"use" + this.idCounter, href:'#'+this.idCounter, x:xposition, y:yPosition}})



    this.svgRef.nativeElement.appendChild(useElement)
    this.idCounter += 1

    let urlText = document.createElementNS(svgNS, 'text')
    urlText.textContent = this.urlInput.nativeElement.textContent
    gsap.set(urlText, {attr:{x:20, y:this.y}})
    this.urllist.nativeElement.appendChild(urlText)
    this.y += 25

  }




}
