import gsap from "gsap";
import { Subject } from "./Subject";
import { Subscriber } from "./Subscriber";
import HtmlDecorator from "../Decorator/SvgAbility";
import { SvgEntity } from "../Decorator/SvgEntity";

class TextInput extends HtmlDecorator implements Subscriber{
    isSelected:boolean = false
    subject:Subject
    value:string = ""
    constructor(htmlEntity:SvgEntity, subject:Subject){
        super(htmlEntity)
        this.subscribe(subject)
        this.subject = subject
    }

    subscribe(subject:Subject): void {
        subject.addSub(this)   
    }


    subscriptionUpdate(msg: any): void {
        this.isSelected = (msg == this.getElement().id)

        if (!this.isSelected){
            gsap.to(this.getElement(), {scale:1, fill:"black"})
        }
    }

    recieveMessage(msg: any): void {
        
    }


    override click(): void {
        this.isSelected = true
        this.subject.recieveMessage(this)
        gsap.to(this.getElement(), {scale:1.5, fill:"green"})
    }

    override useKeyEvent(key: string): void {
        if (key == "Backspace") {
            this.value = this.value.substring(0, this.value.length - 1)
        } else if (key.length == 1) {
            this.value += key
        }

        this.setTextContent(this.value)
    }


    getTextContent():string{
        return this.getElement().textContent!
    }

    setTextContent(text:string){
        this.getElement().textContent = text
    }




} export default TextInput