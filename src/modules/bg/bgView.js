import {View} from "../../utils/view";
import {Assets, Sprite} from "pixi.js";
import gsap from 'gsap';
import {randomInteger, setAnimationTimeoutSync} from "../../utils/helperFunction";

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
            alpha: .1,
            anchor: {
                x: 0.5,
                y: 0.5,
            },
            scale: 1,
        })
        this.addChild(this.bg);
    }


    async playAnimationBgTest() {
        const gs = gsap.timeline();
        gs.to(this.bg, {
            alpha: 1, // ease: "circ.in",
            yoyo: true,
            duration: 2,
        })
        gs.to(this.bg, {
            alpha: 0.5, duration: 2,
        })

        await setAnimationTimeoutSync(randomInteger(6, 10));
        this.playAnimationBgTest();
    }

}