import React from 'react'
import styled from 'styled-components'
import { Card } from '../components/card'
import { Box } from '../types/types'

const StyledCardGridContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 30px;
`

interface CardGridProps {
  readonly boxes: readonly Box[]
  readonly currentGuess: number | null
  readonly currentPrisoner: number
}

export function CardGrid({
  boxes,
  currentGuess,
  currentPrisoner,
}: CardGridProps): JSX.Element {
  function getCardColor(box: Box): string {
    if (currentGuess == null) {
      return 'whitesmoke'
    }
    if (box.value === currentPrisoner && currentGuess === box.label) {
      // a prisoner found their value
      return 'lime'
    }
    if (box.label === currentGuess) {
      // prisoner made an incorrect guess
      return 'deepskyblue'
    }
    if (box.visited) {
      // box was visited by the prisoner
      return 'gold'
    }
    // box has not yet been opened
    return 'whitesmoke'
  }

  return (
    <StyledCardGridContainer>
      <StyledCardGrid>
        {boxes.map((box) => (
          <Card
            key={box.label}
            cardLabel={box.label}
            cardValue={box.value}
            color={getCardColor(box)}
          />
        ))}
      </StyledCardGrid>
    </StyledCardGridContainer>
  )
}
