import { Cycle } from './reducer'

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARCK_CURRENT_CYCLE_FINISHED = 'MARCK_CURRENT_CYCLE_FINISHED',
}

export type ActionTypesProps =
  | { type: ActionTypes.ADD_NEW_CYCLE; payload: { newCycle: Cycle } }
  | { type: ActionTypes.INTERRUPT_CURRENT_CYCLE }
  | { type: ActionTypes.MARCK_CURRENT_CYCLE_FINISHED }

export function addNewCyleAction(newCycle: Cycle): ActionTypesProps {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function markCurrentCycleFinishedAction(): ActionTypesProps {
  return {
    type: ActionTypes.MARCK_CURRENT_CYCLE_FINISHED,
  }
}

export function interruptCurrentCycleAction(): ActionTypesProps {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}
