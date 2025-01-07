import {Application, Assets, Container, Sprite} from "pixi.js";
import {manifest} from "../manifest";
import {GamePreloaderMediator} from "../modules/preloader/mediator";
import {PreloaderView} from "../modules/preloader/view";
import {GameMediator} from "./mediator";
import {BgMediator} from "../modules/bg/bgMediator";
import {BgView} from "../modules/bg/bgView";
import {FieldView} from "../modules/gameField/fieldView";
import {FieldMediator} from "../modules/gameField/fieldMediator";
import {GameLogicMediator} from "../modules/gameLogic/gameLogicMediator";
import {PopupMediator} from "../modules/popup/popupMediator";
import {PopupView} from "../modules/popup/popupView";
import {GameHowler} from "../utils/howler";

export class App extends Application {

    constructor(data) {
        super(data)

        this.registerPreloader();
        this.initSounds();
        this.gameMediator = new GameMediator();
        this.loadAssets().then(() => {
            this.gameMediator.resourcesLoaded();
            this.registerBg();
            this.registerField();
            this.registerGameLogic();
            this.registerPopup();
        })
    }

    async loadAssets() {
        await Assets.init({manifest});
        for (const bundle of manifest.bundles) {
            await Assets.loadBundle(bundle.name);
        }
    }

    registerPreloader() {
        const mediator = new GamePreloaderMediator();
        const parent = new Container();
        this.stage.addChild(parent);
        mediator.initView(PreloaderView, parent);
    }

    registerBg() {
        const mediator = new BgMediator();
        const parent = new Container();
        this.stage.addChild(parent);
        mediator.initView(BgView, parent);
    }

    registerField() {
        const mediator = new FieldMediator();
        const parent = new Container();
        this.stage.addChild(parent);
        mediator.initView(FieldView, parent);
    }

    registerGameLogic() {
        new GameLogicMediator();
    }

    registerPopup() {
        const mediator = new PopupMediator();
        const parent = new Container();
        this.stage.addChild(parent);
        mediator.initView(PopupView, parent)
    }

    initSounds() {
        const sounds = [
            {
                name: "backgroundSound",
                src: "assets/sounds/backgroundSound.mp3",
                volume: 1,
            }
        ];
        GameHowler.getInstance(sounds)
    }
}