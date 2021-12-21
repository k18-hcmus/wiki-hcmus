import axiosClient from '../axiosClient'
import { NORTIFICATION_CONST } from '../shared/constants'

// Process flow of Nortification triggered by:
// - self history (history feature):
//   whenever a history record added, add a new Nortification
//   aswell. (Type: 'Self')
// - other users (follow feature):
//   whenever a history record added, get all 'FollowByUsers' record
//   and add a new Nortification each. (Type: 'Other')
// - admin (system nortification):
//   linked to a Post record (Type: 'Admin')

// Problem: Current Nortification implementation based on History
// data and it's not stable (e.g. history can be deleted) and 
// ActionString mostly viewed in different POV (i.e. You edited 
// post -> [Yourname] edited post)

export const addNortification = async (type, userId, dataId) => {
  const userResult = await axiosClient.get(`/account-users?id=${userId}`)
  if (!userResult || userResult.data.length === 0) {
    console.log(`addNortification: User with id=${userId} not exists`)
    return
  }
  var dataResult
  if (type === 'Admin') {
    dataResult = await axiosClient.get(`/posts?id=${dataId}`)
  } else {
    dataResult = await axiosClient.get(`/history-details?id=${dataId}`)
  }
  if (!dataResult || dataResult.data.length === 0) {
    console.log(`addNortification: Data with id=${dataId} not exists`)
    return
  }
  var nortiData = {
    User: userResult.data[0],
    Seen: false,
    Type: type,
  }
  switch (type) {
    case NORTIFICATION_CONST.TYPE.SELF:
    case NORTIFICATION_CONST.TYPE.SELF:
      nortiData = {
        ...nortiData,
        HistoryDetail: dataResult.data[0],
        Content: dataResult.data[0].Action,
      }
      break
    case NORTIFICATION_CONST.TYPE.ADMIN:
      nortiData = {
        ...nortiData,
        AdminPost: dataResult.data[0],
        Content: dataResult.data[0].Title,
      }
      break
  }
  axiosClient.post('/nortifications', nortiData)
}
