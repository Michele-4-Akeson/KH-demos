import { Subject } from "./Subject"

export interface Subscriber{
    subscribe(subject:Subject):void
    subscriptionUpdate(msg:any):void
    recieveMessage(msg:any):void
}