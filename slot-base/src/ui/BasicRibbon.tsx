import React from 'react'
import useDispatch from '../hooks/useDispatch'
import useState from '../hooks/useState'

import { GameplaySlice } from 'src/main'

const BasicRibbon = () => {
    
    const dispatch = useDispatch()
    const gameplay = useState<GameplaySlice>('change', 'gameplay')

    const toCurrency = (value: number) => {
        const { currency } = gameplay
        const { sign, multiplier } = currency || {
            sign: '$',
            multiplier: 1
        }
        return `${sign}${value * multiplier}`
    }

    const {
        balance = 0,
        lastWin = 0,
        bet = 0
    } = gameplay

    return (
        <div className="component ribbon basic-ribbon">
            <div className="ribbon-menu">
                <div className="ribbon-menu-container">
                    <div className="ribbon-menu-circle"></div>
                </div>
            </div>
            <div className="ribbon-container">
                <div className="item item-display">
                    <div className="item-title">balance</div>
                    <div className="item-value">{balance}</div>
                    <div className="item-value-2nd">{toCurrency(balance)}</div>
                </div>
                <div className="item item-display">
                    <div className="item-title">win</div>
                    <div className="item-value">{lastWin}</div>
                    <div className="item-value-2nd">{toCurrency(lastWin)}</div>
                </div>
                <div className="item item-display">
                    <div className="item-title">bet</div>
                    <div className="item-value">{bet}</div>
                    <div className="item-value-2nd">{toCurrency(bet)}</div>
                </div>
                <div className="item item-button">
                    <div className="auto-spin"></div>
                </div>
            </div>
            <div onClick={() => dispatch('ribbon.spin')} className="spin-button"></div>
        </div>
    )

}

export default BasicRibbon