import Context from '../Context'
import Service from './Service'

interface IService<T> {
    new (context: Context): T
}

class ServiceManager {

    private context: Context

    private services: Service[] = []

    constructor(context: Context) {
        this.context = context
    }

    register<T = Service>(serviceClass: IService<T>) {
        let service = new serviceClass(this.context) as Service
        this.services.push(service)
        service.onInitialize()
    }

}

export default ServiceManager