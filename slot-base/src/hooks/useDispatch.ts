import { useContext } from 'react'
import { StateContext } from '../RootElement'

function useDispatch() {

    const stateManager = useContext(StateContext)

    return function emit(event: string, message?: any) {
        stateManager.dispatch(event, message)
    }
}

export default useDispatch