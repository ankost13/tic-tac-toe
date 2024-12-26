import {BaseMediator} from "../../utils/mediator";
import {setAnimationTimeoutSync} from "../../utils/helperFunction";
import {PreloaderNotification} from "./notification";

export class GamePreloaderMediator extends BaseMediator {

    constructor() {
        super();

        this.notificationOutside();
    }

    notificationOutside() {
        this.mapNotification(PreloaderNotification.HIDE_PRELOADER_COMPLETED, async (data)=> {
            await setAnimationTimeoutSync(1);
            this.view.hide();
            await setAnimationTimeoutSync(.5);
        });
    }
}