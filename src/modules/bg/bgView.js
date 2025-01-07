import {View} from "../../utils/view";
import {Assets, Sprite} from "pixi.js";
import {setAnimationTimeoutSync} from "../../utils/helperFunction";
import {Howl} from "howler";
import {GameHowler} from "../../utils/howler";

export class BgView extends View {
    constructor(parent) {
        super(parent);

        this.createBgSprite();
        this.position.set(window.innerWidth / 2, window.innerHeight / 2);
        setAnimationTimeoutSync(3).then(() => {
            this.playBgSound();
        })

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

    playBgSound() {
        GameHowler.getInstance().play("backgroundSound")
    }
}