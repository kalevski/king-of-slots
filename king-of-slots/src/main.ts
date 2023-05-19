import { Context } from '@king-casino/slot-base'
import '@king-casino/slot-base/lib/main.css'

import KingOfSlots from './KingOfSlots'

const context = new Context({
    parentId: 'game',
    width: 1280,
    height: 720
})

const kingOfSlots = new KingOfSlots()

context.run(kingOfSlots)

