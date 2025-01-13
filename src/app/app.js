import {Application, Assets, Container} from "pixi.js";
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
import {SoundsManager} from "../utils/soundsManager";

export class App extends Application {

    constructor(data) {
        super(data)

        this.initGame();
    }

    async initGame() {
        this.registerPreloader();

        await this.initSounds();
        await this.loadAssets();

        this.gameMediator = new GameMediator();
        this.gameMediator.resourcesLoaded();
        this.registerBg();
        this.registerField();
        this.registerGameLogic();
        this.registerPopup();
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

    async initSounds() {
        const sounds = [
            {
                name: "backgroundSound",
                src: "assets/sounds/backgroundSound.mp3",
                volume: 0.01,
                loop: true,
            },
            {
                name: "win",
                src: "assets/sounds/win.mp3",
                volume: 0.1,
            },
            {
                name: "click",
                src: "assets/sounds/click.mp3",
                volume: 0.1,
            },
        ];
        const soundsManager = SoundsManager.getInstance()
        await soundsManager.loadSounds(sounds);
    }
}
