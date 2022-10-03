import Morphable from "../Decorator/Morphable";
import { Sprite } from "../Decorator/Sprite";
import { Subject } from "../Observer/Subject";
import { Subscriber } from "../Observer/Subscriber";

class MorphManager implements Subject{
    morphList:Morphable[] = [];
    constructor(){}


    startMorph(){
        for (let morph of this.morphList){
            morph.morph();
        }
    }

    addMorphable(morphable:Morphable){
        this.morphList.push(morphable);
    }

    createMorphable(sprite:Sprite, path:SVGPathElement, duration:number){
        let morphable = new Morphable(sprite, path, duration);
        this.morphList.push(morphable);
    }



    addSub(subscriber: Subscriber): void {
        throw new Error("Method not implemented.");
    }
    updateSubscribers(): void {
        throw new Error("Method not implemented.");
    }
    recieveMessage(msg: any): void {
        throw new Error("Method not implemented.");
    }

} export default MorphManager