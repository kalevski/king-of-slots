import { Container, ObservablePoint, Point, Spritesheet } from 'pixi.js'
import { Context } from '@king-casino/slot-base'
import ReelSymbol from './ReelSymbol'
import { Tween } from 'tweedle.js'


class Reels extends Container {
    
    static OFFSET_NORMAL = { x: 410, y: 280 }
    
    static OFFSET_SMALL = { x: 1237, y: 127 }

    private context: Context

    private reels: ReelSymbol[][] = []

    private tempPoint: Point = new Point()

    private result: number[][] | null = null

    constructor(context: Context) {
        super()
        this.context = context
    }

    init() {
        this.reels = this.createReelLines()
    }

    spinReelLines() {
        console.log('stop spin if in progress')
    

        console.log('start new spin')
    }

    setSpinResult(matrix: number[][], winLines: number[][]) {
        this.result = matrix
    }

    private onSymbolSpinEnd(symbol: ReelSymbol) {
        const reelIndex = symbol.reelIndex
        let reel = this.reels[reelIndex]
        let temp = reel.pop() as ReelSymbol
        reel.unshift(temp)
        this.getSymbolPosition(reelIndex, -1, this.tempPoint)
        temp.position.set(this.tempPoint.x, this.tempPoint.y)

        if (this.result === null) {
            const reelLength = this.getReelLength(reelIndex)
            this.getSymbolPosition(reelIndex, reelLength, this.tempPoint)
            temp.spin(this.tempPoint.y)
            return
        }

        const reelResult = this.result[reelIndex]
        if (reelResult.length === 0) {
            return this.resultCheck()
        }

        let symbolId = reelResult.pop() || null
        let symbolIndex = reelResult.length
        
        this.getSymbolPosition(reelIndex, symbolIndex, this.tempPoint)
        temp.spin(this.tempPoint.y, false)
        temp.changeSymbolId(symbolId as number)
    }

    private resultCheck() {
        if (this.result === null) {
            return
        }
        for (let reel of this.result) {
            if (reel.length > 0) {
                return
            }
        }
        this.result = null
        for (let reel of this.reels) {
            reel.forEach(symbol => symbol.spin(false))
        }
    }

    doUpdate(delta: number, ms: number) {
        for (let reel of this.reels) {
            for (let symbol of reel) {
                symbol.doUpdate(delta, ms)
            }
        }
    }

    private spinReel(reelIndex: number) {
        const reelLength = this.getReelLength(reelIndex)
        this.getSymbolPosition(reelIndex, reelLength, this.tempPoint)
        this.reels[reelIndex].forEach(symbol => {
            symbol.spin(this.tempPoint.y)
        })
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
                const symbol = new ReelSymbol(reelIndex, 0, reelType, spritesheet as Spritesheet)
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

}

export default Reels