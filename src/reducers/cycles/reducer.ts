import { ActionTypes, ActionTypesProps } from './action'
import { produce } from 'immer'
export interface Cycle {
  id: string
  task: string
  minutos: number
  starDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cycleReducer(state: CyclesState, action: ActionTypesProps) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, interruptedDate: new Date() }
      //     } else {
      //       return state
      //     }
      //   }),

      //   activeCycleId: null,
      // }

      const correntCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (correntCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[correntCycleIndex].interruptedDate = new Date()
        draft.activeCycleId = null
      })
    }
    case ActionTypes.MARCK_CURRENT_CYCLE_FINISHED: {
      const correntCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (correntCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[correntCycleIndex].interruptedDate = new Date()
        draft.activeCycleId = null
      })
    }
    // return {
    //   ...state,
    //   cycles: state.cycles.map((cycle) => {
    //     if (cycle.id === state.activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() }
    //     } else {
    //       return state
    //     }
    //   }),
    //   activeCycleId: null,
    // }

    default:
      return state
  }
}
