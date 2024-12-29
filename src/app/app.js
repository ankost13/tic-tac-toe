import {Application, Assets, Container, Sprite} from "pixi.js";
import {manifest} from "../manifest";
import {GamePreloaderMediator} from "../modules/preloader/mediator";
import {PreloaderView} from "../modules/preloader/view";
import {GameMediator} from "./mediator";
import {BgMediator} from "../modules/bg/bgMediator";
import {BgView} from "../modules/bg/bgView";
import {FieldView} from "../modules/gameField/fieldView";
import {FieldMediator} from "../modules/gameField/fieldMediator";

export class App extends Application {

    constructor(data) {
        super(data)

        this.registerPreloader()
        this.gameMediator = new GameMediator();
        this.loadAssets().then(() => {
            this.gameMediator.resourcesLoaded();
            this.registerBg();
            this.registerField();
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
}