import React, { useEffect, useState } from 'react'
import InputRange from 'react-input-range'
import Switch from 'react-switch'
import styled from 'styled-components'
import 'react-input-range/lib/css/index.css'
import { Box } from '../types/types'
import { Card } from '../components/card'
import { CardGrid } from './CardGrid'
import { notify, shuffle } from '../utils/utils'

const NUM_BOXES = 100
const MAX_GUESSES = NUM_BOXES / 2
const MIN_TICK_TIME = 5
const MAX_TICK_TIME = 1500
const TICK_TIME_STEP = 5

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
`

const InfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;

  & > p {
    margin: 1rem 0 0 0;
  }
`

const ControlItem = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;
  span {
    margin-right: 20px;
  }
`

function getNewBoxes(): readonly Box[] {
  // randomize value order
  const values = shuffle(new Array(NUM_BOXES).fill(null).map((_, i) => i + 1))
  // make boxes
  const boxes = new Array(NUM_BOXES)
    .fill(0)
    .map((_, i) => ({ label: i + 1, value: values[i], visited: false }))
  return boxes
}

export function Dashboard(): JSX.Element {
  const [boxes, setBoxes] = useState<readonly Box[]>(getNewBoxes())
  const [currentPrisoner, setCurrentPrisoner] = useState<number>(1)
  const [currentGuess, setCurrentGuess] = useState<number | null>(null)
  const [numGuesses, setNumGuesses] = useState<number>(0)
  const [numWins, setNumWins] = useState<number>(0)
  const [numAttempts, setNumAttempts] = useState<number>(0)
  const [showAlerts, setShowAlerts] = useState<boolean>(false)
  const [tickTime, setTickTime] = useState<number>(600)
  const [isPaused, setIsPaused] = useState<boolean>(false)

  function startNewAttempt(): void {
    setNumAttempts((prev) => prev + 1)
    setBoxes(getNewBoxes())
    setCurrentPrisoner(1)
    setNumGuesses(0)
    setCurrentGuess(null)
  }

  function markBoxAsVisited(boxNumber: number): void {
    setBoxes((prevBoxes) =>
      prevBoxes.map((b) => {
        return b.label === boxNumber ? { ...b, visited: true } : b
      }),
    )
  }

  function incrementNumGuesses(): void {
    setNumGuesses((prev) => prev + 1)
  }

  function clearBoxVisits(): void {
    setBoxes((prevBoxes) =>
      prevBoxes.map((b) => {
        return { ...b, visited: false }
      }),
    )
  }

  useEffect(() => {
    if (isPaused) {
      return
    }
    const timer = setTimeout(() => {
      if (numGuesses >= MAX_GUESSES) {
        notify(`Prisoner ${currentPrisoner} FAILED`, showAlerts)
        startNewAttempt()
        return
      }
      // make guess
      if (currentGuess == null) {
        // make first guess at box with prisoner's own label
        const guess = currentPrisoner
        incrementNumGuesses()
        setCurrentGuess(currentPrisoner)
        markBoxAsVisited(guess)
        return
      }
      // move to next guess
      const currentGuessBox = boxes.find((b) => b.label === currentGuess)
      if (!currentGuessBox) {
        throw new Error(`error finding box with label ${currentGuess}`)
      }
      const guess = currentGuessBox.value
      incrementNumGuesses()
      setCurrentGuess(guess)
      markBoxAsVisited(guess)
    }, tickTime)
    return (): void => {
      clearInterval(timer)
    }
  })

  function handleSuccess(): void {
    notify(
      `Prisoner ${currentPrisoner} SUCCEEDED in ${numGuesses} guess${
        numGuesses > 1 ? 'es' : ''
      }`,
      showAlerts,
    )
    const nextPrisoner = currentPrisoner + 1
    if (nextPrisoner > NUM_BOXES) {
      // this attempt won
      notify('WIN', showAlerts)
      setNumWins((prev) => prev + 1)
      startNewAttempt()
      return
    }
    // move to next prisoner
    clearBoxVisits()
    setCurrentPrisoner(nextPrisoner)
    setNumGuesses(0)
    setCurrentGuess(null)
  }

  useEffect(() => {
    // detect/handle success
    const currentGuessBox = boxes.find((b) => b.label === currentGuess)
    const success = currentGuessBox && currentGuessBox.value === currentPrisoner
    if (!success) {
      return
    }

    const timer = setTimeout(() => {
      handleSuccess()
    }, tickTime)

    return (): void => clearTimeout(timer)
  }, [currentPrisoner, currentGuess, tickTime])

  return (
    <Container>
      <InfoPanel>
        <ControlItem>
          <span style={{ marginRight: '30px' }}>Speed</span>
          <InputRange
            minValue={MIN_TICK_TIME}
            maxValue={MAX_TICK_TIME}
            step={TICK_TIME_STEP}
            formatLabel={(value: number): string => `${value} ms`}
            value={tickTime}
            onChange={(value): void => setTickTime(value as number)}
          />
        </ControlItem>
        <ControlItem>
          <span>Show Alerts</span>
          <Switch
            onChange={(checked): void => setShowAlerts(checked)}
            checked={showAlerts}
          />
        </ControlItem>
        <ControlItem style={{ marginTop: 0 }}>
          <span>Pause</span>
          <Switch
            onChange={(checked): void => setIsPaused(checked)}
            checked={isPaused}
          />
        </ControlItem>
        <Card
          cardLabel={currentPrisoner}
          color="whitesmoke"
          style={{ alignSelf: 'center', marginBottom: '15px' }}
        />
        <p>Current Prisoner Guesses: {numGuesses}</p>
        <p>Wins: {numWins}</p>
        <p>Attempts: {numAttempts}</p>
        <p>Win %: {(numAttempts ? numWins / numAttempts : 0).toFixed(3)}</p>
      </InfoPanel>
      <CardGrid
        boxes={boxes}
        currentGuess={currentGuess}
        currentPrisoner={currentPrisoner}
      />
    </Container>
  )
}
