import {BaseMediator} from "../../utils/mediator";
import {PopupNotificationNotification} from "./popupNotification";

export class PopupMediator extends BaseMediator {
    constructor() {
        super();
        this.catchOutNotification();
    }

    catchOutNotification() {
        this.subscribeToNotification(PopupNotificationNotification.WINNER, (indicator) => {
         this.view.playAnimation("The winner is " + indicator);
        });
    }
}