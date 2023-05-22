import { Context } from '@king-casino/slot-base'
import { Container, Graphics, Sprite, Spritesheet, Texture } from 'pixi.js'
import ReelDef from '../helper/ReelDef'

class ReelGroup extends Container {

    def: ReelDef
    
    private context: Context

    private shape: Graphics


    private reels: Sprite[][] = [] 

    constructor(context: Context) {
        super()
        this.context = context

        this.shape = this.createMask()
        this.def = new ReelDef()
    }

    init() {
        this.parent.addChild(this.shape)
        this.mask = this.shape

        let spritesheet = this.context.assets.get<Spritesheet>('textures') as Spritesheet

        let bgTexture = this.context.assets.get<Texture>('background') as Texture
        /*spritesheet.textures['symbol_01.png']*/
        let symbolA = new Sprite()
        symbolA.anchor.set(.5)
        symbolA.position.set(200, 200)
        this.addChild(symbolA)

        let xOffset = 400
        let xSpacing = 275

        let yOffset = 100
        let ySpacing = 200

        for (let [ lineIndex, reelLine ] of this.def.getMatrix().entries()) {
            
            for (let [ index, reelSymbol ] of reelLine.entries()) {
                let padedNumber = reelSymbol.toString().padStart(2, '0')
                let texture = spritesheet.textures[`symbol_${padedNumber}.png`]
                
                let indexOffset = reelLine.length > 3 ? 0 : 1
                let ySpacingOffset = reelLine.length > 3 ? 50 : 0
                let yScale = reelLine.length > 3 ? .3 : .45

                let x = lineIndex * xSpacing + xOffset
                let y = (index + indexOffset) * (ySpacing - ySpacingOffset) + yOffset
                
                let sprite = new Sprite(texture as Texture)
                sprite.scale.set(.45, yScale)
                sprite.anchor.set(.5)
                sprite.position.set(x, y)
                this.addChild(sprite)
            }

        }
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

    private createReelLines() {
        
    }

}

export default ReelGroup