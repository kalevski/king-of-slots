import Context from './Context'
import Layer from './core/Layer'

import '../style/index.scss'

export type Config = {

    parentId?: string,
    width: number
    height: number

}

export interface ISlotRuntime {
    
    onStart(context: Context): void

    onTerminate(context: Context): void
}

export { Context, Layer }