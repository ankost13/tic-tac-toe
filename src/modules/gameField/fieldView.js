import {View} from "../../utils/view";
import {Assets, Container, Sprite} from "pixi.js";
import {setAnimationTimeoutSync} from "../../utils/helperFunction";

export class FieldView extends View {

    static SQUARE_ON_CLICK = "FieldView.SQUARE_ON_CLICK"

    constructor(parent) {
        super(parent);
        this.createFieldSprite();
        this.position.set(window.innerWidth / 2, window.innerHeight / 2);
        this.createInteractiveSquare();

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
            const square = new Sprite();
            square.texture = Assets.get("o");
            square.anchor = 0.5;
            square.x = (i % 3) * 185 - 185;
            square.y = parseInt(i / 3 + "") * 185 - 185;
            square.scale = 0.8;
            square.alpha = 0;
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
        this.collectionSquare.forEach((square, index) => {
            if (!square.inUsed) {
                square.on("pointerup", () => {
                    square.inUsed = true;
                    square.texture = Assets.get("x");
                    square.alpha = 1;
                    this.setInteractiveSquare(false);
                    this.notifyToMediator(FieldView.SQUARE_ON_CLICK, index);
                })
            }
        })
    }

    async computerStepView(index, isEndGame) {
        this.collectionSquare[index].texture = Assets.get("o");
        this.collectionSquare[index].inUsed = true;
        this.collectionSquare[index].interactive = false;
        this.collectionSquare[index].alpha = 1;

        if (!isEndGame) {
            await setAnimationTimeoutSync(.5)
            this.setInteractiveSquare(true);
        }
    }
}

