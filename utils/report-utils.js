import axiosClient from '../axiosClient'
import { REPORT_CONST } from '../shared/constants'

export const addReport = (type, reporterId, targetId, reasonString, description) => {
  let targetProperty = ''
  switch (type) {
    case REPORT_CONST.TYPE.POST:
      targetProperty = 'Post'
      break
    case REPORT_CONST.TYPE.COMMENT:
      targetProperty = 'Comment'
      break
    case REPORT_CONST.TYPE.USER:
      targetProperty = 'ReportedUser'
      break
  }
  const data = {
    Type: type,
    Status: REPORT_CONST.STATUS.PENDING,
    Description: description,
    Action: reasonString,
    [targetProperty]: targetId,
    User: reporterId,
  }
  axiosClient.post('/reports', data)
}
