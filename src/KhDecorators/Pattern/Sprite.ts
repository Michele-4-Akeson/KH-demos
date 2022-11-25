import gsap from "gsap";
import UseSprite from "./UseSprite";
class Sprite implements UseSprite {
    element: SVGUseElement | SVGGElement | SVGSVGElement;
    parent: SVGSVGElement | null = null
    isDraggable:boolean = true
    dragRef:globalThis.Draggable[] = []
    attachedSprites:UseSprite[] = []
    previousX:number = 0
    previousY:number = 0
   
    
    constructor(svgUseElement:SVGUseElement){
        this.element = svgUseElement
       
    }
   
   
 
  

    ///////////////////////
    // GETTER
    ///////////////////////

    spriteTo(parameters: Object): void {
        gsap.to(this.element, parameters)
    }

    spriteUpdate(parameters: Object, onUpdate: Function): void {
        Sprite.AddObjects(parameters, {onUpdate:onUpdate})
        gsap.to(this.element, parameters)
    }
  
   
    getX():number{
        return gsap.getProperty(this.element, "x") as number
    }

    getY():number{
        return gsap.getProperty(this.element, "y") as number
    }


    getAttachedSprites(): UseSprite[] {
        return this.attachedSprites
    }

    getIsDraggable(): boolean {
        return this.isDraggable
    }


    setIsDraggable(canDrag: boolean): void {
        this.isDraggable = canDrag
        if (this.isDraggable){
            this.dragRef[0].enable()
        } else {
            this.dragRef[0].disable()
        }
    }

    getPreviousX(){
        return this.previousX
    }

    getPreviousY(){
        return this.previousY
    }

    ///////////////////////
    // SETTERS
    ///////////////////////

    getDraggable(): Draggable[] {
        return this.dragRef
    }

    setDraggable(drag: Draggable[]): void {
        this.dragRef = drag
    }

    setScale(scale: number): void {
        gsap.set(this.element, {scale:scale})
    }
    

    addSprite(useSprite: UseSprite): void {
        this.attachedSprites.push(useSprite)
    }

    removeSprite(useSprite: UseSprite): void {
        this.attachedSprites = this.attachedSprites.filter(sprite=>sprite != useSprite)
    }
    

    moveX(x: number, duration: number): void {
        let newX = this.getX() + x
        gsap.to(this.element, {x:newX, duration:duration, onComplete:()=>{this.setPreviousX(this.getX())}})
    }

    
    moveY(y: number, duration: number): void {
        let newY = this.getY() + y
        gsap.to(this.element, {y:newY, duration:duration, onComplete:()=>{this.setPreviousY(this.getY())}})     
    }

    setX(x: number, duration: number): void {
        gsap.to(this.element, {x:x, duration:duration})
        this.previousX = x
    }

    setY(y: number, duration: number): void {
        gsap.to(this.element, {y:y, duration:duration})
        this.previousY = y
    }

    setPreviousX(x:number){
        this.previousX = x

    }

    setPreviousY(y:number){
        this.previousY = y

    }




    setParent(targetParent: SVGSVGElement): void {
        if (this.parent) this.parent.removeChild(this.element)
        targetParent.append(this.element)
        this.parent = targetParent
        
    }

  
    onClick(): void {
        console.log("click")
    }


    onDrag(dragX: number, dragY: number): void {
        console.log("drag")

    }


    onDragEnd(): void {
        console.log("drag ended")
    }
   

    destroy(): void {
        this.parent?.removeChild(this.element)
        for (let sprite of this.attachedSprites){
            sprite.destroy()
        }
    }

    callAfterMove(direction: string, value: number, duration:number, callback: Function): void {
        switch(direction){
            case "x":
                let newX = this.getX() + value
                gsap.to(this.element, {x:newX, duration:duration, onComplete(){callback()}})
                break
            case "y":
                let newY = this.getY() + value
                gsap.to(this.element, {y:newY, duration:duration, onComplete(){callback()}})
                break



        }
    }

    elasticMove(direction: string, value: number, duration: number, onUpdate: Function): void {
        switch(direction){
            case "x":
                let newX = this.getX() + value
                gsap.to(this.element, {x:newX, duration:duration, ease:"elastic", onUpdate:()=>onUpdate()})
                break
            case "y":
                let newY = this.getY() + value
                gsap.to(this.element, {y:newY, duration:duration, ease:"elastic", onUpdate:()=>onUpdate()})
                break



        }
    }

    

    //////////////////////////////////
    // STATIC FUNCTION
    //////////////////////////////////

    /**
     * 
     * @param sprite1 
     * @param sprite2 
     * @returns the distance from the center from both sprites
     */
    static getDistance(sprite1:UseSprite, sprite2:UseSprite){
        let center1 = Sprite.getCenter(sprite1)
        let center2 = Sprite.getCenter(sprite2)
        let xTerm = (center1[0] - center2[0]) ** 2
        let yTerm = (center1[1] - center2[1]) ** 2

        return Math.sqrt(xTerm + yTerm)


    }

    /**
     * 
     * @param useSprite 
     * @returns the center point [x, y] of the sprite
     */
    static getCenter(useSprite:UseSprite):number[]{
        let x = useSprite.getX() + useSprite.element.getBBox().width/2
        let y = useSprite.getY() + useSprite.element.getBBox().height/2

        return [x, y]
    }


    /**
     * 
     * @param useSprite 
     * @returns the x position of the right side of the sprite
     */
    static getRight(useSprite:UseSprite):number{
        return useSprite.getX() + useSprite.element.getBBox().width
    }

    /**
     * 
     * @param useSprite 
     * @returns the point of [x,y] the bottom center of the sprite
     */
    static getBottomCenter(useSprite:UseSprite):number[]{
        let x = useSprite.getX() + (useSprite.element.getBBox().width/2)
        let y = useSprite.getY() + (useSprite.element.getBBox().height)

        return [x, y]
    }


    /**
     * 
     * @param useSprite 
     * @returns the point [x,y] of the top center of the sprite
     */
    static getTopCenter(useSprite:UseSprite):number[]{
        let x = useSprite.getX() + (useSprite.element.getBBox().width/2)
        let y = useSprite.getY()
        return [x, y]
    }

    /**
     * 
     * @param obj1 the object that will be added to 
     * @param obj2 the object whose key:value pairs will be added to obj1
     * @returns obj1 such that all values in obj2 are either added to the exsisting
     * values in obj1, or, are added as entirely new pairs
     */
    static AddObjects(obj1:Object, obj2:Object):Object{
        // iterates over every key in the obj1 and adds to the values that obj2 has
        Object.keys(obj1).forEach((key) => {
            if (obj2.hasOwnProperty(key)){
                (obj1 as any)[key] += (obj2 as any)[key]
            }
        })

        // iterates over every key in the obj1; finds all key:value pairs not shared between obj1 and obj2
        // adds those key:value pairs to obj1
        Object.keys(obj2).forEach((key) => {
            if (!obj1.hasOwnProperty(key)){
                (obj1 as any)[key] = (obj2 as any)[key]
            }

        })
        return obj1
    }

    static getProperty(obj:Object, key:string):any{
        if (obj.hasOwnProperty(key)){
            return (obj as any)[key]
        } else {
            return null
        }
    }


    














   

    
} export default Sprite
