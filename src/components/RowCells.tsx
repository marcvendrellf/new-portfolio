type RowCellsProps = {
  name: string
  kind?: string
  detail: string
  arrow: '→' | '↗'
}

function RowCells({ name, kind, detail, arrow }: RowCellsProps) {
  return (
    <>
      <span className="w-53 font-medium">{name}</span>
      <span className="w-14 opacity-55">{kind}</span>
      <span className="flex-1">{detail}</span>
      <span aria-hidden="true" className="w-4">
        {arrow}
      </span>
    </>
  )
}

export default RowCells
