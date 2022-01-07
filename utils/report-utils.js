import axiosClient from '../axiosClient'
import { REPORT_CONST, HISTORY_CONST, DELETE_CONST } from '../shared/constants'
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

export const addDelete = async (type, userId, targetId, description) => {
  let targetProperty = ''
  let targetHistoryConst = null
  let targetUrl = ''
  switch (type) {
    case DELETE_CONST.TYPE.POST:
      targetProperty = 'Post'
      targetHistoryConst = HISTORY_CONST.TARGET.POST
      targetUrl = '/posts'
      break
    case DELETE_CONST.TYPE.COMMENT:
      targetProperty = 'Comment'
      targetHistoryConst = HISTORY_CONST.TARGET.COMMENT
      targetUrl = '/comments'
      break
  }
  //This is future feature
  // const data = {
  //   Type: type,
  //   Status: DELETE_CONST.STATUS.PENDING,
  //   Description: description,
  //   [targetProperty]: targetId,
  //   Remover: removerId,
  // }
  const result = await axiosClient.delete(`${targetUrl}/${targetId}`)
  // if (result) {
  //   addHistory(
  //     { const: HISTORY_CONST.ACTOR.OTHER, id: userId },
  //     { const: HISTORY_CONST.ACTION.DELETE },
  //     { const: targetHistoryConst, id: targetId }
  //   )
  // }
}
