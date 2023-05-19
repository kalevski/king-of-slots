import { Layer } from '@king-casino/slot-base'
import { Texture, Sprite } from 'pixi.js'

class Loader extends Layer {

    onCreate() {
        let texture = Texture.from('/assets/bunny.png')
        let bunny = new Sprite(texture)
        bunny.position.x = 200
        bunny.position.y = 300
        this.addChild(bunny)
        console.log(bunny)
    }

    onUpdate(delta:number, ms: number) {
        
    }

    onDestroy() {
        
    }

}

export default Loader