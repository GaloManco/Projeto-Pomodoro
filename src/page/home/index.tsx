import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { NewCycleForm } from './NewCycleForm'
import { Countdown } from './Countdown'
import { CycleContext } from '../../contexts/CyclesContext'
import * as zod from 'zod'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutos: zod
    .number()
    .min(1, 'O mínimu deve ser 5 minutos')
    .max(60, 'O máximo deve ser 60 minutos'),
})

type TFormeValidacao = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activeCycle, interruptCurrentCycle, createNewCycle } =
    useContext(CycleContext)

  const newCycleForm = useForm<TFormeValidacao>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutos: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: TFormeValidacao) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            <img src="" alt="" />
            <HandPalm size={20} />
            começar
          </StopCountdownButton>
        ) : (
          <StartCountdownButton
            type="submit"
            // onClick={handleSubmit(createNewCycle)}
            disabled={isSubmitDisabled}
          >
            <img src="" alt="" />
            <Play size={20} />
            começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
