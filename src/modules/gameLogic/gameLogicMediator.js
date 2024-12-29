import {BaseMediator} from "../../utils/mediator";
import {probableGamer} from "../proxy/proxy";
import {GameFieldNotification} from "../gameField/fieldNotification";
import {randomInteger, setAnimationTimeoutSync} from "../../utils/helperFunction";

export class GameLogicMediator extends BaseMediator {

    constructor() {
        super();
        this.indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        this.startGame();
        this.catchNotification();
    }

    startGame() {
        const firstPlayer = this.proxy.getFistPlayer();
        if (firstPlayer === probableGamer.player) {
            this.sendNotification(GameFieldNotification.PLAYER_STEP)
        } else {
            this.computerStep();
        }
    }

    catchNotification() {
        this.mapNotification(GameFieldNotification.SQUARE_ON_CLICK, async (index) => {
            this.proxy.setMapField(parseInt(index / 3 + ""), index % 3, "x");
            this.checkResultGame()
            this.removeIndex(index);

            await setAnimationTimeoutSync(.5)
            this.computerStep();
        })
    }

    removeIndex(element) {
        const index = this.indexes.indexOf(element);
        this.indexes.splice(index, 1);
    }

    computerStep() {
        if (!this.indexes.length) return;

        const index = randomInteger(0, this.indexes.length - 1);
        this.proxy.setMapField(parseInt(this.indexes[index] / 3 + ""), this.indexes[index] % 3, "0");
        this.checkResultGame()

        this.sendNotification(GameFieldNotification.COMPUTER_STEP, this.indexes[index]);
        this.removeIndex(this.indexes[index]);
    }


    checkResultGame() {
        //TODO треба логіка на перевірку результату гри
    }
}

