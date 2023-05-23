import { Container, ObservablePoint, Point, Spritesheet } from 'pixi.js'
import { Context } from '@king-casino/slot-base'
import ReelSymbol from './ReelSymbol'
import { Tween } from 'tweedle.js'


class Reels extends Container {
    
    static OFFSET_NORMAL = { x: 410, y: 280 }
    
    static OFFSET_SMALL = { x: 1237, y: 127 }

    private context: Context

    private reels: ReelSymbol[][] = []

    private temp: Point = new Point()

    private result: number[][] | null = null

    private reelLock: number[] | null = null

    private lockIndex: number = 0 

    constructor(context: Context) {
        super()
        this.context = context
    }

    init() {
        this.reels = this.createReelLines()
    }

    spinReelLines() {
        if (this.result !== null) {
            for (let index = 0; index < this.result.length; index++) {
                this.resetReelToDefault(index, this.result[index])
            }
            this.onSpinFinished()
            setTimeout(() => this.startSpin(), 500)
        } else {
            this.startSpin()
        }
    }

    setSpinResult(matrix: number[][], winLines: number[][]) {
        this.result = matrix
        this.reelLock = matrix.map(() => 0)
        
    }

    private startSpin() {
        this.eachSymbol(symbol => {
            let reelLength = this.getReelLength(symbol.reelIndex)
            let targetY = this.getSymbolPosition(symbol.reelIndex, reelLength, this.temp).y
            symbol.spin(targetY, 'repeat')
        })
    }

    private onSymbolSpinEnd(symbol: ReelSymbol) {
        const reelIndex = symbol.reelIndex
        const reelLength = this.getReelLength(reelIndex)
        const reel = this.reels[reelIndex]
        const state = symbol.state
        
        if (state === 'repeat') {
            this.getSymbolPosition(reelIndex, -1, this.temp)
            symbol.position.y = this.temp.y
            this.getSymbolPosition(reelIndex, reelLength, this.temp)
            symbol.spin(this.temp.y, 'repeat')
            symbol.changeSymbolId(this.getRandomSymbolId())
        }

        if (this.reelLock !== null && this.lockIndex === reelIndex && this.result !== null) {
            let symbolIndex = (reelLength - 1) - this.reelLock[reelIndex]
            let symbolId = this.result[reelIndex][symbolIndex]
            this.getSymbolPosition(reelIndex, symbolIndex, this.temp)
            symbol.spin(this.temp.y, 'stop')
            symbol.changeSymbolId(symbolId)
            this.reelLock[reelIndex]++
            if (this.reelLock[reelIndex] === reelLength) {
                this.resetReelToDefault(this.lockIndex, [...this.result[reelIndex]])
                this.lockIndex++
                if (this.lockIndex === this.result.length) {
                    this.onSpinFinished()
                }
            }
        }
    }

    private resetReelToDefault(reelIndex: number, symbols: number[]) {
        let reel = this.reels[reelIndex]
        for (let index = -1; index < reel.length - 1; index++) {
            let symbol = reel[index + 1]
            symbol.spin(false)
            let symbolId = symbols[index] || this.getRandomSymbolId()
            this.getSymbolPosition(reelIndex, index, this.temp)
            symbol.position.y = this.temp.y
            symbol.changeSymbolId(symbolId)
        }
    }

    private onSpinFinished() {
        this.result = null
        this.reelLock = null
        this.lockIndex = 0
    }

    doUpdate(delta: number, ms: number) {
        for (let reel of this.reels) {
            for (let symbol of reel) {
                symbol.doUpdate(delta, ms)
            }
        }
    }

    private eachSymbol(callbackFn: (symbol: ReelSymbol) => void) {
        for (let reel of this.reels) {
            reel.forEach(callbackFn)
        }
    }

    private createReelLines() {
        let spritesheet = this.context.assets.get<Spritesheet>('textures') as Spritesheet
        let reelLines = [] as ReelSymbol[][]
        const point = new Point()
        for (let reelIndex = 0; reelIndex < 5; reelIndex++) {
            const reelLine = [] as ReelSymbol[]
            const reelType = reelIndex < 3 ? 'normal' : 'small'
            const reelLength = reelType === 'normal' ? 3 : 6
            for (let symbolIndex = -1; symbolIndex < reelLength; symbolIndex++) {
                let symbolId = this.getRandomSymbolId()
                const symbol = new ReelSymbol(reelIndex, symbolId, reelType, spritesheet as Spritesheet)
                this.getSymbolPosition(reelIndex, symbolIndex, point)
                symbol.position.set(point.x, point.y)
                this.addChild(symbol)
                symbol.spinEvents.on('spin_ended', this.onSymbolSpinEnd, this)
                reelLine.push(symbol)
            }
            reelLines.push(reelLine)
        }
        return reelLines
    }

    private getSymbolPosition(reelIndex: number, symbolIndex: number, point: Point = new Point()) {
        const isSmall = this.getReelLength(reelIndex) === 6
        let offset = isSmall ? Reels.OFFSET_SMALL : Reels.OFFSET_NORMAL
        let symbolSize = isSmall ? ReelSymbol.Size.small : ReelSymbol.Size.normal
        point.x = offset.x + (reelIndex % 3) * symbolSize.width
        point.y = offset.y + symbolIndex * symbolSize.height
        return point
    }

    private getReelLength(reelIndex: number) {
        return reelIndex < 3 ? 3 : 6
    }

    private getRandomSymbolId() {
        return Math.floor(Math.random() * 10) + 1
    }

}

export default Reels