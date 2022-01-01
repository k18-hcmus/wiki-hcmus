import { format, compareAsc } from 'date-fns'
import axiosClient from '../axiosClient'

function contributionListToChartData(data, startDate) {
  const today = new Date()
  if (data === null)
    return {
      data: null,
      labels: null,
    }
  var result = {
    data: [],
    labels: [],
  }
  var convertedData = data.map((record) => {
    return { value: record.Value, date: Date.parse(record.Date) }
  })
  var refinedData = convertedData.filter((data) => data.date > startDate)
  // var curDate = startDate;
  // while (curDate <= today) {
  //     console.log(refinedData[0].date);
  //     console.log(Date.parse(curDate));
  //     if (refinedData.find(data => data.date.getDay() === curDate.date.getDay) === undefined)
  //         refinedData.push({
  //             value: 0,
  //             date: curDate
  //         });
  //     curDate = new Date(new Date().setDate(curDate.getDate()+1))
  // }
  refinedData.sort((a, b) => (a.date > b.date ? 0 : -1))
  refinedData.forEach((data) => {
    result.labels.push(format(data.date, 'dd/MM'))
    result.data.push(data.value)
  })
  return result
}

// Example: User Add a new post (published)
// addContribution(userId, CONTRIBUTION_CONST.RECIEVED_PTS.postReview)
async function addContribution(userId, value) {
  const userResult = await axiosClient.get(`/account-users?id=${userId}`)
  if (userResult.data.length > 0) {
    const userData = userResult.data[0]
    const result = await axiosClient.get(
      `/contributions?User.id=${userId}&Date=${format(new Date(), 'yyyy-MM-dd')}`
    )
    if (result.data.length > 0) {
      const totalValue = result.data[0].Value + value
      const contributionId = result.data[0].id
      const newContributionData = {
        ...result.data[0],
        Value: totalValue,
      }
      axiosClient({
        method: 'put',
        url: `/contributions/${contributionId}`,
        data: newContributionData,
        headers: {},
      })
    } else {
      const newContributionData = {
        Date: format(new Date(), 'yyyy-MM-dd'),
        Value: value,
        User: userData,
      }
      axiosClient({
        method: 'post',
        url: `/contributions`,
        data: newContributionData,
        headers: {},
      })
    }
  } else console.log(`AddContribution Error: User.id=${userId} not found`)
}

async function getMonthlyContribution(type, user) {
  var data
  if (type === 'id') {
    const userResult = await axiosClient.get(`/account-users?id=${user}`)
    if (!userResult || userResult.data.length === 0) {
      console.log(`Cannot found user with id=${user}`)
      return
    }
    data = userResult.data[0]
  } else {
    data = user
  }
  const tempDate = new Date()
  var todayMonth = tempDate.getMonth()
  tempDate.setDate(1)
  const previousMonth = new Date(tempDate.setMonth(todayMonth - 1))
  const today = new Date()
  var resultLastMonth = 0
  var resultThisMonth = 0
  data.Contributions.forEach((con) => {
    const dateValue = new Date(con.date)
    if (today.getMonth() === dateValue.getMonth() && today.getYear() === dateValue.getYear()) {
      resultThisMonth += con.value
    }
    if (
      today.getMonth() === previousMonth.getMonth() &&
      today.getYear() === previousMonth.getYear()
    ) {
      resultLastMonth += con.value
    }
  })
  return [resultLastMonth, resultThisMonth]
}

async function getTotalContribution(type, user) {
  var data
  if (type === 'id') {
    const userResult = await axiosClient.get(`/account-users?id=${user}`)
    if (!userResult || userResult.data.length === 0) {
      console.log(`Cannot found user with id=${user}`)
      return
    }
    data = userResult.data[0]
  } else {
    data = user
  }
  var result = 0
  data.Contributions.forEach((con) => {
    result += con.value
  })
  return result
}

export {
  contributionListToChartData,
  addContribution,
  getMonthlyContribution,
  getTotalContribution,
}
