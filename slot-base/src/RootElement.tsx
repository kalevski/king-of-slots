import React, { Component } from 'react'
import { Root } from 'react-dom/client'

import DotLoader from './ui/DotLoader'
import BasicRibbon from './ui/BasicRibbon'
import StateManager from './core/StateManager'

type RootElementProps = {
    onceRender: () => void
}

class RootElement extends Component<RootElementProps> {

    componentDidMount(): void {
        const {
            onceRender
        } = this.props
        onceRender()
    }

    render() {
        return (
            <div id="overlay" className="overlay">
                <DotLoader />
                <div className="overlay-components">
                    <BasicRibbon />
                </div>
            </div>
        )
    }

}

export default RootElement

export const StateContext = React.createContext<StateManager>({} as StateManager)

export const renderRootElement = (root: Root, onceRender: () => void, state: StateManager) => {
    
    root.render(
        <StateContext.Provider value={state}>
            <RootElement onceRender={onceRender} />
        </StateContext.Provider>
    )
}