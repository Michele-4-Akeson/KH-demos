import Physics from "../Components/Physics"


interface UseSprite {
    element:SVGUseElement | SVGGElement | SVGSVGElement
    parent: SVGSVGElement | null



    ////////////////////////////////
    // GETTERS:
    ////////////////////////////////

    /**
     * returns the physics component of a sprite 
     */
    getPhysics():Physics

    /**
     * returns isDraggable
     */
    getIsDraggable():boolean

    /**
     * returns the gsap draggable reference
     * that allows us to control whether a drag is allowed
     */
    getDragRef():globalThis.Draggable[]


    /**
     * sets the dragRef to a gsap draggable of the useSprite
     */
    setDragRef(drag:globalThis.Draggable[]):void

    /**
     * sets the isDraggable field to canDrag, which 
     * can be used to limit when a sprite is draggable
     * @param canDrag the boolean isDraggable is set to
     */
    setIsDraggable(canDrag:boolean):void

    /**
     * returns a list of sprites "attached" to this useSprite
     */
    getAttachedSprites():UseSprite[]

    /**
     * returns the x position of the sprite
     */
     getX():number

     /**
      * returns the y position of the sprite
      */
     getY():number
 
 




     ////////////////////////////////
    // SETTERS:
    ////////////////////////////////

    /**
     * sets the scale of the useSprite
     * @param scale the scale the element will be set to
     */
    setScale(scale:number):void

    /**
     * 
     * @param targetParent the target html element that will become the new parent 
     * of the referneced html element in the UseSprite instance 
     * setParent will need to recursively set all of the instance of parent
     */
    setParent(targetParent:SVGSVGElement):void

     /**
     * adds a useSprite to a list of sprites considered "attached" to this useSprite
     */
    addSprite(useSprite:UseSprite):void

    /**
     * removes a useSprite from the attachedSprites field
     * @param useSprite useSprite to be removed from list of "attached" sprites
     */
    removeSprite(useSprite:UseSprite):void


    /**
     * moves the sprite horizontally by x from its current position
     * @param x the distance horizontally the sprite will move from its current location
     * @param duration the time over which that movement will occurr
     */
    moveX(x:number, duration:number):void

    /**
     * moves the sprite vertically by y from its current position
     * @param y the distance vertically the sprite will move from its current location
     * @param duration the time over which that movement will occurr
     */
    moveY(y:number, duration:number):void

    /**
     * sets the x position of the sprite
     * @param x the x coordinate the sprite will be placed at
     * @param duration the time over which that movement will occurr
     */
    setX(x:number, duration:number):void

    /**
     * sets the y position of the sprite
     * @param y the y coordinate the sprite will be placed at
     * @param duration the time over which that movement will occurr
     */
    setY(y:number, duration:number):void

    /**
     * moves the sprite in the direction ("x" or "y"), over a given duration from its
     * current position; after the movement is complete, it executes the callback function
     * @param direction the direction the sprite will move
     * @param value the distance the sprite will move from its location
     * @param callback the function that will be called after completeion of this movement
     */
    moveWithAction(direction:string, value:number, duration:number, callback:Function):void



    

    /**
     * removes the element referenced by the sprite from the DOM
     * and does the same for all useSprites attached to this sprite
     */
    destroy():void
    
    /**
     * the function called when the element is clicked
     */
    onClick():void

    /**
     * function called when the element is being dragged
     * @param dragX the change in the x position of the element
     * @param dragY the change in the y position of the element
     */
     onDrag(dragX:number, dragY:number):void

     /**
      * function called when the drag of the element is ended
      */
     onDragEnd():void



    
} export default UseSprite