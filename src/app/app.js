import {Application, Assets, Sprite} from "pixi.js";
import {manifest} from "../manifest";

export class App extends Application {
    constructor(data) {
        super(data)

        this.loadAssets().then( );
    }

    async loadAssets() {
        await Assets.init({manifest});
        for (const bundle of manifest.bundles) {
            await Assets.loadBundle(bundle.name);
        }

        const sp1 = new Sprite({
            texture: Assets.get("img1")
        })
        this.stage.addChild(sp1)
    }
}