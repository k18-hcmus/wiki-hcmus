import React, { useEffect, useState } from 'react'
import { FormGroup, Paper, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material'
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import StarIcon from '@mui/icons-material/Star'

const Overview = ({ data, callbackSetDataOption }) => {
  const [checked, setChecked] = useState([true, false, false])
  const options = ['hot', 'new', 'best']
  const handleCheck = (event) => {
    const newChecked = checked.filter(() => false)
    newChecked[event.target.id] = true
    setChecked(newChecked)
    callbackSetDataOption(options[event.target.id])
  }
  return (
    <div>
      <Paper sx={{ mb: 2, p: 1 }}>
        <FormGroup>
          <Grid container>
            <Grid item auto>
              <FormControlLabel
                control={
                  <Checkbox
                    id={2}
                    checked={checked[2]}
                    onChange={handleCheck}
                    icon={<WhatshotOutlinedIcon />}
                    checkedIcon={<WhatshotIcon />}
                  />
                }
                label="Hot"
              />
            </Grid>
            <Grid item auto>
              <FormControlLabel
                control={
                  <Checkbox
                    id={0}
                    checked={checked[0]}
                    onChange={handleCheck}
                    icon={<NewReleasesOutlinedIcon />}
                    checkedIcon={<NewReleasesIcon />}
                  />
                }
                label="New"
              />
            </Grid>
            <Grid item auto>
              <FormControlLabel
                control={
                  <Checkbox
                    id={1}
                    checked={checked[1]}
                    onChange={handleCheck}
                    icon={<StarBorderOutlinedIcon />}
                    checkedIcon={<StarIcon />}
                  />
                }
                label="Best"
              />
            </Grid>
          </Grid>
        </FormGroup>
      </Paper>
      <Paper sx={{ p: 1 }}>
        {data.map((record) => {
          return (
            <Typography variant="caption" color="text.primary">
              record.Title
            </Typography>
          )
        })}
      </Paper>
    </div>
  )
}

export default Overview
