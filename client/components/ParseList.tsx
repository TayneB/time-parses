import React from 'react'

interface ParseListProps {
  name: string
  spec: string
  duration: number
  ilvl: number
  amount: number
  code: string
  fightID: number
}

const ParseList: React.FC<ParseListProps> = ({
  name,
  spec,
  duration,
  ilvl,
  amount,
  code,
  fightID,
}) => {
  const modDuration = Math.trunc(duration / 1000)
  const roundAmount = (Math.trunc(amount * 10) / 10).toLocaleString('en')

  return (
    <>
      <p>
        {name} - {ilvl} ilvl - {spec} - {modDuration} Seconds - {roundAmount}{' '}
        DPS -{' '}
        <a
          href={`https://www.warcraftlogs.com/reports/${code}#fight=${fightID}`}
        >
          Report
        </a>
      </p>
    </>
  )
}

export default ParseList
