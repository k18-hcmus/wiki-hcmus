import React, { useEffect, useState } from 'react'
import { Container, Box, Grid } from '@mui/material'
import FilterTab from '../history/filter-tab'
import HistoryTab from '../history/history-tab'
import axiosClient from '../../../axiosClient'
import { HISTORY_CONST } from '../../../shared/constants'
import { getHistoryString, getHistoryUrl } from '../../../utils/history-utils'

const History = () => {
  const option = {
    actors: [HISTORY_CONST.ACTOR.SELF.label, HISTORY_CONST.ACTOR.OTHER.label],
    actions: [
      HISTORY_CONST.ACTION.CREATE.label,
      HISTORY_CONST.ACTION.UPDATE.label,
      HISTORY_CONST.ACTION.DELETE.label,
    ],
    targets: [
      HISTORY_CONST.TARGET.POST.label,
      HISTORY_CONST.TARGET.COMMENT.label,
      HISTORY_CONST.TARGET.TAG.label,
      HISTORY_CONST.TARGET.PROFILE.label,
    ],
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
  const myDisplayName = 'Zhāng Zhōng Réin'
  const [checkboxStatus, setCheckboxStatus] = useState([])
  const [checkedAll, setCheckedAll] = useState(false)
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
    deleteHistoryData.every((record) => axiosClient.delete(`/history-details/${record.id}`))
    setCachedHistoryData([])
    setDeleteHistoryData([])
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
      const userId = 1
      try {
        const results = await axiosClient.get(`/history-details?User.id=${userId}`)
        const data = results.data
        const refinedData = data.map((record) => {
          return {
            id: record.id,
            actor: record.User.DisplayName === myDisplayName ? 'You' : record.User.DisplayName,
            action: getHistoryString(record, true, myDisplayName),
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
  }, [])
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
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <FilterTab sx={{ height: '100%' }} option={option} callback={onFilterOptionsChange} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <HistoryTab
              data={historyData}
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
