import { HtmlEntity } from "./HtmlEntity";

class HtmlDecorator implements HtmlEntity{
    htmlEntity:HtmlEntity
    constructor(htmlEntity:HtmlEntity){
        this.htmlEntity = htmlEntity
    }

  
    getElement(): HTMLElement {
        return this.htmlEntity.getElement()
    }


    click(): void {
        this.htmlEntity.click()
    }

    useKeyEvent(key: string): void {
        this.htmlEntity.useKeyEvent(key)
    }

} export default HtmlDecorator