import {View} from "../../utils/view";
import {Assets, Container, Graphics, Sprite} from "pixi.js";

export class FieldView extends View {
    constructor(parent) {
        super(parent);
        this.createFieldSprite();
        this.position.set(window.innerWidth / 2, window.innerHeight / 2);
        this.createInteractiveSquare();

        this.setInteractiveSquare(true);
        this.addEventSquare();
    }

    createFieldSprite() {
        this.field = new Sprite({
            texture: Assets.get("field"),
            alpha: 1,
            //zIndex: 1,
            anchor: {
                x: 0.5,
                y: 0.5,
            },
            scale: .6,
        })
        this.addChild(this.field);
    }

    createInteractiveSquare() {
        const parentForSquare = new Container();
        this.addChild(parentForSquare);
        const squareWidth = 180;
        const squareHeight = 180;
        this.collectionSquare = [];
        for (let i = 0; i < 9; i++) {
            const square = new Graphics();
            square.rect(0, 0, squareWidth, squareHeight);
            square.x = (i % 3) * 185 - 185;
            square.y = parseInt(i / 3 + "") * 185 - 185;
            square.pivot.set(90, 90);
            square.fill(0xde3249);
            parentForSquare.addChild(square);
            square.inUsed = false;
            this.collectionSquare.push(square);
        }
    }

    setInteractiveSquare(on) {
        this.collectionSquare.forEach((square) => {
            square.interactive = !square.inUsed && on;
            square.cursor = "pointer";
        })
    }

    addEventSquare() {
        this.collectionSquare.forEach((square) => {
            if (!square.inUsed) {
                square.on("pointerup", () => {

                })
            }
        })
    }
}

