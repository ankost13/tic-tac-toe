import {View} from "../../utils/view";
import {Assets, Sprite, TextStyle, Text, Point} from "pixi.js";
import gsap from 'gsap';
import {setAnimationTimeoutSync} from "../../utils/helperFunction";

export class PopupView extends View {
    constructor(parent) {
        super(parent);
        this.position.set(window.innerWidth / 2 + 20, window.innerHeight / 2);
        this.createPopupSprite();
        this.createTextMassage();
    }

    createPopupSprite() {
        this.popup = new Sprite({
            texture: Assets.get("popup"),
            alpha: 1,
            anchor: {
                x: 0.5,
                y: 0.5,
            },
            scale: 0,
        })

        this.addChild(this.popup);
    }

    async playAnimation(text) {
        this.massageText.text = text;
        const glPos = this.toGlobal(new Point (-20,0))
        const pos = this.toLocal(glPos)
        this.massageText.position.set(pos.x, pos.y);
        gsap.to(this.popup.scale, {
            x: 0.6,
            y: 0.6,
            duration: 1,
        })
        await setAnimationTimeoutSync(3);
        gsap.to(this.popup.scale, {
            x: 0,
            y: 0,
            duration: 1,
        })
    }

    createTextMassage() {
        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 100,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#fcfce7',
            stroke: {color: '#123', width: 5, join: 'round'},
            dropShadow: {
                color: '#fcfce7',
                blur: 4,
                angle: Math.PI / 6,
                distance: 6,
            },

        });

        this.massageText = new Text({
            text: "",
            style,
            anchor: 0.5,
        });

        this.popup.addChild(this.massageText);
    }
}