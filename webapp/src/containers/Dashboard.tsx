import React, { useEffect, useState } from 'react'
import { Card } from '../components/card'
import { Box } from '../types/types'
import { notify } from '../utils/utils'
import { CardGrid } from './CardGrid'

const NUM_BOXES = 100
const MAX_GUESSES = NUM_BOXES / 2
const TICK_TIME_MS = 500
const SHOW_ALERTS = false

function getNewBoxes(): Box[] {
  // randomize value order
  const values = new Array(NUM_BOXES)
    .fill(null)
    .map((_, i) => i + 1)
    .sort(() => Math.random() - 0.5)
  // make boxes
  const boxes = new Array(NUM_BOXES)
    .fill(0)
    .map((_, i) => ({ label: i + 1, value: values[i], visited: false }))
  return boxes
}

export function Dashboard(): JSX.Element {
  const [boxes, setBoxes] = useState<Box[]>(getNewBoxes())
  const [currentPrisoner, setCurrentPrisoner] = useState<number>(1)
  const [currentGuess, setCurrentGuess] = useState<number | null>(null)
  const [numGuesses, setNumGuesses] = useState<number>(0)
  const [numWins, setNumWins] = useState<number>(0)
  const [numGames, setNumGames] = useState<number>(0)

  function resetGame(): void {
    setNumGames((prev) => prev + 1)
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
    const interval = setInterval(() => {
      if (numGuesses >= MAX_GUESSES) {
        notify(`prisoner ${currentPrisoner} FAILED`, SHOW_ALERTS)
        resetGame()
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
      const currentGuessBox = boxes.find((b) => b.label === currentGuess)!
      // move to next guess
      const guess = currentGuessBox.value
      incrementNumGuesses()
      setCurrentGuess(guess)
      markBoxAsVisited(guess)
    }, TICK_TIME_MS)

    return () => {
      clearInterval(interval)
    }
  })

  useEffect(() => {
    // detect/handle success
    const currentGuessBox = boxes.find((b) => b.label === currentGuess)
    const success = currentGuessBox && currentGuessBox.value === currentPrisoner
    if (!success) {
      return
    }

    const timer = setTimeout(() => {
      handleSuccess()
    }, TICK_TIME_MS)

    return () => clearTimeout(timer)
  }, [currentPrisoner, currentGuess])

  function handleSuccess(): void {
    notify(
      `success by prisoner ${currentPrisoner} in ${numGuesses} guesses`,
      SHOW_ALERTS,
    )
    const nextPrisoner = currentPrisoner + 1
    if (nextPrisoner > NUM_BOXES) {
      // won game
      notify('WIN', SHOW_ALERTS)
      setNumWins((prev) => prev + 1)
      // restart
      resetGame()
      return
    }
    // move to next prisoner
    clearBoxVisits()
    setCurrentPrisoner(nextPrisoner)
    setNumGuesses(0)
    setCurrentGuess(null)
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <Card cardLabel={currentPrisoner} color="whitesmoke" />
        <p>Current Prisoner Guesses: {numGuesses}</p>
        <p>Wins: {numWins}</p>
        <p>Games: {numGames}</p>
        <p>Win %: {(numGames ? numWins / numGames : 0).toFixed(3)}</p>
      </div>
      <CardGrid
        boxes={boxes}
        currentGuess={currentGuess}
        currentPrisoner={currentPrisoner}
      />
    </div>
  )
}
