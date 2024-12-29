import {View} from "../../utils/view";
import {Assets, Sprite} from "pixi.js";

export class BgView extends View {
    constructor(parent) {
        super(parent);

        this.createBgSprite();
        this.position.set(window.innerWidth / 2, window.innerHeight / 2);
    }

    createBgSprite() {
        this.bg = new Sprite({
            texture: Assets.get("bg"),
            alpha: .9,
            anchor: {
                x: 0.5,
                y: 0.5,
            },
            scale: 1,
        })
        this.addChild(this.bg);
    }

}