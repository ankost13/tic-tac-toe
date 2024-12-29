import {randomInteger} from "../../utils/helperFunction";

let instance = null;
export const probableGamer = {
    player: "player",
    computer: "computer",
}

export class Proxy { //для даних

    constructor() {
        this.setDefaultMapField();
    }

    static getInstance() {
        if (instance == null) {
            instance = new Proxy();
        }

        return instance;
    }

    setDefaultMapField() {
        this.mapField = [
            ["-", "-", "-"],
            ["-", "-", "-"],
            ["-", "-", "-"],
        ];

    }

    setMapField(x, y, indicator) { // indicator o or x
        this.mapField[x][y] = indicator

        console.error(x, y, this.mapField)
    }

    getFistPlayer() {
        if (randomInteger(0, 1)) {
            this.whoseTurn = probableGamer.player
        } else {
            this.whoseTurn = probableGamer.computer
        }

        return this.whoseTurn
    }

    changeWhoseTurn() {
        if (this.whoseTurn === probableGamer.player) {
            this.whoseTurn = probableGamer.computer
        } else {
            this.whoseTurn = probableGamer.player
        }
    }

}

