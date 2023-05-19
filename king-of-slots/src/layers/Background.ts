import { Texture, Sprite, Assets } from 'pixi.js'
import { Layer } from '@king-casino/slot-base'

class Background extends Layer {

    async onCreate() {
        let bgTexture = this.context.assets.get<Texture>('background')
        let background = new Sprite(bgTexture as Texture)
        this.addChild(background)
        
    }

    onUpdate(delta:number, ms: number) {
        
    }

    onDestroy() {
        
    }

}

export default Background