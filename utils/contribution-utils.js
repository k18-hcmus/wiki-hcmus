import { format } from 'date-fns'
import axiosClient from '../axiosClient'
import { CONTRIBUTION_CONST, STATUS_POST } from '../shared/constants'

function getContributionDate(user) {
  if (user === null || (user.Posts.length === 0 && user.Comments.length === 0)) return []
  var contributionData = {}
  user.Posts.forEach((post) => {
    if (post.status === STATUS_POST.Publish) {
      const date = new Date(post.PublishTime || post.created_at)
      const DMYDate = new Date(date.getFullYear(), date.getMonth(), date.getDay())
      if (DMYDate in contributionData) {
        contributionData[DMYDate] +=
          contributionData[DMYDate] +
          CONTRIBUTION_CONST.RECIEVED_PTS.postReview +
          post.UpvoteCount -
          post.DownvoteCount
      } else {
        contributionData[DMYDate] =
          CONTRIBUTION_CONST.RECIEVED_PTS.postReview + post.UpvoteCount - post.DownvoteCount
      }
    }
  })
  user.Comments.forEach((comment) => {
    const date = new Date(comment.created_at)
    const DMYDate = new Date(date.getFullYear(), date.getMonth(), date.getDay())
    if (DMYDate in contributionData) {
      contributionData[DMYDate] +=
        contributionData[DMYDate] +
        CONTRIBUTION_CONST.RECIEVED_PTS.postComment +
        comment.UpvoteCount -
        comment.DownvoteCount
    } else {
      contributionData[DMYDate] =
        CONTRIBUTION_CONST.RECIEVED_PTS.postComment + comment.UpvoteCount - comment.DownvoteCount
    }
  })
  return Object.keys(contributionData).map((key) => {
    return { value: contributionData[key], date: new Date(key) }
  })
}

function contributionListToChartData(user, startDate) {
  var convertedData = getContributionDate(user)
  if (convertedData.length === 0)
    return {
      data: [],
      labels: [],
    }
  var refinedData = convertedData.filter((data) => data.date > startDate)
  var result = {
    data: [],
    labels: [],
  }
  refinedData.sort((a, b) => (a.date > b.date ? 0 : -1))
  refinedData.forEach((data) => {
    result.labels.push(format(data.date, 'dd/MM/yy'))
    result.data.push(data.value)
  })
  return result
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
  getContributionDate(data).forEach((con) => {
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
  getContributionDate(data).forEach((con) => {
    result += con.value
  })
  return result
}

const getUserTier = (userCP) => {
  var currentTier = 'Untiered'
  var nextTierCP = 0
  for (const tierName in CONTRIBUTION_CONST.TIER) {
    if (userCP < CONTRIBUTION_CONST.TIER[tierName]) {
      nextTierCP = CONTRIBUTION_CONST.TIER[tierName]
      break
    } else currentTier = tierName
  }
  return [currentTier, nextTierCP]
}

export { contributionListToChartData, getMonthlyContribution, getTotalContribution, getUserTier }
