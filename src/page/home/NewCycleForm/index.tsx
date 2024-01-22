import { FormeContainer, MinuteAmounteInput, TaskInput } from './style'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CycleContext } from '../../../contexts/CyclesContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext)
  const { register } = useFormContext()

  return (
    <FormeContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        disabled={!!activeCycle}
        type="text"
        id="task"
        placeholder="Dê um nome para o seu projeto"
        list="task-suggestion"
        {...register('task')}
      />

      <datalist id="task-suggestion">
        <option value="projeto 1"></option>
        <option value="projeto 2"></option>
        <option value="projeto 3"></option>
        <option value="projeto 4"></option>
      </datalist>

      <label htmlFor="number">durante</label>
      <MinuteAmounteInput
        type="number"
        id="number"
        disabled={!!activeCycle}
        placeholder="00"
        max={60}
        min={0}
        step={1}
        {...register('minutos', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormeContainer>
  )
}
