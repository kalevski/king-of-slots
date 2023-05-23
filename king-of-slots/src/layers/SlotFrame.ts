import { GameplaySlice, Layer } from '@king-casino/slot-base'
import { Graphics, Sprite, Spritesheet } from 'pixi.js'

import Reels from '../prefabs/Reels'

class SlotFrame extends Layer {

    private frame: Sprite
    private frameMask: Graphics

    private reels: Reels

    onCreate(): void {
        this.frame = this.createFrame()
        this.addChild(this.frame)

        

        this.reels = new Reels(this.context)
        this.addChild(this.reels)
        
        this.frameMask = this.createMask()
        this.addChild(this.frameMask)
        
        this.reels.mask = this.frameMask
        
        this.reels.init()

        this.context.state.on('gameplay.spin', this.onSpinInvoked, this)
        this.context.state.on('gameplay.spin.result', this.onSpinResult, this)

    }


    onUpdate(delta: number, ms: number): void {
        this.reels.doUpdate(delta, ms)
    }

    onDestroy(): void {
        
    }

    private onSpinInvoked() {
        this.reels.spinReelLines()
    }

    private onSpinResult() {
        let result = this.gameplay.get().matrix as number[][]
        let winLines = this.gameplay.get().winLines as number[][]
        this.reels.setSpinResult(result, winLines)
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

    private get gameplay() {
        return this.context.state.get<GameplaySlice>('gameplay')
    }

    private createMask() {
        let mask = new Graphics()
        mask.lineStyle(2, 0xffffff, 1)
        mask.beginFill(0xffffff, 1)
        mask.drawPolygon([
            270, 170,
            1100, 170,
            1100, 55,
            1650, 55,
            1650, 925,
            1100, 925,
            1100, 825,
            270, 825
        ])
        mask.endFill()
        return mask
    }

}

export default SlotFrame