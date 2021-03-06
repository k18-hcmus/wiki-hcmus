import React, { useEffect, useState } from 'react'
import { Container, Box, Grid } from '@mui/material'
import FilterTab from '../history/filter-tab'
import HistoryTab from '../history/history-tab'
import axiosClient from '../../../axiosClient'
import { HISTORY_LIST } from '../../../shared/constants'
import { getHistoryString, getHistoryUrl } from '../../../utils/history-utils'

const History = ({ userData, updateReduxData }) => {
  const option = {
    actors: HISTORY_LIST.ACTOR.map((actor) => actor.label),
    actions: HISTORY_LIST.ACTION.map((action) => action.label),
    targets: HISTORY_LIST.TARGET.map((target) => target.label),
  }
  const timeFilterOptions = [
    {
      context: 'Last 7 Days',
      dateValue: new Date(new Date().setDate(new Date().getDate() - 7)),
    },
    {
      context: 'Last 14 Days',
      dateValue: new Date(new Date().setDate(new Date().getDate() - 14)),
    },
    {
      context: 'Last 30 Days',
      dateValue: new Date(new Date().setDate(new Date().getDate() - 30)),
    },
    {
      context: 'All Time',
      dateValue: null,
    },
  ]
  const [totalData, setTotalData] = useState([])
  const [historyData, setHistoryData] = useState([])
  const [cachedHistoryData, setCachedHistoryData] = useState([])
  const [deleteHistoryData, setDeleteHistoryData] = useState([])
  const [filterOptions, setFilterOptions] = useState({ actors: [], actions: [], targets: [] })
  const [timeFilter, setTimeFilter] = useState(timeFilterOptions[0])
  const [checkboxStatus, setCheckboxStatus] = useState([])
  const [checkedAll, setCheckedAll] = useState(false)
  const [actorChecked, setActorChecked] = useState(option.actors.map((actor) => true))
  const [actionChecked, setActionChecked] = useState(option.actions.map((action) => true))
  const [targetChecked, setTargetChecked] = useState(option.targets.map((target) => true))
  const onFilterOptionsChange = (options) => {
    setFilterOptions(options)
  }
  const onTimeFilterChange = (timeFilter) => {
    setTimeFilter(timeFilter)
  }
  const handleSetCheckBox = (checkboxId, checked) => {
    const newCheckboxStatus = checkboxStatus
    newCheckboxStatus[checkboxId] = checked
    setCheckboxStatus([...newCheckboxStatus])
    if (newCheckboxStatus.find((status) => status === false) === undefined) {
      setCheckedAll(true)
    } else {
      setCheckedAll(false)
    }
  }
  const handleCheckAll = (checked) => {
    setCheckedAll(checked)
    const newCheckboxStatus = checkboxStatus.map(() => checked)
    setCheckboxStatus([...newCheckboxStatus])
  }
  const handleDelete = () => {
    setCachedHistoryData(historyData)
    setDeleteHistoryData(historyData.filter((record, index) => checkboxStatus[index]))
    setHistoryData(historyData.filter((record, index) => !checkboxStatus[index]))
    setCheckedAll(false)
  }
  const handleSave = () => {
    // Todo: add a alert to nortify whether the deletion was successful or not
    deleteHistoryData.every((record) => {
      const newData = {
        Deleted: true,
      }
      axiosClient({
        method: 'put',
        url: `/history-details/${record.id}`,
        data: newData,
        headers: {},
      })
    })
    setCachedHistoryData([])
    setDeleteHistoryData([])
    updateReduxData()
  }
  const handleCancel = () => {
    setHistoryData(cachedHistoryData)
    setCachedHistoryData([])
    setDeleteHistoryData([])
  }
  const handleGoto = (history) => {
    // Todo: redirect to target (post/comment/profile...) page
  }
  const updateHistoryData = () => {
    const refinedData = totalData.filter((record) => {
      return (
        filterOptions.actors[record.actorId] &&
        filterOptions.actions[record.actionId] &&
        filterOptions.targets[record.targetId]
      )
    })
    var timeFilteredData = refinedData.filter(
      (record) => new Date(record.created_at) > timeFilter.dateValue
    )
    setHistoryData(timeFilteredData)
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const results = await axiosClient.get(
          `/history-details?Deleted=false&User.id=${userData.id}&_sort=created_at:desc`
        )
        const data = results.data
        const refinedData = data.map((record) => {
          return {
            id: record.id,
            AvatarURL: record.User.AvatarURL || '/static/avatars/avatar_1.jpg',
            actor:
              record.User.DisplayName === userData.DisplayName ? 'You' : record.User.DisplayName,
            action: getHistoryString(record, true, userData.DisplayName),
            gotoUrl: getHistoryUrl(record),
            created_at: record.created_at,
            actorId: record.ActorId,
            actionId: record.ActionId,
            targetId: record.TargetId,
          }
        })
        setTotalData(refinedData)
        setHistoryData(refinedData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [userData])
  useEffect(() => {
    setCheckboxStatus(historyData.map(() => false))
  }, [historyData])
  useEffect(() => {
    updateHistoryData(filterOptions, timeFilter)
  }, [filterOptions, timeFilter])
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} md={12} xl={3} xs={12}>
            <FilterTab
              sx={{ height: '100%' }}
              option={option}
              callback={onFilterOptionsChange}
              actorChecked={actorChecked}
              actionChecked={actionChecked}
              targetChecked={targetChecked}
              setActorChecked={setActorChecked}
              setActionChecked={setActionChecked}
              setTargetChecked={setTargetChecked}
            />
          </Grid>
          <Grid item lg={9} md={12} xl={9} xs={12}>
            <HistoryTab
              data={historyData}
              setData={setHistoryData}
              timeFilter={timeFilter}
              timeFilterOptions={timeFilterOptions}
              checkboxStatus={checkboxStatus}
              checkedAll={checkedAll}
              callbackSetTimeFilter={onTimeFilterChange}
              callbackSetCheckBox={handleSetCheckBox}
              callbackCheckAll={handleCheckAll}
              callbackDelete={handleDelete}
              callbackSave={handleSave}
              callbackCancel={handleCancel}
              callbackGoto={handleGoto}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default History
