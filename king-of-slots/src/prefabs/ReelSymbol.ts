import { EventEmitter } from '@toolcase/base'
import { Sprite, Spritesheet, Texture } from 'pixi.js'

export type ReelSymbolSizes = ('small' | 'normal')
export type ReelSymbolSize = {
    width: number,
    height: number
}

export type ReelSymbolEvents = ('spin_ended')

export type SpinCallback = (symbol: ReelSymbol) => void

class ReelSymbol extends Sprite {

    public readonly symbolSize: ReelSymbolSizes
    
    public readonly reelIndex: number
    
    public readonly spinEvents: EventEmitter<ReelSymbolEvents,any> = new EventEmitter()

    private readonly spritesheet: Spritesheet
    
    private spinEnabled: boolean = false

    private spinEndEvent: boolean

    private targetY: number = -Infinity

    static Size = {
        normal: { width: 275, height: 218 } as ReelSymbolSize,
        small: { width: 275, height: 145 } as ReelSymbolSize
    }

    static Speed: number = 40

    constructor(reelIndex: number, symbolId:number, size: ReelSymbolSizes, spritesheet: Spritesheet) {
        super(ReelSymbol.getTexture(symbolId, spritesheet))
        this.reelIndex = reelIndex
        this.symbolSize = size
        this.spritesheet = spritesheet
        this.scaleToFit(this.symbolSize)
        this.anchor.set(.5)
        super.emit
    }

    spin(value: number | boolean = true, notify = true) {
        if (typeof value === 'boolean') {
            this.spinEnabled = value
            return
        }
        this.targetY = value
        this.spinEnabled = true
        this.spinEndEvent = notify
    }



    get reelSize() {
        return ReelSymbol.Size[this.symbolSize]
    }

    static getTexture(symbolId: number, spritesheet: Spritesheet): Texture {
        let name = symbolId.toString().padStart(2, '0')
        let fileName = `symbol_${name}.png`
        let texture = spritesheet?.textures[fileName] as Texture
        return texture
    }

    private scaleToFit(size: ReelSymbolSizes) {
        const { width, height } = ReelSymbol.Size[size]
        const scaleX = width / this.texture.width
        const scaleY = height / this.texture.height
        this.scale.set(scaleX, scaleY)
    }

    changeSymbolId(symbolId: number) {
        let texture = ReelSymbol.getTexture(symbolId, this.spritesheet)
        this.texture = texture
        this.scaleToFit(this.symbolSize)
    }

    doUpdate(delta: number, ms: number) {
        if (!this.spinEnabled) {
            return
        }
        if (this.position.y >= this.targetY) {
            this.spinEnabled = false
            if (this.spinEndEvent) {
                this.spinEvents.emit('spin_ended', this)
            }
            return
        }

        this.position.y += ReelSymbol.Speed * delta

    }

}

export default ReelSymbol