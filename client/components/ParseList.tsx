function ParseList(
  name: string,
  spec: string,
  duration: number,
  code: string,
  fightID: number
) {
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
