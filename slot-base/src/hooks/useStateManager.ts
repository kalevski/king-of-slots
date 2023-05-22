import { useContext } from 'react'
import { StateContext } from '../RootElement'

function useStateManager() {
    const stateManager = useContext(StateContext)
    return stateManager
}

export default useStateManager