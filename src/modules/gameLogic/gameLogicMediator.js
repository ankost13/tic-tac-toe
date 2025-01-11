import {BaseMediator} from "../../utils/mediator";
import {probableGamer} from "../proxy/proxy";
import {GameFieldNotification} from "../gameField/fieldNotification";
import {randomInteger, setAnimationTimeoutSync} from "../../utils/helperFunction";
import {PopupNotificationNotification} from "../popup/popupNotification";

export class GameLogicMediator extends BaseMediator {

    constructor() {
        super();
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

        this.oNotWin = false;
        this.xNotWin = false;
    }

    catchNotification() {
        this.mapNotification(GameFieldNotification.SQUARE_ON_CLICK, async (index) => {
            this.proxy.setMapField(parseInt(index / 3 + ""), index % 3, "x");
            if (this.checkResultGame("x")) {

                return
            } else {
                this.xNotWin = true;
            }
            this.removeIndex(index);

            await setAnimationTimeoutSync(.5)
            this.computerStep();
            this.checkDrawResult();
        })
    }

    removeIndex(element) {
        const index = this.proxy.indexes.indexOf(element);
        this.proxy.indexes.splice(index, 1);
    }

    computerStep() {
        if (!this.proxy.indexes.length) return;

        const index = randomInteger(0, this.proxy.indexes.length - 1);
        this.proxy.setMapField(parseInt(this.proxy.indexes[index] / 3 + ""), this.proxy.indexes[index] % 3, "o");
        if (this.checkResultGame("o")) {
            this.sendNotification(GameFieldNotification.COMPUTER_STEP, {index: this.proxy.indexes[index], isEnd: true});
            return
        } else {
            this.oNotWin = true;
        }
        this.sendNotification(GameFieldNotification.COMPUTER_STEP, {index: this.proxy.indexes[index], isEnd: false});
        this.removeIndex(this.proxy.indexes[index]);
    }

     checkResultGame(indicator) {
        if (this.proxy.mapField[0][0] === this.proxy.mapField[0][1] && this.proxy.mapField[0][0] === this.proxy.mapField[0][2] && this.proxy.mapField[0][0] === indicator) {
            this.actionsAfterCheckingResult({x: 0.5, y: 1.5, angle: 0, scaleX: 0.15, scaleY: 0.2, indicator: indicator})
            return true;
        } else if (this.proxy.mapField[1][0] === this.proxy.mapField[1][1] && this.proxy.mapField[1][0] === this.proxy.mapField[1][2] && this.proxy.mapField[1][0] === indicator) {
            this.actionsAfterCheckingResult({x: 0.5, y: 0.43, angle: 0, scaleX: 0.15, scaleY: 0.2, indicator: indicator})
            return true;
        } else if (this.proxy.mapField[2][0] === this.proxy.mapField[2][1] && this.proxy.mapField[2][0] === this.proxy.mapField[2][2] && this.proxy.mapField[2][0] === indicator) {
            this.actionsAfterCheckingResult({x: 0.5, y: -0.5, angle: 0, scaleX: 0.15, scaleY: 0.2, indicator: indicator})
            return true;
        } else if (this.proxy.mapField[0][0] === this.proxy.mapField[1][0] && this.proxy.mapField[0][0] === this.proxy.mapField[2][0] && this.proxy.mapField[0][0] === indicator) {
            this.actionsAfterCheckingResult({x: 0.5, y: -0.5, angle: 90, scaleX: 0.15, scaleY: 0.2, indicator: indicator})
            return true;
        } else if (this.proxy.mapField[0][1] === this.proxy.mapField[1][1] && this.proxy.mapField[0][1] === this.proxy.mapField[2][1] && this.proxy.mapField[0][1] === indicator) {
            this.actionsAfterCheckingResult({x: 0.5, y: 0.5, angle: 90, scaleX: 0.15, scaleY: 0.2, indicator: indicator})
            return true;
        } else if (this.proxy.mapField[0][2] === this.proxy.mapField[1][2] && this.proxy.mapField[0][2] === this.proxy.mapField[2][2] && this.proxy.mapField[0][2] === indicator) {
            this.actionsAfterCheckingResult({x: 0.5, y: 1.3, angle: 90, scaleX: 0.15, scaleY: 0.2, indicator: indicator})
            return true;
        } else if (this.proxy.mapField[0][0] === this.proxy.mapField[1][1] && this.proxy.mapField[0][0] === this.proxy.mapField[2][2] && this.proxy.mapField[0][0] === indicator) {
            this.actionsAfterCheckingResult({x: 0.5, y: 0.5, angle: 45, scaleX: 0.2, scaleY: 0.2, indicator: indicator})
            return true;
        } else if (this.proxy.mapField[2][0] === this.proxy.mapField[1][1] && this.proxy.mapField[2][0] === this.proxy.mapField[0][2] && this.proxy.mapField[2][0] === indicator) {
           this.actionsAfterCheckingResult({x: 0.5, y: 0.5, angle: -45, scaleX: 0.2, scaleY: 0.2, indicator: indicator})
            return true;
        }
    }

    checkDrawResult() {
        if ((this.proxy.indexes.length === 0) && (this.oNotWin) && (this.xNotWin)) {
            setAnimationTimeoutSync(0.5).then(() => {
                this.sendNotification(PopupNotificationNotification.WINNER, "draw");
            })
            this.resetGame();
            let count = +localStorage.getItem("draw") + 1;
            this.proxy.countWinner({x: localStorage.getItem("x"), o: localStorage.getItem("o"), d: count});
        }
    }

    actionsAfterCheckingResult(set) {
        this.sendNotification(GameFieldNotification.WINNER_COMBINATION, {x:set.x, y:set.y, angle: set.angle, scaleX: set.scaleX, scaleY: set.scaleY});
        setAnimationTimeoutSync(1).then(() => {
            this.sendNotification(PopupNotificationNotification.WINNER, set.indicator);
        })
        this.resetGame();

        let count = +localStorage.getItem(set.indicator) + 1;
        if (set.indicator === "x") {
            this.proxy.countWinner({x: count, o: localStorage.getItem("o"), d: localStorage.getItem("draw")});
        } else {
            this.proxy.countWinner({x: localStorage.getItem("x"), o: count, d: localStorage.getItem("draw")});
        }
    }

    resetGame() {
        setAnimationTimeoutSync(3).then(() => {
            this.proxy.setDefaultMapField();
            this.sendNotification(GameFieldNotification.REFRESH_FIELD);
            this.proxy.setDefaultIndexes();
            this.startGame();
        })
    }

}

