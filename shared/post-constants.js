export const POST_CONST = {
  DATA_ORDER: {
    //Todo: change created_at to PublishTime after NguyenChan
    HOT: '_sort=ViewCount:desc',
    NEW: '_sort=created_at:desc,ViewCount:desc',
    BEST: '_sort=UpvoteCount:desc,DownvoteCount:desc,ViewCount:desc',
  },
}
export const POST_STATUS = {
  Publish: {
    value: 'Publish',
    label: 'Publish',
  },
  UnPublish: {
    value: 'UnPublish',
    label: 'UnPublish',
  },
}
