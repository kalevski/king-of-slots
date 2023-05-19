import { Context, ISlotRuntime } from '@king-casino/slot-base'

// import '@king-casino/slot-base/lib/main.css'

import Background from './layers/Background'
import SlotFrame from './layers/SlotFrame'

const context = new Context({
    parentId: 'game',
    width: 1920,
    height: 1080
})

class KingOfSlots implements ISlotRuntime {
    
    async onStart(context: Context): Promise<void> {
        context.assets.load('background', '/assets/background.jpg')
        context.assets.load('textures', '/assets/king_of_slots_assets.json')
        await context.assets.start()

        context.layers.register('background', Background)
        context.layers.register('slot_frame', SlotFrame)
    }
    
    onTerminate(context: Context): void {
        
    }
}

context.run(new KingOfSlots())

