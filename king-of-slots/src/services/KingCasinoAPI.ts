import { GameplaySlice, Service } from '@king-casino/slot-base'

interface ISpinEndpointResponse {
    bet: number,
    balance: number,
    lastWin: number,
    winLines: number[][],
    matrix: number[][]
}

interface IUserBalanceResponse {
    balance: number
}

interface IGamePreferencesResponse {
    currencySign: string,
    currencyMultiplier: number,
    betMin: number,
    betMax:number,
    betStep: number
}

class KingCasinoAPI extends Service {

    async getGamePreferences() {
        await this.networkThrottle()
        return {
            betMin: 3,
            betMax: 36,
            betStep: 1.5,
            currencySign: '$',
            currencyMultiplier: 0.25
        } as IGamePreferencesResponse
    }

    async getUserBalance() {
        await this.networkThrottle()
        let userBalance = Math.floor(Math.random() * 1000) + 144
        return {
            balance: userBalance
        } as IUserBalanceResponse

    }

    async callSpin(bet: number) {
        await this.networkThrottle()
        let hasWin = Math.floor(Math.random() * 1000) > 700
        let winAmount = Math.floor(Math.random() * 50) + 10

        let prevBalance = this.gameplay.get().balance as number

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
        return data
    }

    private get gameplay() {
        return this.context.state.get<GameplaySlice>('gameplay')
    }

    private networkThrottle(): Promise<void> {
        const latency = Math.floor(Math.random() * 500) + 50
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, latency)
        })
    }

}

export default KingCasinoAPI