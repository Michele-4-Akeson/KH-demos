import gsap from "gsap";
import AssetManager from "src/KhDecorators/Pattern/AssetManager";
import Sprite from "src/KhDecorators/Pattern/Sprite";
import UseSprite from "src/KhDecorators/Pattern/UseSprite";
import SvgText from "./SvgText";
import SymbolText from "./SymbolText";
const svgNS = "http://www.w3.org/2000/svg"


// TODO: work on how to reset equation after record button is clicked again - balloons and items remain

class SymbolGroup extends SvgText{
    startText: SvgText;
    plusBalloon: SymbolText;
    minusBalloon: SymbolText;
    plusSandbag: SymbolText;
    minusSandbag: SymbolText;
    constructor(svgParent:SVGSVGElement, symbol1:string, symbol2:string, paddingX:number, paddingY:number, fontSize:string){
        super(svgParent, paddingX, paddingY, fontSize)
        this.startText = new SvgText(this.group, 0, 0, fontSize)
        this.text.style.visibility = "hidden"
        this.plusBalloon = new SymbolText(this.group, AssetManager.createSpriteIn(svgParent, symbol1, 0 ,0), 5, 0, fontSize)
        this.minusBalloon = new SymbolText(this.group, AssetManager.createSpriteFromId(symbol1), 5, 0, fontSize)
        this.plusSandbag = new SymbolText(this.group, AssetManager.createSpriteIn(svgParent, symbol2, 0 ,0), 5, 0, fontSize)
        this.minusSandbag = new SymbolText(this.group, AssetManager.createSpriteFromId(symbol2), 5, 0, fontSize)
        
      

    }

    override setText(text: string): void {
        super.setText(text)
    }

  override toggle(): void {
      if (this.visible){
        this.setVisible(false)
      } else {
        this.setVisible(true)
        
      }
  }


  override setVisible(state: boolean): void {
    super.setVisible(state)
    if (!this.visible){
      this.plusBalloon.setVisible(state)
      this.minusBalloon.setVisible(state)
      this.plusSandbag.setVisible(state)
      this.minusSandbag.setVisible(state)
    }
    
  }

    override applyOrderedValues(values: Object, order: string[]): void {
        let previousX = this.group.getBBox().left
        let output = ""
        console.log(order.length)
        for (let i = 0; i < Object.entries(values).length && i < order.length; i++){
            console.log(i)
            let next = order[i]
            switch(next){
              case "start":
                output = " = " + this.signString(Sprite.getProperty(values, next))
                this.startText.setText(output)
                previousX = this.startText.getRight() + this.paddingX
                this.startText.setVisible(true)
                break
              case "balloonsAdded":
                output = " + " + `${Sprite.getProperty(values, next)}`
                this.plusBalloon.setText(output)
                this.plusBalloon.move(previousX, 0)
                this.plusBalloon.moveSymbol(null, this.startText.getMiddle())
                previousX = this.plusBalloon.getRight() + this.paddingX
                this.plusBalloon.setVisible(true)
                break
              case "balloonsRemoved":
                output = " - " + `${(Sprite.getProperty(values, next))}`
                this.minusBalloon.setText(output)
                this.minusBalloon.move(previousX, 0)
                this.minusBalloon.moveSymbol(null, this.startText.getMiddle())
                previousX = this.minusBalloon.getRight() + this.paddingX
                this.minusBalloon.setVisible(true)

                break
              case "sandBagsAdded":
                output = " + " +`${(Sprite.getProperty(values, next))}`
                this.plusSandbag.setText(output)
                this.plusSandbag.move(previousX, 0)
                this.plusSandbag.moveSymbol(null, this.startText.getMiddle())
                previousX = this.plusSandbag.getRight() + this.paddingX
                this.plusSandbag.setVisible(true)

                break
              case "sandBagsRemoved":
                output = " - " + `${(Sprite.getProperty(values, next))}`
                this.minusSandbag.setText(output)
                this.minusSandbag.move(previousX, 0)
                this.minusSandbag.moveSymbol(null, this.startText.getMiddle())
                previousX = this.minusSandbag.getRight() + this.paddingX
                this.minusSandbag.setVisible(true)

                break
            }
          }

          let bbox = this.startText.group.getBBox()
          gsap.set(this.background, {x:bbox.x - this.paddingX/2, y:bbox.y - this.paddingY/2, width:bbox.x + previousX + this.paddingX, height:bbox.height + this.paddingY})
     
    }




    

  



} export default SymbolGroup