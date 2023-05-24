const gameplay = {

    balance: 0,

    lastWin: 0,

    bet: 5,

    currency: {
        sign: '$',
        multiplier: 0.2
    },

    auto: false,

    winLines: [] as number[][][],

    matrix: [] as number[][]
}

export default gameplay