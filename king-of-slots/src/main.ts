import { Context, ISlotRuntime } from '@king-casino/slot-base'

import '@king-casino/slot-base/lib/main.css'

import Loader from './layers/Loader'

const context = new Context({
    parentId: 'game',
    width: 1280,
    height: 720
})

class KingOfSlots implements ISlotRuntime {
    
    onStart(context: Context): void {
        context.layers.register('loader', Loader)
    }
    
    onTerminate(context: Context): void {
        
    }

}

context.run(new KingOfSlots())

