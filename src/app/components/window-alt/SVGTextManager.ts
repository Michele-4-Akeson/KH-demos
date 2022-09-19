import { HtmlEntity } from "./HtmlDecorator/HtmlEntity";
import TextInput from "./HtmlDecorator/TextInput";
import { Subject } from "./HtmlObserver/Subject";
import { Subscriber } from "./HtmlObserver/Subscriber";

class SVGTextManager implements Subject{
    selectedHtmlEntity:TextInput | null = null
    subscribers:Subscriber[] = []
    constructor(){
        document.addEventListener("keydown", (e:KeyboardEvent)=>{
            this.sendKeyInput(e.key)
        })

        document.addEventListener("paste", (e:ClipboardEvent)=>{
            this.selectedHtmlEntity?.setTextContent(e.clipboardData!.getData("text"))
            
        })
    }

    addSub(subscriber: Subscriber): void {
        this.subscribers.push(subscriber)
    }


    /**
     * Sends the selectedElementId to all subscribers
     * causing them to update their state of being updated or not
     * 
     * -- a bit redundant, as we are going to be passing key events through this to
     * selectedElement
     */
    updateSubscribers(): void {
        for (let sub of this.subscribers){
            console.log(sub)
            sub.subscriptionUpdate(this.selectedHtmlEntity?.getElement().id)
        }
    }


    recieveMessage(msg:TextInput): void {
        this.selectedHtmlEntity = msg
        this.updateSubscribers()
    }

    getText(){
        this.selectedHtmlEntity?.getTextContent()
    }


    private sendKeyInput(key:string){
        this.selectedHtmlEntity?.useKeyEvent(key)
    }

   


} export default SVGTextManager