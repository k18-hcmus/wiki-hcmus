import axiosClient from '../axiosClient'
import { REPORT_CONST, HISTORY_CONST } from '../shared/constants'
import { addHistory } from './history-utils'

export const addReport = async (type, reporterId, targetId, reasonString, description) => {
  let targetProperty = ''
  let targetHistoryConst = null
  switch (type) {
    case REPORT_CONST.TYPE.POST:
      targetProperty = 'Post'
      targetHistoryConst = HISTORY_CONST.TARGET.POST
      break
    case REPORT_CONST.TYPE.COMMENT:
      targetProperty = 'Comment'
      targetHistoryConst = HISTORY_CONST.TARGET.COMMENT
      break
    case REPORT_CONST.TYPE.USER:
      targetProperty = 'ReportedUser'
      targetHistoryConst = HISTORY_CONST.TARGET.USER
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
  const result = await axiosClient.post('/reports', data)
  if (result) {
    addHistory(
      { const: HISTORY_CONST.ACTOR.SELF, id: reporterId },
      { const: HISTORY_CONST.ACTION.REPORT },
      { const: targetHistoryConst, id: targetId }
    )
  }
}
