import { Service, GameplaySlice } from '@king-casino/slot-base'
import KingCasinoAPI from './KingCasinoAPI'

class KingCasinoGameplay extends Service {

    private bet = {
        min: 0,
        max: 0,
        step: 0
    }

    private api: KingCasinoAPI

    spinLock: boolean = false

    get gameplay() {
        return this.context.state.get<GameplaySlice>('gameplay')
    }

    onInitialize(): void {
        this.api = this.context.services.get(KingCasinoAPI) as KingCasinoAPI
        
        this.initSetup()

        this.context.state.on('ribbon.spin', this.onSpinInvoked, this)
        this.context.state.on('ribbon.spin', this.onManualSpin, this)
        this.context.state.on('ribbon.spin.auto', this.onAutoSpin, this)
        this.context.state.on('ribbon.bet.increase', this.onBetIncrease, this)
        this.context.state.on('ribbon.bet.decrease', this.onBetDecrease, this)

    }

    onDispose(): void {
        
    }

    private async initSetup() {
        // TODO: make API call to fetch preferences
        
        let gamePreferneces = await this.api.getGamePreferences()
        let userBalance = await this.api.getUserBalance()

        this.bet.min = gamePreferneces.betMin
        this.bet.max = gamePreferneces.betMax
        this.bet.step = gamePreferneces.betStep

        this.gameplay.set({
            currency: {
                sign: gamePreferneces.currencySign,
                multiplier: gamePreferneces.currencyMultiplier
            },
            bet: gamePreferneces.betMin,
            balance: userBalance.balance
        })
    }

    private onManualSpin() {
        this.gameplay.set({
            auto: false
        })
    }

    private onAutoSpin() {
        const isAutoSpin = this.gameplay.get().auto as boolean
        this.gameplay.set({
            auto: !isAutoSpin
        })
        this.onSpinInvoked()
    }

    private async onSpinInvoked() {
        // TODO: call backend for to make spin
        
        if (this.spinLock) {
            return
        }
        
        this.spinLock = true

        let currentBet = this.gameplay.get().bet
        this.context.state.dispatch('gameplay.spin')

        let data = await this.api.callSpin(currentBet as number)
        const { balance, bet, lastWin, matrix, winLines } = data
        this.gameplay.set({
            balance: balance,
            bet: bet,
            lastWin: lastWin,
            matrix: matrix,
            winLines: winLines
        })
        this.context.state.dispatch('gameplay.spin.result')

        this.spinLock = false

        const isAutoSpin = this.gameplay.get().auto as boolean
        if (isAutoSpin) {
            let spinDelay = lastWin !== 0
            setTimeout(() => this.onSpinInvoked(), spinDelay ? 2000 : 500)
        }
    }

    private onBetIncrease() {
        let currentBet = this.gameplay.get().bet as number
        if (currentBet + this.bet.step <= this.bet.max) {
            this.gameplay.set({
                bet: currentBet + this.bet.step,
                auto: false
            })
        }
    }

    private onBetDecrease() {
        let currentBet = this.gameplay.get().bet as number
        if (currentBet - this.bet.step >= this.bet.min) {
            this.gameplay.set({
                bet: currentBet - this.bet.step,
                auto: false
            })
        }
    }

}

export default KingCasinoGameplay