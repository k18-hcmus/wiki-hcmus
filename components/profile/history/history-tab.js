import {
  Card,
  CardHeader,
  Divider,
  List,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material'
import HistoryCell from '../history/history-cell'

const HistoryTab = (props) => {
  const { data, timeFilter, timeFilterOptions, callback } = props
  const handleTimeFilterChange = (event) => {
    const selectedTimeFilter = timeFilterOptions.find((item) => item.context === event.target.value)
    callback(selectedTimeFilter)
  }
  return (
    <Card>
      <CardHeader
        subtitle=""
        title="Activities History"
        action={
          <FormControl fullWidth>
            <InputLabel id="time-select-label">Filter</InputLabel>
            <Select
              labelId="time-select-label"
              id="time-select"
              value={timeFilter.context}
              defaultValue=""
              label="Filter"
              onChange={handleTimeFilterChange}
              autoWidth
            >
              {timeFilterOptions.map((value, index) => {
                return (
                  <MenuItem key={index} value={value.context} primaryText={value.context}>
                    {value.context}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        }
      />
      <Divider />
      <List>
        {data.map((record, i) => (
          <HistoryCell data={record} />
        ))}
      </List>
    </Card>
  )
}

export default HistoryTab
