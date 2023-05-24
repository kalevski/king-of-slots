import { GameplaySlice, Service } from '@king-casino/slot-base'

interface ISpinEndpointResponse {
    bet: number,
    balance: number,
    lastWin: number,
    winLines: number[][][],
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

interface ISpinResult {
    matrix: number[][]
    winLines: number[][][]
}

class KingCasinoAPI extends Service {

    async getGamePreferences() {
        await this.networkThrottle()
        return {
            betMin: 6,
            betMax: 72,
            betStep: 3,
            currencySign: '$',
            currencyMultiplier: 1
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
        const result = this.getSpinResult()
        const hasWin = result.winLines.length > 0
        
        let winAmount = hasWin ? Math.floor(Math.random() * 50) + 10 - bet : -bet

        let prevBalance = this.gameplay.get().balance as number


        const data: ISpinEndpointResponse = {
            lastWin: hasWin ? winAmount * bet : 0,
            balance: prevBalance + winAmount,
            bet: bet,
            winLines: result.winLines,
            matrix: result.matrix
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

    private getSpinResult() : ISpinResult {
        
        const winLines = 6

        let matrix = [] as number[][]
        if (window['forceWin'] === true) {
            window['forceWin'] = false
            matrix = [
                [1, 1, 4],
                [1, 2, 4],
                [1, 3, 4],
                [1, 4, 4, 1, 5, 1],
                [1, 5, 4, 3, 3, 2]
            ]
        } else {
            matrix = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]
            ].map(reel => reel.map(() => this.getRandomSymbol()))
        }
        
        const winLineList = [] as number[][][]

        for (let lineIndex = 0; lineIndex < winLines; lineIndex++) {
            
            const line = [] as number[][]
            const symbols = [ 2, 2, 2, 1, 1 ].map((value, index) => {
                let indexA = index
                let indexB = Math.floor(lineIndex / value)
                line.push([ indexA, indexB ])
                return matrix[indexA][indexB]
            })
            let isWinLine = symbols.every(value => value === symbols[0])
            if (isWinLine) {
                winLineList.push(line)
            }
        }

        return {
            matrix: matrix,
            winLines: winLineList
        }
    }


    private getRandomSymbol() {
        return Math.floor(Math.random() * 10) + 1
    }

}

export default KingCasinoAPI