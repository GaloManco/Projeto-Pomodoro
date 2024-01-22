import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycle, cycleReducer } from '../reducers/cycles/reducer'
import {
  // ActionTypes,
  addNewCyleAction,
  interruptCurrentCycleAction,
  markCurrentCycleFinishedAction,
} from '../reducers/cycles/action'
import { differenceInSeconds } from 'date-fns'

interface CreateCycleData {
  task: string
  minutos: number
}

interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
  markCurrentCycleFinished: () => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}
interface CyclesContextProviderProps {
  children: ReactNode
}

export const CycleContext = createContext({} as CycleContextType)
export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cycleReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
      return initialState
    },
  )

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((state) => state.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.starDate))
    }
    // const secondsDifference = differenceInSeconds(
    // new Date(),
    // new Date(activeCycle.starDate)
    return 0
  })

  function markCurrentCycleFinished() {
    dispatch(markCurrentCycleFinishedAction())
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutos: data.minutos,
      starDate: new Date(),
    }

    dispatch(addNewCyleAction(newCycle))

    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CycleContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleFinished,
        setSecondsPassed,
        amountSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        cycles,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
