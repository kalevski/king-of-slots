import { Context, ISlot } from '@king-casino/slot-base'
import Loader from './layers/Loader'

class KingOfSlots implements ISlot {
    
    onStart(context: Context): void {
        context.layers.register('loader', Loader)
    }
    
    onTerminate(): void {
        
    }

}

export default KingOfSlots