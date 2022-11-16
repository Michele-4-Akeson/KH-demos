import {gsap, Draggable} from "gsap/all";
import SpriteAbility from "../Pattern/SpriteAbility";
import UseSprite from "../Pattern/UseSprite";


class Drag extends SpriteAbility{
    dragRef:globalThis.Draggable[]
    /**
     * adds a draggable functionality to the useSprite
     * @param useSprite the useSprite to be referenced
     * @param dragDirection indicates the direction a drag can be performed: 'x', 'y', 'x,y'
     * @param whenDragging the function to be called when a drag is occuring
     * @param whenDragEnd the function to be called when a drag has ended
     */
    constructor(useSprite:UseSprite, dragDirection:Draggable.DraggableType, whenDragging:Function|null, whenDragEnd:Function|null){
        super(useSprite)
        gsap.registerPlugin(Draggable)
        this.dragRef = Draggable.create(this.element, {
            type:dragDirection,
            onDrag: ()=>{
                if (whenDragging){
                    whenDragging()
                }
                super.onDrag(this.dragRef[0].deltaX, this.dragRef[0].deltaY)
            },

            onDragEnd: ()=>{
                if (whenDragEnd){
                    whenDragEnd()
                }

                super.onDragEnd()
                
            }
        })

        this.setDraggable(this.dragRef)
      
    }


    



} export default Drag