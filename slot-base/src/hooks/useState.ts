import { useState as useReactState, useEffect, useContext } from 'react'
import { StateContext } from '../RootElement'
import { GeneralSlice } from 'src/main'

type EventName = ('change') | string

function useState<T = GeneralSlice>(event: EventName, slice?: string) {

    const stateManager = useContext(StateContext)

    const [ stateChanges, setStateChanges ] = useReactState(0)

    useEffect(() => {
     
        function handleChange() {
            setStateChanges(stateChanges + 1)
        }

        stateManager.get(slice).on(event, handleChange)
        return () => {
            stateManager.get(slice).off(event, handleChange)
        }

    })

    return stateManager.get(slice).get() as T
}

export default useState