import React from 'react'

function ScoreCard({play}) {
  return (
    <div className='score'>{play.score}</div>
  )
}

export default ScoreCard