import Context from './Context'
import Layer from './core/Layer'
import Service from './core/Service'

import '../style/index.scss'

import useStateManager from './hooks/useStateManager'
import useDispatch from './hooks/useDispatch'
import useState from './hooks/useState'

import general from './slices/general'
import gameplay from './slices/gameplay'

export type GeneralSlice = Partial<typeof general>
export type GameplaySlice = Partial<typeof gameplay>

export type Config = {

    parentId?: string,
    width: number
    height: number

}

export interface ISlotRuntime {
    
    onStart(context: Context): void

    onTerminate(context: Context): void
}

export const hooks = {
    useDispatch,
    useStateManager,
    useState
}

export { Context, Layer, Service }