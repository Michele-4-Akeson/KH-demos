import gsap from "gsap"

const svgNS = "http://www.w3.org/2000/svg"

class GroupText{
    parent:SVGSVGElement
    group:SVGGElement
    background:SVGRectElement
    text:SVGTextElement
    paddingX:number = 0
    paddingY:number = 0

    constructor(svgParent:SVGSVGElement, paddingX:number, paddingY:number, fontSize:string){
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
        gsap.to(this.group, {x:x, y:y})
    }

} export default GroupText