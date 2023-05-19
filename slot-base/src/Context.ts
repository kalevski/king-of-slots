import { Application, Ticker } from 'pixi.js'
import { LoggerFactory } from '@toolcase/logging'

import Runtime from './Runtime'
import { Config, ISlot } from './main'
import LayerManager from './core/LayerManager'
import CustomLoggerFactory from './CustomLoggingFactory'


const DEFAULT_CONFIG: Config = {
    width: 1280,
    height: 720
}

class Context extends Application {

    private slot: ISlot

    private config: Config

    private runtime: Runtime

    public ticker: Ticker

    public layers: LayerManager

    public logging: LoggerFactory = new CustomLoggerFactory()

    constructor(config: Config = DEFAULT_CONFIG) {
        super({
            width: config.width || 1280,
            height: config.height || 720
        })

        this.config = config
        this.runtime = new Runtime(this.config)

    }

    run(slot: ISlot) {
        this.slot = slot
        this.runtime.init()
        this.runtime.once('initialized', this.onInit, this)
        this.runtime.on('resized', this.onResize, this)
    }

    shutdown() {
        // TODO: implement shutdown
    }

    private onInit() {
        const canvasParent = this.runtime.getCanvasParent()
        canvasParent.append(this.view as HTMLCanvasElement)

        this.ticker = new Ticker()
        this.ticker.add(this.onUpdate, this)


    }

    private onUpdate(dt: number) {
        this.layers.doUpdate(dt, this.ticker.deltaMS)
    }

    private onResize() {
        const rootEl = this.runtime.getCanvasParent()
        const { width = 0, height = 0 } = this.renderer.options
        let gcd = this.getGCD(width, height)
        let ratio = {
            width: width / gcd,
            height: height / gcd
        }
        let sizeWidth = rootEl.clientWidth / ratio.width
        let sizeHeight = rootEl.clientHeight / ratio.height
        let root = {
            width: rootEl.clientWidth === 0 ? Number.MAX_SAFE_INTEGER : rootEl.clientWidth,
            height: rootEl.clientHeight === 0 ? Number.MAX_SAFE_INTEGER : rootEl.clientHeight,
        }
        let pixelsPerUnit = sizeWidth < sizeHeight ? root.width / ratio.width : root.height / ratio.height
        this.view.width = ratio.width * pixelsPerUnit
        this.view.height = ratio.height * pixelsPerUnit
        this.stage.scale.set(this.view.width / width, this.view.height / height)
        this.renderer.resize(this.view.width, this.view.height)
    }

    private getGCD(width:number, height:number): number {
        return height === 0 ? width : this.getGCD(height, width % height)
    }

}

export default Context