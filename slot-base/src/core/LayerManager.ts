import Context from '../Context'
import Layer from './Layer';

interface ILayer {
    new (context: Context, key: string): Layer;
}

class LayerManager {

    readonly context: Context

    readonly list: Array<Layer> = []

    constructor(context: Context) {
        this.context = context
    }

    register(key: string, layerClass: ILayer) : Layer {
        let layer = new layerClass(this.context, key)
        this.list.push(layer)
        this.context.stage.addChild(layer)
        layer.onCreate()
        return layer
    }

    doUpdate(delta: number, ms: number): void {
        for (let layer of this.list) {
            layer.onUpdate(delta, ms)
        }
    }

    get(key: string) : Layer | null {
        let index = this.list.findIndex(layer => layer.key === key)
        if (index === -1) {
            return null
        }
        return this.list[index] || null
    }

    destroy(key: string) : this {
        let index = this.list.findIndex(layer => layer.key === key)
        if (index !== -1) {
            let [ layer ] = this.list.splice(index, 1) as Array<Layer>
            (layer as Layer).onDestroy()
            this.context.stage.removeChild(layer as Layer)
        }
        return this
    }

}

export default LayerManager