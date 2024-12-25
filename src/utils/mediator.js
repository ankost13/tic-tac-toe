import {Proxy} from "./proxy";
import {GLOBAL_EMITTER} from "./eventEmitter";

export class BaseMediator {
    constructor() {
        this.initEmitter();
        this.initProxy();
    }

    initView(referenceConstructorUI, parent) {
        this.view = new referenceConstructorUI(parent);
    }

    initEmitter() {
        this.emitter = GLOBAL_EMITTER;
    }

    initProxy() {
        this.proxy = Proxy.getInstance();
    }

    sendNotification(notification, data) {
        this.emitter.emit(notification, {data});
    }

    mapNotification(notification, callback) {
        this.emitter.on(notification, (data) => {
            callback(data)
        });
    }
}

