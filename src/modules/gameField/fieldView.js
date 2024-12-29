import {View} from "../../utils/view";
import {Assets, Sprite} from "pixi.js";

export class FieldView extends View {
    constructor(parent) {
        super(parent);
        this.createFieldSprite();
        this.position.set(window.innerWidth / 2, window.innerHeight / 2);
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
}

