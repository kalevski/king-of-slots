import React from 'react'

const BasicRibbon = () => {

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
                    <div className="item-value">2500</div>
                    <div className="item-value-2nd">$244.00</div>
                </div>
                <div className="item item-display">
                    <div className="item-title">win</div>
                    <div className="item-value">2500</div>
                    <div className="item-value-2nd">$244.00</div>
                </div>
                <div className="item item-display">
                    <div className="item-title">bet</div>
                    <div className="item-value">5</div>
                    <div className="item-value-2nd">$1.00</div>
                </div>
            </div>
            <div className="spin-button"></div>
        </div>
    )

}

export default BasicRibbon