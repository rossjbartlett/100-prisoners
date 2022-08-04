import React from 'react'
import styled from 'styled-components'

const StyledCardContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: fit-content;
  text-align: center;
  border-radius: 5px;
  box-sizing: border-box;
  width: 60px;

  p,
  span {
    margin: 0;
  }
  span {
    font-size: 0.8rem;
    margin-left: 25px;
    margin-top: 10px;
    color: steelblue;
  }
`

interface CardProps {
  cardLabel: number
  cardValue?: number
  color: string
  style?: React.CSSProperties
}

export function Card({
  cardLabel,
  cardValue,
  color,
  style,
}: CardProps): JSX.Element {
  const hasValue = cardValue !== undefined
  return (
    <StyledCardContainer
      style={{
        backgroundColor: color,
        padding: hasValue ? '15px 15px 0 15px' : '15px',
        ...style,
      }}
    >
      <p>{cardLabel}</p>
      {hasValue && <span>{cardValue}</span>}
    </StyledCardContainer>
  )
}
