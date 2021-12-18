import axiosClient from '../axiosClient'


// Example: User Update Profile
// addHistory(
//   { const: HISTORY_CONST.ACTOR.SELF, id: newUserData.id },
//   { const: HISTORY_CONST.ACTION.UPDATE },
//   { const: HISTORY_CONST.TARGET.PROFILE, id: newUserData.id }
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
  const actionString =
    actor.const.context + ' has ' + action.const.context + ' ' + target.const.context
  const data = {
    Action: actionString,
    Description: '',
    [actor.const.property]: actorData,
    [target.const.property]: targetData,
    ActorId: actor.const.id,
    ActionId: action.const.id,
    TargetId: target.const.id,
  }
  axiosClient.post('/history-details', data)
}
