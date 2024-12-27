import {View} from "../../utils/view";
import {Assets, Sprite} from "pixi.js";
import gsap from 'gsap';

export class BgView extends View {
    constructor(parent) {
        super(parent);

        this.createBgSprite();
        this.position.set(window.innerWidth / 2, window.innerHeight / 2);
        this.playAnimationBgTest();
    }

    createBgSprite() {
        this.bg = new Sprite({
            texture: Assets.get("bg"),
            alpha: 1,
            anchor: {
                x: 0.5,
                y: 0.5,
            },
            scale: 0.1,
        })
        this.addChild(this.bg);
    }

    playAnimationBgTest() {
        gsap.to(this.bg.scale, {
            x: 1,
            y: 1,
            ease: "back.inOut",
            repeat: -1,
            yoyo: true,
            duration: 3,
        })
    }
}