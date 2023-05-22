import { Broadcast, State } from '@toolcase/base'
import general from '../slices/general'
import { Logger } from '@toolcase/logging'
import CustomLoggerFactory from '../CustomLoggingFactory'
import gameplay from '../slices/gameplay'

type General = typeof general

class StateManager extends Broadcast<string,any,any> {

    private static DEFAULT_STATE = '__default'

    private slices: Map<string,State<any>> = new Map()

    private logger: Logger = CustomLoggerFactory.Instance.getLogger('state_manager')

    constructor() {
        super()
        this.create(StateManager.DEFAULT_STATE, general)
        this.create('gameplay', gameplay)
    }

    create<T = General>(key: string, data: T) {
        let slice = new State(data)
        this.slices.set(key || StateManager.DEFAULT_STATE, slice)
        return this
    }

    get<T = General>(key?: string) {
        return this.slices.get(key || StateManager.DEFAULT_STATE) as State<T>
    }

    dispatch(eventName: string, message?: any) {
        if (this.listenerCount(eventName) === 0) {
            return this.logger.warning(`event ${eventName} is not handled`)
        }
        this.logger.verbose(`event dispatched [${eventName}], payload: ${JSON.stringify(message)}`)
        this.emit(eventName, message)
    }

}

export default StateManager