import React, { useEffect, useState } from 'react'
import { Card, CardHeader, Divider, Checkbox, FormGroup, FormControlLabel } from '@mui/material'
const FilterTab = ({
  option,
  callback,
  actorChecked,
  setActorChecked,
  actionChecked,
  setActionChecked,
  targetChecked,
  setTargetChecked,
}) => {
  const handleCheckActor = (event) => {
    var newActorChecked = actorChecked
    newActorChecked[event.target.id] = event.target.checked
    setActorChecked([...newActorChecked])
  }
  const handleCheckAction = (event) => {
    var newActionChecked = actionChecked
    newActionChecked[event.target.id] = event.target.checked
    setActionChecked([...newActionChecked])
  }
  const handleCheckTarget = (event) => {
    var newTargetChecked = targetChecked
    newTargetChecked[event.target.id] = event.target.checked
    setTargetChecked([...newTargetChecked])
  }
  const handleChangeAllActor = (event) => {
    var newActorChecked = actorChecked.map((item) => event.target.checked)
    setActorChecked(newActorChecked)
  }
  const handleChangeAllAction = (event) => {
    var newActionChecked = actionChecked.map((item) => event.target.checked)
    setActionChecked(newActionChecked)
  }
  const handleChangeAllTarget = (event) => {
    var newTargetChecked = targetChecked.map((item) => event.target.checked)
    setTargetChecked(newTargetChecked)
  }
  const checkIndeterminate = (list) => {
    return list.find((item) => item === true) !== undefined && !checkAll(list)
  }
  const checkAll = (list) => {
    return list.every((item) => item === true)
  }
  useEffect(() => {
    callback({
      actors: actorChecked,
      actions: actionChecked,
      targets: targetChecked,
    })
  }, [actorChecked, actionChecked, targetChecked])
  return (
    <Card>
      <CardHeader subtitle="" title="Filter Options" />
      <Divider />
      <FormGroup sx={{ pl: 1 }}>
        <FormControlLabel
          label="Actor"
          control={
            <Checkbox
              sx={{ pl: 1 }}
              checked={checkAll(actorChecked)}
              indeterminate={checkIndeterminate(actorChecked)}
              onChange={handleChangeAllActor}
            />
          }
        />
        {option.actors.map((actor, index) => (
          <FormControlLabel
            key={index}
            sx={{ pl: 4 }}
            center
            control={
              <Checkbox
                key={index}
                id={index}
                checked={actorChecked[index]}
                onChange={handleCheckActor}
              />
            }
            label={actor}
          />
        ))}
      </FormGroup>
      <Divider />
      <FormGroup sx={{ pl: 1 }}>
        <FormControlLabel
          label="Action"
          control={
            <Checkbox
              sx={{ pl: 1 }}
              checked={checkAll(actionChecked)}
              indeterminate={checkIndeterminate(actionChecked)}
              onChange={handleChangeAllAction}
            />
          }
        />
        {option.actions.map((action, index) => (
          <FormControlLabel
            key={index}
            sx={{ pl: 4 }}
            control={
              <Checkbox
                key={index}
                id={index}
                checked={actionChecked[index]}
                onChange={handleCheckAction}
              />
            }
            label={action}
          />
        ))}
      </FormGroup>
      <Divider />
      <FormGroup sx={{ pl: 1 }}>
        <FormControlLabel
          label="Target"
          control={
            <Checkbox
              sx={{ pl: 1 }}
              checked={checkAll(targetChecked)}
              indeterminate={checkIndeterminate(targetChecked)}
              onChange={handleChangeAllTarget}
            />
          }
        />
        {option.targets.map((target, index) => (
          <FormControlLabel
            key={index}
            sx={{ pl: 4 }}
            control={
              <Checkbox
                key={index}
                id={index}
                checked={targetChecked[index]}
                onChange={handleCheckTarget}
              />
            }
            label={target}
          />
        ))}
      </FormGroup>
    </Card>
  )
}

export default FilterTab
