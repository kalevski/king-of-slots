import React, { Component } from 'react'
import { Root } from 'react-dom/client'

import BasicRibbon from './ui/BasicRibbon'

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
                <div className="overlay-components">
                    <BasicRibbon />
                </div>
            </div>
        )
    }

}

export default RootElement

export const renderRootElement = (root: Root, onceRender: () => void) => {
    root.render(<RootElement onceRender={onceRender} />)
}