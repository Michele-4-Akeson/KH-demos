import gsap from "gsap"
import Sprite from "src/KhDecorators/Pattern/Sprite"

const svgNS = "http://www.w3.org/2000/svg"

class SvgText{
    parent:SVGSVGElement|SVGGElement
    group:SVGGElement
    background:SVGRectElement
    text:SVGTextElement
    paddingX:number = 0
    paddingY:number = 0
    visible:boolean = true

    constructor(svgParent:SVGSVGElement|SVGGElement, paddingX:number, paddingY:number, fontSize:string){
        this.parent = svgParent
        this.group = document.createElementNS(svgNS, "g")
        this.text = document.createElementNS(svgNS, "text")
        this.background = document.createElementNS(svgNS, "rect")
        this.paddingX = paddingX
        this.paddingY = paddingY

        gsap.set(this.background, {fill:"white", rx:5})
        this.text.style.fontSize = fontSize
        this.text.style.fontWeight = "bold"

        this.group.append(this.background)
        this.group.append(this.text)
        this.parent.append(this.group)
    }


    setText(text:string){
        this.text.textContent = text
        this.resize()

    }

    resize(){
        let bbox = this.text.getBBox()
        gsap.set(this.background, {x:bbox.x - this.paddingX/2, y:bbox.y - this.paddingY/2, width:bbox.width + this.paddingX, height:bbox.height + this.paddingY})
    }

    move(x:number, y:number){
        gsap.to(this.group, {x:x, y:y, duration:0})
    }

    setVisible(state:boolean){
        this.visible = state
        if (this.visible){
            this.group.classList.remove("hide")
        } else {
            this.group.classList.add("hide")
        }

    }

    toggle(){
        if (this.visible){
            this.group.classList.add("hide")
        } else {
            this.group.classList.remove("hide")
        }

        this.visible = !this.visible
    }


    /**
   * updates the output of the equation's text such that the addtion 
   * of balloons, and sandbags, and their removal are displayed in the
   * equation in the order that balloons and baskets are added or removed
   */
  applyOrderedValues(values:Object, order:string[]){
    let output = ""
    
    for (let i = 0; i < Object.entries(values).length; i++){
      let next = order[i]
      switch(next){
        case "start":
          output += " = " + this.signString(Sprite.getProperty(values, next))
          break
        case "balloonsAdded":
          output += " + " + `(${this.signString(Sprite.getProperty(values, next))})`
          break
        case "balloonsRemoved":
          output += " - " + `(${this.signString(Sprite.getProperty(values, next))})`
          break
        case "sandBagsAdded":
          output += " + " +`(${this.signString(-Sprite.getProperty(values, next))})`
          break
        case "sandBagsRemoved":
          output += " - " + `(${this.signString(-Sprite.getProperty(values, next))})`
          break
      }
    }

    this.setText(output)
  }


    /**
   * 
   * @param n the value of the number being converted to a signed string
   * @returns return n if n <= 0, "+n" if n > 0
   */
     signString(n:number){
        if (n <= 0){
          return `${n}`
    
        } else {
          return `+${n}`
        }
      }
    

    getRight(){
        let bbox = this.group.getBBox()
        let x = gsap.getProperty(this.group, "x") as number
        return x + bbox.width
    }

    getMiddle(){
        let bbox = this.group.getBBox()
        return bbox.y - bbox.height/3


    }

} export default SvgText