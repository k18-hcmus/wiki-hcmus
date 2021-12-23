import axiosClient from '../axiosClient'
import { addNortification } from './nortification-utils'
import { NORTIFICATION_CONST, HISTORY_LIST, HISTORY_CONST } from '../shared/constants'

// Example: User Update Profile
// addHistory(
//   { const: HISTORY_CONST.ACTOR.SELF, id: newUserData.id },
//   { const: HISTORY_CONST.ACTION.UPDATE },
//   { const: HISTORY_CONST.TARGET.PROFILE, id: newUserData.id }

// Problem 1: Current History implementation can be fooled by
// user change their DisplayName. We should use a dynamic
// (pointer-like) for ActionString (i.e. build actionString
// on client-side)

// Problem 2: ActionString needs enhance for a better semantic

export const addHistory = async (actor, action, target) => {
  const actorResult = await axiosClient.get(`${actor.const.url}?id=${actor.id}`)
  const targetResult = await axiosClient.get(`${target.const.url}?id=${target.id}`)
  if (actorResult.data.length === 0) {
    console.log(`History: ${actor.const.context} with id=${actor.id} not found`)
    return
  }
  if (targetResult.data.length === 0) {
    console.log(`History: ${target.const.context} with id=${target.id} not found`)
    return
  }
  const actorData = actorResult.data[0]
  const targetData = targetResult.data[0]
  const data = {
    Description: '',
    [actor.const.property]: actorData,
    [target.const.property]: targetData,
    ActorId: actor.const.id,
    ActionId: action.const.id,
    TargetId: target.const.id,
  }
  const historyResult = await axiosClient.post('/history-details', data)
  // Add nortification records
  addNortification(NORTIFICATION_CONST.TYPE.SELF, actor.id, historyResult.data.id)
  actorData.FollowedByUsers.forEach((user) => {
    addNortification(NORTIFICATION_CONST.TYPE.SELF, user.id, historyResult.data.id)
  })
}

export const getHistoryString = (history, checkActorName, actorName) => {
  var actorContext
  if (checkActorName && HISTORY_LIST.ACTOR[history.ActorId].context === HISTORY_CONST.ACTOR.OTHER.context)
    actorContext = history.User.DisplayName === actorName ? 'You' : history.User.DisplayName
  else actorContext = history.User.DisplayName
  const actionContext = HISTORY_LIST.ACTION[history.ActionId].context
  const targetConst = HISTORY_LIST.TARGET[history.TargetId]
  const targetContext = history[targetConst.property][targetConst.contextProperty]
  return actorContext + ' ' + actionContext + ' ' + targetConst.context + " '" + targetContext + "'"
}

export const getHistoryUrl = (history) => {
  const targetConst = HISTORY_LIST.TARGET[history.TargetId]
  return targetConst.url + history[targetConst.property].id
}
