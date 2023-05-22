import React from 'react'
import useState from '../hooks/useState'

const DotLoader = () => {

    const state = useState('state.loading')

    return (
        <div id="app-loading" className="dot-loader-container" style={{
            opacity: state.loading ? 1 : 0
        }}>
            <div className="dot-loader"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default DotLoader