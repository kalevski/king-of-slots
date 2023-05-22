import { Layer } from '@king-casino/slot-base'
import { Sprite, Spritesheet } from 'pixi.js'

import ReelGroup from '../prefabs/ReelGroup'

class SlotFrame extends Layer {

    private frame: Sprite

    private reels: ReelGroup

    onCreate(): void {
        this.frame = this.createFrame()
        this.addChild(this.frame)

        this.reels = new ReelGroup(this.context)
        this.addChild(this.reels)
        this.reels.init()

        this.context.state.on('gameplay.spin', this.onSpinInvoked, this)
        this.context.state.on('gameplay.spin.result', this.onSpinResult, this)

    }

    onUpdate(delta: number, ms: number): void {
        
    }

    onDestroy(): void {
        
    }

    private onSpinInvoked() {

    }

    private onSpinResult() {
        
    }

    private createFrame() {
        let spritesheet = this.context.assets.get<Spritesheet>('textures')
        let slotFrameTexture = spritesheet?.textures['slot_frame.png']

        let frame = new Sprite(slotFrameTexture)
        frame.anchor.set(.5, .5)
        const { width, height } = this.context.config
        frame.position.set(width / 2, height / 2 - 50)
        return frame
    }

}

export default SlotFrame