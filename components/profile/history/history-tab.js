import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  Divider,
  List,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material'
import HistoryCell from '../history/history-cell'

const HistoryTab = (props) => {
  const {
    data,
    timeFilter,
    timeFilterOptions,
    checkboxStatus,
    checkedAll,
    callbackSetTimeFilter,
    callbackSetCheckBox,
    callbackCheckAll,
    callbackDelete,
    callbackSave,
    callbackCancel,
    callbackGoto 
  } = props
  const [deleteStage, setDeleteStage] = useState(false)
  const handleTimeFilterChange = (event) => {
    const selectedTimeFilter = timeFilterOptions.find((item) => item.context === event.target.value)
    callbackSetTimeFilter(selectedTimeFilter)
  }
  const handleDelete = () => {
    if (checkboxStatus.find(status => status) === undefined) {
      return
    }
    setDeleteStage(true)
    callbackDelete()
  }
  const handleSave = () => {
    setDeleteStage(false)
    callbackSave()
  }
  const handleCancel = () => {
    setDeleteStage(false)
    callbackCancel()
  }
  const handleGotoHistory = (history) => {}
  const handleCheckAll = (event) => {
    callbackCheckAll(event.target.checked)
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
          <HistoryCell
            id={i}
            data={record}
            callbackGoto={handleGotoHistory}
            checkBoxStatus={checkboxStatus[i]}
            onCheckCallBack={callbackSetCheckBox}
            callbackGoto={callbackGoto}
          />
        ))}
      </List>
      <Divider />
      <FormControlLabel
        sx={{ pl: 5 }}
        label="All"
        control={
          <Checkbox sx={{ pl: 1 }} checked={checkedAll || false} onChange={handleCheckAll} />
        }
      />
      {!deleteStage && (
        <Button variant="outlined" onClick={handleDelete}>
          Delete
        </Button>
      )}
      {deleteStage && (
        <Button variant="outlined" onClick={handleSave}>
          Save
        </Button>
      )}
      {deleteStage && (
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
      )}
    </Card>
  )
}

export default HistoryTab
