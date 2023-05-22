import { Service, GameplaySlice } from '@king-casino/slot-base'

interface ISpinEndpointResponse {
    bet: number,
    balance: number,
    lastWin: number,
    winLines: number[][],
    matrix: number[][]
}

class KingCasinoService extends Service {

    private bet = {
        min: 0,
        max: 0,
        step: 0
    }

    spinLock: boolean = false

    onInitialize(): void {
        // TODO: make API call to fetch casino currency
        this.fetchUserPreferences()
        this.fetchUserBalance()

        this.state.on('ribbon.spin', this.onSpinInvoked, this)
        this.state.on('ribbon.spin', this.onManualSpin, this)
        this.state.on('ribbon.spin.auto', this.onAutoSpin, this)
        this.state.on('ribbon.bet.increase', this.onBetIncrease, this)
        this.state.on('ribbon.bet.decrease', this.onBetDecrease, this)

    }

    onDispose(): void {
        
    }

    private fetchUserPreferences() {
        // TODO: make API call to fetch preferences
        this.state.get<GameplaySlice>('gameplay').set({
            currency: {
                sign: '$',
                multiplier: .5
            }
        })
    }

    private fetchUserBalance() {
        // TODO: make API call to fetch user balance
        let userBalance = Math.floor(Math.random() * 1000) + 144
        // TODO: make API call to fetch min/max/step bet
        this.bet.min = 3
        this.bet.step = 1.5
        this.bet.max = 36


        this.state.get<GameplaySlice>('gameplay').set({
            balance: userBalance,
            bet: this.bet.min
        })
    }

    private onManualSpin() {
        this.state.get<GameplaySlice>('gameplay').set({
            auto: false
        })
    }

    private onAutoSpin() {
        const isAutoSpin = this.state.get<GameplaySlice>('gameplay').get().auto as boolean
        this.state.get<GameplaySlice>('gameplay').set({
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

        let currentBet = this.state.get<GameplaySlice>('gameplay').get().bet
        this.state.dispatch('gameplay.spin')

        let data = await this.callSpinEndpoint(currentBet as number)
        const { balance, bet, lastWin, matrix, winLines } = data
        this.state.get<GameplaySlice>('gameplay').set({
            balance: balance,
            bet: bet,
            lastWin: lastWin,
            matrix: matrix,
            winLines: winLines
        })
        this.state.dispatch('gameplay.spin.result')

        this.spinLock = false

        const isAutoSpin = this.state.get<GameplaySlice>('gameplay').get().auto as boolean
        if (isAutoSpin) {
            let spinDelay = lastWin !== 0
            setTimeout(() => this.onSpinInvoked(), spinDelay ? 2000 : 500)
        }
    }

    private onBetIncrease() {
        let currentBet = this.state.get<GameplaySlice>('gameplay').get().bet as number
        if (currentBet + this.bet.step <= this.bet.max) {
            this.state.get<GameplaySlice>('gameplay').set({
                bet: currentBet + this.bet.step,
                auto: false
            })
        }
    }

    private onBetDecrease() {
        let currentBet = this.state.get<GameplaySlice>('gameplay').get().bet as number
        if (currentBet - this.bet.step >= this.bet.min) {
            this.state.get<GameplaySlice>('gameplay').set({
                bet: currentBet - this.bet.step,
                auto: false
            })
        }
    }

    private callSpinEndpoint(bet: number): Promise<ISpinEndpointResponse> {
        let hasWin = Math.floor(Math.random() * 1000) > 700
        let winAmount = Math.floor(Math.random() * 50) + 10

        let prevBalance = this.state.get<GameplaySlice>('gameplay').get().balance as number

        const data: ISpinEndpointResponse = {
            lastWin: hasWin ? winAmount * bet : 0,
            balance: prevBalance + winAmount,
            bet: bet,
            winLines: [],
            matrix: [
                [ 1, 2, 3 ],
                [ 1, 2, 3 ],
                [ 1, 2, 3 ],
                [ 1, 2, 3, 4, 5, 6 ],
                [ 1, 2, 3, 4, 5, 6 ]
            ]

        }

        let latency = Math.floor(Math.random() * 500) + 50
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(data)
            }, latency)
        })
    }

}

export default KingCasinoService