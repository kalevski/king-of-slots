import { Application, Assets, Ticker } from 'pixi.js'
import { LoggerFactory } from '@toolcase/logging'

import Runtime from './Runtime'
import { Config, ISlotRuntime } from './main'
import LayerManager from './core/LayerManager'
import CustomLoggerFactory from './CustomLoggingFactory'
import AssetManager from './core/AssetManager'
import StateManager from './core/StateManager'
import ServiceManager from './core/ServiceManager'


const DEFAULT_CONFIG: Config = {
    width: 1280,
    height: 720
}

class Context {
    
    public config: Config
    
    public app: Application
    
    public ticker: Ticker

    public layers: LayerManager

    public assets: AssetManager

    public state: StateManager

    public services: ServiceManager

    public logging: LoggerFactory = CustomLoggerFactory.Instance

    private delayOnRun = 0

    private slot: ISlotRuntime

    private runtime: Runtime

    constructor(config: Config = DEFAULT_CONFIG) {
        this.config = config
        this.state = new StateManager()
        this.runtime = new Runtime(this.config, this.state)

    }

    run(slot: ISlotRuntime) {
        this.slot = slot
        this.runtime.init()
        this.runtime.once('initialized', this.onInit, this)
        this.runtime.on('resized', this.onResize, this)
    }

    shutdown() {
        // TODO: implement shutdown
    }

    private onInit() {
        this.app = new Application({
            width: this.config.width || 1280,
            height: this.config.height || 720,
            background: '#000'
        })

        const parent = document.getElementById('game') as HTMLDivElement
        parent.appendChild(this.app.view as HTMLCanvasElement)

        this.ticker = new Ticker()
        this.ticker.add(this.onUpdate, this)

        this.layers = new LayerManager(this)
        this.assets = new AssetManager(this)
        this.services = new ServiceManager(this)

        setTimeout(() => {
            this.slot.onStart(this)
            this.ticker.start()
        }, this.delayOnRun * 1000)
    }

    private onUpdate(dt: number) {
        this.slot.onUpdate(dt, this.ticker.deltaMS)
        this.layers.doUpdate(dt, this.ticker.deltaMS)
    }

    private onTerminate() {
        this.slot.onTerminate(this)
    }

    private onResize() {
        const rootEl = this.runtime.getCanvasParent()
        const { width = 0, height = 0 } = this.app.renderer.options
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
        this.app.view.width = ratio.width * pixelsPerUnit
        this.app.view.height = ratio.height * pixelsPerUnit
        this.app.stage.scale.set(this.app.view.width / width, this.app.view.height / height)
        this.app.renderer.resize(this.app.view.width, this.app.view.height)
    }

    private getGCD(width:number, height:number): number {
        return height === 0 ? width : this.getGCD(height, width % height)
    }

}

export default Context