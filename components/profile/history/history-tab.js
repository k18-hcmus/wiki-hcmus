import { Card, CardHeader, Divider, List } from '@mui/material'
import HistoryCell from '../history/history-cell'

const FilterTab = (props) => {
  //Todo: Add dropdown filter times
  const { data } = props
  return (
    <Card>
      <CardHeader subtitle="" title="Activities History" />
      <Divider />
      <List>
        {data.map((record, i) => (
          <HistoryCell data={record} />
        ))}
      </List>
    </Card>
  )
}

export default FilterTab
