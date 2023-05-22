import Context from '../Context'

class AppLoading {

    private context: Context

    constructor(context: Context) {
        this.context = context
    }

    start() {
        this.getLoaderElement().style.opacity = '1'
    }

    stop() {
        this.getLoaderElement().style.opacity = '0'
    }

    private getLoaderElement(): HTMLDivElement {
        return document.getElementById('app-loading') as HTMLDivElement
    }

}

export default AppLoading