import {randomInteger} from "../../utils/helperFunction";

let instance = null;
export const probableGamer = {
    player: "player",
    computer: "computer",
}

export class Proxy { //для даних

    constructor() {
        this.setDefaultMapField();
        this.setDefaultIndexes();
    }

    setDefaultIndexes() {
        this.indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
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
        this.mapField[x][y] = indicator;
    }

    getFistPlayer() {
        if (randomInteger(0, 1)) {
            this.whoseTurn = probableGamer.player;
        } else {
            this.whoseTurn = probableGamer.computer;
        }

        return this.whoseTurn;
    }

}

