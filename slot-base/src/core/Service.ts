import Context from '../Context'

class Service {

    protected context: Context

    constructor(context: Context) {
        this.context = context
    }

    public onInitialize() {}

    public onDispose() {}

}

export default Service