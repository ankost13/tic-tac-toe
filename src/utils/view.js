import {Container} from "pixi.js";
import {GLOBAL_EMITTER} from "./eventEmitter";

export class View extends Container {
    constructor(parent) {
        super();
        parent.addChild(this);

        this.initEmitter();
    }

    initEmitter() {
        this.emitter = GLOBAL_EMITTER;
    }

    notifyToMediator(notification, data) {
        this.emitter.emit(notification, data);
    }

}