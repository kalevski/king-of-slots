import Context from '../Context'
import StateManager from './StateManager'

class Service {

    protected state: StateManager

    constructor(context: Context) {
        this.state = context.state
    }

    public onInitialize() {

    }

    public onDispose() {

    }

}

export default Service