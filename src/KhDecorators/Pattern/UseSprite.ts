

interface UseSprite {
    element:SVGUseElement | SVGGElement | SVGSVGElement
    parent: SVGSVGElement | null


    /**
     * IDEA: to(parameter:Object) -- just reperents the abstratcion of the gsap.to(this, parameters) 
     */

 
   ////////////////////////////////
   // GETTERS:
   ////////////////////////////////

    /**
     * returns the gsap draggable reference which controls the draggable attributes of the useSprite
     * - OR null if no draggable functionality exsists on the useSprite
     */
    getDraggable():globalThis.Draggable[]


    /**
     * sets the draggable refernece to a gsap draggable of the useSprite
     */
    setDraggable(drag:globalThis.Draggable[]):void

    
    /**
     * returns a array of sprites "attached" to this useSprite
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



     getPreviousX():number
     getPreviousY():number
    ////////////////////////////////
    // SETTERS:
    ////////////////////////////////

    setPreviousX(x:number):void
    setPreviousY(y:number):void

    /**
     * sets the scale of the useSprite
     * @param scale the scale the element will be set to
     */
    setScale(scale:number):void

    /**
     * sets the parent element of a given useSprite; if the useSprite already has a parent, the useSprite
     * is removed from that parent, and appended to the targetParent element
     * @param targetParent the target svg element that will become the new parent  of the referneced svg element 
     * in the UseSprite instance
     */
    setParent(targetParent:SVGSVGElement):void

     /**
     * adds a useSprite to an array of sprites considered "attached" to this useSprite
     */
    addSprite(useSprite:UseSprite):void

    /**
     * removes a useSprite from the attachedSprites field
     * @param useSprite useSprite to be removed from array of "attached" sprites
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
     * @param direction the direction the sprite will move ("x" or "y")
     * @param distance the distance the sprite will move from its location
     * @param callback the function that will be called after completeion of this movement ()=>{}
     */
    callAfterMove(direction:string, distance:number, duration:number, callback:Function):void


    /**
     * moves the sprite in a given direction, and on every update frame, the onUpdate function is called
     * allowing for a function to be called during the movement
     * 
     * 
     * NOTE:
     * -- when this is used in a decorator, to add to the functionality of the onUpdate function,
     * you must call the super and pass an arrow function such that your new code is added to it 
     * and the onUpdate function paramater is also is the arrow function and called as follows
     * 
     *  moveWithUpdate(dir, dis, dur, onUpdate){
     *      super(dir, dis, dur, ()=> {
     *          // code you want called on each update
     *          onUpdate() // the other functionality which was passed to a parameter 
     * 
     *      })
     * 
     * }
     * @param direction the direction the sprite will move ('x', 'y')
     * @param distance the distance the sprite will move from its location
     * @param duration the amount of time in which the movement will take place
     * @param onUpdate a function that will be called on every update ()=>{}
     */
    elasticMove(direction:string, distance:number, duration:number, onUpdate:Function):void
    

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