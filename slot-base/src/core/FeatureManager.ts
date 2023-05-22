import AppLoading from '../features/AppLoading'
import Context from '../Context'

class FeatureManager {

    readonly loading: AppLoading

    private context: Context

    constructor(context: Context) {
        this.context = context
        this.loading = new AppLoading(this.context)
    }

}

export default FeatureManager