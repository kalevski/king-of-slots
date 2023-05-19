import { Container } from 'pixi.js'
import { Logger } from '@toolcase/logging'

import Context from '../Context'

class Layer extends Container {

    readonly key:string

    readonly context: Context

    protected logger: Logger

    constructor(context: Context, key: string) {
        super()
        this.context = context
        this.key = key
        this.logger = this.context.logging.getLogger(`layer=${key}`)
    }

    onCreate() {}

    onUpdate(delta: number, ms: number) {}

    onDestroy() {}

}

export default Layer