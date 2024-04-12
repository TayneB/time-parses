import React from 'react'

interface ParseListProps {
  name: string
  spec: string
  duration: number
  code: string
  fightID: number
}

const ParseList: React.FC<ParseListProps> = ({
  name,
  spec,
  duration,
  code,
  fightID,
}) => {
  const modDuration = duration / 1000

  return (
    <>
      <p>
        {name} - {spec} - {modDuration} -{' '}
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
