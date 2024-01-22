import { useEffect, useContext } from 'react'
import { CountdownContainer, Separator } from './style'
import { differenceInSeconds } from 'date-fns'
import { CycleContext } from '../../../contexts/CyclesContext'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleFinished,
    setSecondsPassed,
    amountSecondsPassed,
  } = useContext(CycleContext)

  const totalSeconds = activeCycle ? activeCycle.minutos * 60 : 0
  const correntSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutosAmount = Math.floor(correntSeconds / 60)
  const secondsAmount = correntSeconds % 60

  const minutes = String(minutosAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}: ${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.starDate),
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleFinished()

          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleFinished,
    setSecondsPassed,
  ])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>

      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
