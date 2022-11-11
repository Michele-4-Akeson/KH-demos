import gsap from "gsap"
import Sprite from "./Sprite"
import UseSprite from "./UseSprite"
const svgNS = "http://www.w3.org/2000/svg"
class AssetManager {
    static idCount:number = 0

    /**
     * @param id the id of the <image> to be referneced
     * @returns a Sprite object which contains the <use> tag that references the <image> with id
     */
    static createSpriteFromId(id:string):UseSprite{
        let useSprite = document.createElementNS(svgNS, "use")
        useSprite.setAttribute("href", "#" + id)
        let sprite = new Sprite(useSprite)

        return sprite
    }


    /**
     * adds an image to a defs element allowing for a use element to be generated from
     * that image
     * 
     * @param defElement the <defs> element where the <image> will be added
     * @param url the url of the <image> to be added
     * @param id the id of the <image> to be added
     * @param width the width of the <image>
     * @param height the height of the <image>
     */
    static addImageDef(defElement:SVGDefsElement, url:string, id:string, width:number, height:number){
        let image:SVGImageElement = document.createElementNS(svgNS, 'image')
        gsap.set(image, {attr:{id:id, href:url, width:width, height:height}})

        //add <image> to <defs> 
        defElement.append(image)
    }




    //////////////////////////////////////////
    // HELPER FUNCTIONS - Keep or remove
    //////////////////////////////////////////

    /**
     * @returns a sprite referencing a use tag of the last image added 
     * to defs
     */
     static createSprite():UseSprite{
        let useSprite = document.createElementNS(svgNS, "use")
        useSprite.setAttribute("href", "#" + this.idCount)
        let sprite = new Sprite(useSprite)

        return sprite
    }


    /**
     * 
     * @param parent the parent element the use element will be a child of
     * @param id the id of the element to be referenced in the defs
     * @param x the x position the sprite will be located
     * @param y the y position the sprite will be located
     * @returns returns a UseSprite 
     */
    static createSpriteIn(parent:SVGSVGElement, id:string, x:number, y:number):UseSprite{
        let useSprite = document.createElementNS(svgNS, "use")
        useSprite.setAttribute("href", "#" + id)
        let sprite = new Sprite(useSprite)
        sprite.setParent(parent)
        
        sprite.setX(x, 0)
        sprite.setY(y, 0)
        

        return sprite
        
    }

    static createSpritesInRange(parent:SVGSVGElement, id:string, count:number, startX:number, startY:number, rangeX:number, rangeY:number, scaleRange:number|null):void{
        let positions:number[][] = []

        while (count > 0){
            let randomX = startX + Math.random() * rangeX
            let randomY = startY + Math.random() * rangeY

            // if not already in positions array, add
            if (positions.indexOf([randomX, randomY]) == -1){
                positions.push([randomX, randomY])
                let sprite = this.createSpriteIn(parent, id, randomX, randomY)
                if (scaleRange){
                    let randomScale = (Math.random() + 1) * scaleRange
                    sprite.setScale(randomScale)
                } 

                count -= 1

            } else {
                continue
            }
        }
    }



    /**
     * adds an image with id equal to idCount - sprites can now be created to reference 
     * this image element either implictly, or explicitly by using the id number
     * @param defElement the defs element where the image will be added
     * @param url the url of the image to be added
     * @param width the width of the image
     * @param height the height of the image
     */
    static addImage(defElement:SVGDefsElement, url:string, width:number, height:number){
        this.idCount += 1
        let image:SVGImageElement = document.createElementNS(svgNS, 'image')
        gsap.set(image, {attr:{id:this.idCount, href:url, width:width, height:height}})
        //add <image> to <defs> 
        defElement.append(image)
    }

    static zoomIn(parentSVG:SVGSVGElement){
        let viewBox = parentSVG.viewBox["baseVal"]
        let x = viewBox.x + viewBox.width / 4;
        let y = viewBox.y + viewBox.height / 4;
        let width = viewBox.width / 2;
        let height = viewBox.height / 2;

        gsap.to(parentSVG, { attr: { viewBox: `${x} ${y} ${width} ${height}` } });
    }

    static zoomOut(parentSVG:SVGSVGElement){
        let viewBox = parentSVG.viewBox["baseVal"]
        let x = viewBox.x - viewBox.width / 2;
        let y = viewBox.y - viewBox.height / 2;
        let width = viewBox.width * 2;
        let height = viewBox.height * 2;

        gsap.to(parentSVG, { attr: { viewBox: `${x} ${y} ${width} ${height}` } });

    }
   


    
} export default AssetManager