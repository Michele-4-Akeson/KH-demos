
export interface Sprite{
    getElement():SVGUseElement | SVGSVGElement
    getParent():SVGSVGElement    
    click():void
    drag(e:any):void
    useKeyEvent(key:string):void    
}