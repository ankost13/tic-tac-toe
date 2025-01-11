import {View} from "../../utils/view";
import {Assets, Container, Sprite, Text, Point} from "pixi.js";
import {setAnimationTimeoutSync} from "../../utils/helperFunction";
import gsap from 'gsap';


export class FieldView extends View {

    static SQUARE_ON_CLICK = "FieldView.SQUARE_ON_CLICK"

    constructor(parent) {
        super(parent);
        this.createFieldSprite();
        this.position.set(window.innerWidth / 2, window.innerHeight / 2);
        this.createInteractiveSquare();
        this.addEventSquare();
        this.createScoreboard();
    }

    createFieldSprite() {
        this.field = new Sprite({
            texture: Assets.get("field"),
            alpha: 1,
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
        this.collectionSquare = [];
        const startPosition = 185;
        for (let i = 0; i < 9; i++) {
            const square = new Sprite();
            square.texture = Assets.get("o");
            square.anchor = 0.5;
            square.x = (i % 3) * startPosition - startPosition;
            square.y = parseInt(i / 3 + "") * startPosition - startPosition;
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
        });
    }

    addEventSquare() {
        this.collectionSquare.forEach((square, index) => {
            if (!square.inUsed) {
                square.on("pointerup", () => {
                    this.playClickSound();
                    square.inUsed = true;
                    square.texture = Assets.get("x");
                    square.alpha = 1;
                    this.setInteractiveSquare(false);
                    this.notifyToMediator(FieldView.SQUARE_ON_CLICK, index);
                });
            }
        });
    }

    async computerStepView(index, isEndGame) {
        this.playClickSound();
        this.collectionSquare[index].texture = Assets.get("o");
        this.collectionSquare[index].inUsed = true;
        this.collectionSquare[index].interactive = false;
        this.collectionSquare[index].alpha = 1;

        if (!isEndGame) {
            await setAnimationTimeoutSync(.5);
            this.setInteractiveSquare(true);
        }
    }

    showWinnersCombination(data) {
        this.winnersLine = new Sprite({
            texture: Assets.get("line"),
            alpha: 1,
            anchor: {
                x: data.x,
                y: data.y,
            },
            scale: {
                x: data.scaleX,
                y: data.scaleY,
            },
            angle: data.angle,
        })

        this.addChild(this.winnersLine);
    }

    refreshField() {
        this.collectionSquare.forEach((square) => {
            square.texture = Assets.get("o");
            square.anchor = 0.5;
            square.alpha = 0;
            square.inUsed = false;
        })
        this.winnersLine.destroy({children: true});
        this.updateStatisticText()
    }

    playClickSound() {
        this.soundsManager.play("click", 0.1);
    }

    createScoreboard() {
        this.scoreboard = new Sprite({
            texture: Assets.get("scoreboard"),
            alpha: 0.8,
            anchor: 0.5,
            scale: {
                x: 0.2,
                y: 0.2,
            }
        })
        const glPos = this.toGlobal(new Point(window.innerWidth / 2 - this.scoreboard.width / 2, - window.innerHeight / 2 + this.scoreboard.height / 2 ));
        const localPos = this.toLocal(glPos);
        this.scoreboard.position.set(localPos.x, localPos.y);
        this.createTextScoreboard("SCOREBOARD", 0,250);
        this.xStatistic = this.createTextScoreboard("X: " + (localStorage.getItem("x") || 0), 0,100);
        this.oStatistic = this.createTextScoreboard("O: " + (localStorage.getItem("o") || 0), 0,-50);
        this.drawStatistic = this.createTextScoreboard("DROW: " + (localStorage.getItem("draw") || 0), 180,-200);
        this.addChild(this.scoreboard);
    }

    updateStatisticText() {
        if (this.xStatistic.text !== "X: " + (localStorage.getItem("x") || 0) ) {
            this.xStatistic.text = "X: " + (localStorage.getItem("x") || 0)
            this.animationTextOnScoreboard(this.xStatistic);
        } else if (this.oStatistic.text !== "O: " + (localStorage.getItem("o") || 0) ) {
            this.oStatistic.text = "O: " + (localStorage.getItem("o") || 0)
                this.animationTextOnScoreboard(this.oStatistic);
            } else if ( this.drawStatistic.text !== "DROW: " + (localStorage.getItem("draw") || 0) ) {
            this.drawStatistic.text = "DROW: " + (localStorage.getItem("draw") || 0)
                this.animationTextOnScoreboard( this.drawStatistic);
                }
        }

    animationTextOnScoreboard (partOfText) {
        gsap.to(partOfText.scale, {
            duration: .5,
            x: 1.4,
            y: 1.4,

            onComplete: ()=> {
                gsap.to(partOfText.scale, {
                    duration: .5,
                    x: 1,
                    y: 1,
                })
            }
        })
    }

    createTextScoreboard(text, posX = 0, posY = 200) {
        const massageText = new Text( text,{
            fontFamily : 'Arial',
            fontSize: 150,
            fill: '#fcfce7',
        });
        massageText.position.x = -posX;
        massageText.position.y = -posY;
        massageText.anchor = 0.5;
        this.scoreboard.addChild(massageText);

        return massageText;
    }
}

