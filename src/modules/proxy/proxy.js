let instance = null;
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

        console.error(this.mapField)
    }

}

