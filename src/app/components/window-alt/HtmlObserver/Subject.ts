import { Subscriber } from "./Subscriber";

export interface Subject{
    addSub(subscriber:Subscriber):void
    updateSubscribers():void
    recieveMessage(msg:any):void
}