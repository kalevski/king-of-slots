import { Layer } from '@king-casino/slot-base'
import { Sprite, Spritesheet } from 'pixi.js'

class SlotFrame extends Layer {

    onCreate(): void {
        
        let spritesheet = this.context.assets.get<Spritesheet>('textures')
        let slotFrameTexture = spritesheet?.textures['slot_frame.png']

        let spr = new Sprite(slotFrameTexture)
        this.addChild(spr)
    }

    onUpdate(delta: number, ms: number): void {
        
    }

    onDestroy(): void {
        
    }

}

export default SlotFrame