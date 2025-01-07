import {Container} from "pixi.js";
import {GLOBAL_EMITTER} from "./eventEmitter";
import {SoundsManager} from "./howler";

export class View extends Container {
    constructor(parent) {
        super();
        parent.addChild(this);

        this.initEmitter();
        this.initSoundsManager();
    }

    initEmitter() {
        this.emitter = GLOBAL_EMITTER;
    }

    notifyToMediator(notification, data) {
        this.emitter.emit(notification, data);
    }

    initSoundsManager() {
        this.soundsManager = SoundsManager.getInstance();
    }
}
