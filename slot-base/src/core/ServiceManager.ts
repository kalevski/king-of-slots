import Context from '../Context'
import Service from './Service'
import md5 from 'md5'

type ServiceClass<T> = new (context: Context) => T

class ServiceManager {

    private context: Context

    private services: Map<string, Service> = new Map()

    constructor(context: Context) {
        this.context = context
    }

    register<T = Service>(serviceClass: ServiceClass<T>) {
        let service = new serviceClass(this.context) as Service
        let key = this.getUniqueKey(serviceClass)
        this.services.set(key, service)
        service.onInitialize()
        return service as T
    }

    get<T = Service>(serviceClass: ServiceClass<T>) {
        let key = this.getUniqueKey(serviceClass)
        return this.services.get(key) || null
    }

    private getUniqueKey<T = Service>(serviceClass: ServiceClass<T>) {
        let constructorCode = serviceClass.toString()
        return md5(constructorCode)
    }

}

export default ServiceManager