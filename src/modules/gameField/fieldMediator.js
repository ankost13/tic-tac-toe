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
        this.subscribeToNotification(GameFieldNotification.PLAYER_STEP, () => {
            this.view.setInteractiveSquare(true);
        });

        this.subscribeToNotification(GameFieldNotification.COMPUTER_STEP, (data) => {
            this.view.computerStepView(data.index, data.isEnd);
        });

        this.subscribeToNotification(GameFieldNotification.WINNER_COMBINATION, (data) => {
            this.view.showWinnersLines(data);
        });

        this.subscribeToNotification(GameFieldNotification.REFRESH_FIELD, () => {
            this.view.refreshField();
        });
    }

    catchUINotification() {
        this.subscribeToNotification(FieldView.SQUARE_ON_CLICK, (index) => {
            this.sendNotification(GameFieldNotification.SQUARE_ON_CLICK, index);
        });
    }
}