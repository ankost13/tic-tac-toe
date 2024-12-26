import {Application, Assets, Container, Sprite} from "pixi.js";
import {manifest} from "../manifest";
import {GamePreloaderMediator} from "../modules/preloader/mediator";
import {PreloaderView} from "../modules/preloader/view";
import {GameMediator} from "./mediator";

export class App extends Application {
    constructor(data) {
        super(data)

        this.registerPreloader()
        this.gameMediator = new GameMediator();
        this.loadAssets().then(() => {
            this.gameMediator.resourcesLoaded();
        })
    }

    async loadAssets() {
        await Assets.init({manifest});
        for (const bundle of manifest.bundles) {
            await Assets.loadBundle(bundle.name);
        }

        // const sp1 = new Sprite({
        //     texture: Assets.get("img1")
        // })
        // this.stage.addChild(sp1)
    }

    registerPreloader() {
        const mediator = new GamePreloaderMediator();
        const parent = new Container();
        this.stage.addChild(parent);
        mediator.initView(PreloaderView, parent);
    }
}