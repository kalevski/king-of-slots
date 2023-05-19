import { createRoot, Root } from 'react-dom/client'

import { Config } from './main'
import { renderRootElement } from './RootElement'
import { Broadcast } from '@toolcase/base'

type RuntimeEvents = 'initialized' | 'resized'
type RuntimeCallback = () => void

class Runtime extends Broadcast<RuntimeEvents,RuntimeCallback,any> {

    public viewport = {
        width: 0,
        height: 0
    }

    private parentEl: HTMLElement | null

    private reactRoot: Root

    private config: Config

    constructor(config: Config) {
        super()
        this.config = config
        this.parentEl = document.getElementById(config.parentId || 'game')
    }

    init() {
        if (this.parentEl === null) {
            throw new Error('TODO: error message')
        }
        this.parentEl.classList.add('parent-container')
        this.reactRoot = createRoot(this.parentEl)
        renderRootElement(this.reactRoot, () => this.onceRender())
    }

    getCanvasParent(): HTMLDivElement {
        return this.parentEl as HTMLDivElement
    }

    getOverlay(): HTMLDivElement {
        return document.getElementById('overlay') as HTMLDivElement
    }

    private onceRender() {
        window.addEventListener('resize', () => this.onResize()) // check params
        this.emit('initialized')
        this.getOverlay().style.width = this.config.width?.toString() + 'px'
        this.getOverlay().style.height = this.config.height?.toString() + 'px'
        this.onResize()
    }

    private onResize() {
        this.emit('resized')
        const canvas = this.parentEl?.children.item(1) as HTMLCanvasElement

        const scaleX = canvas.width / this.config.width
        const scaleY = canvas.height / this.config.height

        this.getOverlay().style.transform = `scale(${scaleX}, ${scaleY})`

    }

}

export default Runtime