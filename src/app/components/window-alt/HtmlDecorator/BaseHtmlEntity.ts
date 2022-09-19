import { HtmlEntity } from "./HtmlEntity";

class BaseHtmlEntity implements HtmlEntity{
    element:HTMLElement

    constructor(element:HTMLElement){
        this.element = element
    }
  

    getElement(): HTMLElement {
        return this.element
    }


    click(): void {
        
    }

    useKeyEvent(key: string): void {
        
    }


} export default BaseHtmlEntity