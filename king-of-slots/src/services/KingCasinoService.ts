import { Service, GameplaySlice } from '@king-casino/slot-base'

class KingCasinoService extends Service {

    onInitialize(): void {
        // TODO: make API call to fetch casino currency
        this.fetchUserPreferences()
        this.fetchUserBalance()
    }

    onDispose(): void {
        
    }

    private fetchUserPreferences() {
        // TODO: make API call to fetch preferences
        this.state.get<GameplaySlice>('gameplay').set({
            currency: {
                sign: 'MKD ',
                multiplier: 4.5
            }
        })
    }

    private fetchUserBalance() {
        // TODO: make API call to fetch user balance
        this.state.get<GameplaySlice>('gameplay').set({
            balance: 400
        })

    }

}

export default KingCasinoService