import { Context, ISlotRuntime } from '@king-casino/slot-base'
import * as TWEEDLE from 'tweedle.js'

import Background from './layers/Background'
import SlotFrame from './layers/SlotFrame'

import KingCasinoGameplay from './services/KingCasinoGameplay'
import KingCasinoAPI from './services/KingCasinoAPI'

const context = new Context({
    parentId: 'game',
    width: 1920,
    height: 1080
})

class KingOfSlots implements ISlotRuntime {
    
    async onStart(context: Context): Promise<void> {

        context.state.get().set({ loading: true })

        context.assets.load('background', '/assets/background.jpg')
        context.assets.load('textures', '/assets/king_of_slots_assets.json')
        await context.assets.start()

        context.state.get().set({ loading: false })

        context.services.register(KingCasinoAPI)
        context.services.register(KingCasinoGameplay)

        context.layers.register('background', Background)
        context.layers.register('slot_frame', SlotFrame)
    }

    onUpdate(delta: number, ms: number): void {
        TWEEDLE.Group.shared.update(delta)
    }
    
    onTerminate(context: Context): void {
        
    }
}

context.run(new KingOfSlots())

