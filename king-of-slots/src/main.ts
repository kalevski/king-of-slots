import { Context, ISlotRuntime } from '@king-casino/slot-base'

import Background from './layers/Background'
import SlotFrame from './layers/SlotFrame'
import KingCasinoService from './services/KingCasinoService'

import matrix from './matrix'

const context = new Context({
    parentId: 'game',
    width: 1920,
    height: 1080
})

class KingOfSlots implements ISlotRuntime {
    
    async onStart(context: Context): Promise<void> {

        context.state.create('matrix', matrix)

        context.state.get().set({ loading: true })

        context.assets.load('background', '/assets/background.jpg')
        context.assets.load('textures', '/assets/king_of_slots_assets.json')
        await context.assets.start()

        context.state.get().set({ loading: false })

        context.services.register(KingCasinoService)

        context.layers.register('background', Background)
        context.layers.register('slot_frame', SlotFrame)
    }
    
    onTerminate(context: Context): void {
        
    }
}

context.run(new KingOfSlots())

