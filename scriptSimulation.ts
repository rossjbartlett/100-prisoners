/* eslint-disable functional/no-let */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-magic-numbers */

const BOARD_SIZE = 100
const NUM_PEOPLE = BOARD_SIZE
const MAX_TRIES = BOARD_SIZE/2

function newBoard(): readonly number[] {
  return new Array(BOARD_SIZE).fill(null).map((_,i) => i).sort(() => Math.random() - 0.5)
}

function personPlay(board: readonly number[], person: number): boolean{
  let index = person
  let guesses = 0
  while(guesses < MAX_TRIES){
    const value = board[index]
    if(value === person){
      return true
    }
    index = value
    guesses += 1
  }
  return false
}

function playBoard(board: readonly number[],): boolean {
  for(let person = 0; person < NUM_PEOPLE; person++){
    const personSucceeded = personPlay(board, person)
    // console.log('\tperson', person, 'succeeded', personSucceeded)
    if (!personSucceeded){
      return false
    }
  }
  return true
}

function playBoardNTimes(n: number): void{
  let wins = 0
  for(let trial = 0; trial < n; trial++){
    const board = newBoard()
    const everybodySucceeded = playBoard(board)
    // console.log('trial', trial, 'won', everybodySucceeded)
    if (everybodySucceeded){
      wins += 1
    }
  }
  console.log('pct', 100*wins/n,'%')
}

playBoardNTimes(10000)
