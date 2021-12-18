import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

const EditSelect = (props) => {
  const { setCallbackValue, currentValue, values, label } = props
  const [selectValue, setSelectValue] = useState(null)
  const handleChange = (event) => {
    setSelectValue(event.target.value)
  }
  useEffect(() => {
    setCallbackValue(selectValue)
  }, [selectValue])
  const menuItems = values.map((value, index) => (
    <MenuItem key={index} value={value} primaryText={value}>
      {value}
    </MenuItem>
  ))
  return (
    <FormControl fullWidth>
      <InputLabel id="edit-information-select-label">{label}</InputLabel>
      <Select
        labelId="edit-information-select-label"
        id="edit-information-select"
        value={selectValue}
        defaultValue=""
        label={label}
        onChange={handleChange}
        autoWidth
      >
        {menuItems}
      </Select>
    </FormControl>
  )
}

export default EditSelect
