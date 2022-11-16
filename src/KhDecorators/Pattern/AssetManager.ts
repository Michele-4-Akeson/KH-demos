import gsap from "gsap"
import Sprite from "./Sprite"
import UseSprite from "./UseSprite"
const svgNS = "http://www.w3.org/2000/svg"
class AssetManager {

    /**
     * @param id the id of the <image> to be referneced
     * @returns a Sprite object which contains the use tag that references the image with id
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
     * Creates a UseSprite and adds it as a child of an svg parent element at the 
     * position of (x, y)
     * @param parent the parent element the use element will be a child of
     * @param id the id of the element to be referenced in the defs
     * @param x the x position the sprite will be located
     * @param y the y position the sprite will be located
     * @returns returns a UseSprite, which is set to be at the given (x, y) position inside
     * the svg parenet element  
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


    /**
     * Creates a number of useSprites that reference the element with id, and places them 
     * in random (x, y) position in the svg parent element, where x is between left and right
     * and y is between top and bottom values provided
     * 
     * @param parent the parent element the use element will be a child of
     * @param id the id of the element to be referenced in the defs
     * @param count the number of useSprites that will be created
     * @param left x position of left bound
     * @param right x posotion of right bound
     * @param top y position of upper bound
     * @param bottom y position of lower bound
     * @param scaleRange the maximum scale a UseSprite could be given (between 1 and scaleRange) -- NULL if no random scale is desired
     */
    static createSpritesInRange(parent:SVGSVGElement, id:string, count:number, left:number, right:number, top:number, bottom:number, scaleRange:number|null):void{
        let positions:number[][] = []

        while (count > 0){
            // gets random x position between left and right
            let randomX = left + Math.random() * right
            // get random y position between top and bottom
            let randomY = top + Math.random() * bottom

            // if no useSprite is at the proivded position, add the useSprite at (randomX, randomY) in svg parent
            if (positions.indexOf([randomX, randomY]) == -1){
                positions.push([randomX, randomY])
                let sprite = this.createSpriteIn(parent, id, randomX, randomY)

                // if a scale range exisit, give the useSprite a random scale between 1 and scaleRange
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
     * Performs a zoom in effect for a given svg element
     * @param parentSVG the svg to be zoomed in
     */
    static zoomIn(parentSVG:SVGSVGElement){
        let viewBox = parentSVG.viewBox["baseVal"]
        let x = viewBox.x + viewBox.width / 4;
        let y = viewBox.y + viewBox.height / 4;
        let width = viewBox.width / 2;
        let height = viewBox.height / 2;

        gsap.to(parentSVG, { attr: { viewBox: `${x} ${y} ${width} ${height}` } });
    }

    /**
     * Performs a zoom out effect for a given svg element
     * @param parentSVG the svg to be zoomed out
     */
    static zoomOut(parentSVG:SVGSVGElement){
        let viewBox = parentSVG.viewBox["baseVal"]
        let x = viewBox.x - viewBox.width / 2;
        let y = viewBox.y - viewBox.height / 2;
        let width = viewBox.width * 2;
        let height = viewBox.height * 2;

        gsap.to(parentSVG, { attr: { viewBox: `${x} ${y} ${width} ${height}` } });

    }
   


    
} export default AssetManager