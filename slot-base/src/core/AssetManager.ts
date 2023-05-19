import { Broadcast } from '@toolcase/base'
import Context from '../Context'
import { Assets } from 'pixi.js'

type AssetManagerEvents = 'started' | 'file_completed' | 'done'
type AssetManagerCallback = () => void

type QueueEntry = {
    key: string
    url: string
}

class AssetManager extends Broadcast<AssetManagerEvents, AssetManagerCallback, any> {

    private context: Context

    private cache: Map<string,any> = new Map()

    private queue: Array<QueueEntry> = []

    constructor(context: Context) {
        super()
        this.context = context
    }

    load(key: string, url: string) {
        this.queue.push({ key, url })
    }

    flush() {
        this.queue = []
    }

    get<T>(key: string) {
        return this.cache.get(key) as T || null
    }

    async start() {
        const queue = [ ...this.queue ]
        this.queue = []
        for (let entry of queue) {
            let asset = await Assets.load(entry.url)
            this.emit('file_completed', entry)
            this.cache.set(entry.key, asset)
        }
        this.emit('done')
    }



}

export default AssetManager