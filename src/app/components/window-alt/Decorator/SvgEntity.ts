
export interface SvgEntity{
    getElement():SVGSVGElement
    
    click():void

    drag(e:any):void

    useKeyEvent(key:string):void

    
}