import {BaseMediator} from "../../utils/mediator";
import {GameFieldNotification} from "./fieldNotification";
import {FieldView} from "./fieldView";

export class FieldMediator extends BaseMediator {
    constructor() {
        super();
        this.catchOutNotification();
        this.catchUINotification();
    }

    catchOutNotification() {
        this.mapNotification(GameFieldNotification.PLAYER_STEP, () => {
            this.view.setInteractiveSquare(true);
        })

        this.mapNotification(GameFieldNotification.COMPUTER_STEP, (index) => {
            this.view.computerStepView(index);
        })
    }

    catchUINotification() {
        this.mapNotification(FieldView.SQUARE_ON_CLICK, (index) => {
            this.sendNotification(GameFieldNotification.SQUARE_ON_CLICK, index)
        })
    }
}