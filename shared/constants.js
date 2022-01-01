import { INFORMATION_CONST, DASHBOARD_CONST } from './profile-constants'

export const HISTORY_CONST = {
  ACTOR: {
    SELF: {
      id: 0,
      label: 'Yourself',
      property: 'User',
      context: 'You',
      url: '/account-users',
    },
    OTHER: {
      id: 1,
      label: 'Others',
      property: 'User',
      context: 'Someone',
      url: '/account-users',
    },
  },
  ACTION: {
    CREATE: {
      id: 0,
      label: 'Create',
      context: 'Created',
    },
    UPDATE: {
      id: 1,
      label: 'Update',
      context: 'Edited',
    },
    DELETE: {
      id: 2,
      label: 'Delete',
      context: 'Deleted',
    },
    REMOVE: {
      id: 3,
      label: 'Remove',
      context: 'Removed',
    },
    FOLLOW: {
      id: 4,
      label: 'Follow',
      context: 'Followed',
    },
    UNFOLLOW: {
      id: 5,
      label: 'Unfollow',
      context: 'Unfollowed',
    },
  },
  TARGET: {
    POST: {
      id: 0,
      label: 'Post',
      property: 'Post',
      contextProperty: 'Title',
      context: 'Post',
      url: '/posts',
    },
    COMMENT: {
      id: 1,
      label: 'Comment',
      property: 'Comment',
      contextProperty: 'Content',
      context: 'Comment',
      url: '/comments',
    },
    TAG: {
      id: 2,
      label: 'Tag',
      property: 'Tag',
      contextProperty: 'DisplayName',
      context: 'Tag',
      url: '/tags',
    },
    PROFILE: {
      id: 3,
      label: 'Profile',
      property: 'RelatedUser',
      contextProperty: 'DisplayName',
      context: 'Profile',
      url: '/account-users',
    },
    USER: {
      id: 4,
      label: 'User',
      property: 'RelatedUser',
      contextProperty: 'DisplayName',
      context: 'User',
      url: '/account-users',
    },
    FOLLOWER: {
      id: 5,
      label: 'Follower',
      property: 'RelatedUser',
      contextProperty: 'DisplayName',
      context: 'Follower',
      url: '/account-users',
    },
  },
}
export const ROLE_AUTH_ID = {
  GUEST: 2,
  USER: 1,
  MODERATOR: 4,
  ADMINSTRATOR: 5,
}
export const HISTORY_LIST = {
  ACTOR: [HISTORY_CONST.ACTOR.SELF, HISTORY_CONST.ACTOR.OTHER],
  ACTION: [
    HISTORY_CONST.ACTION.CREATE,
    HISTORY_CONST.ACTION.UPDATE,
    HISTORY_CONST.ACTION.DELETE,
    HISTORY_CONST.ACTION.REMOVE,
    HISTORY_CONST.ACTION.FOLLOW,
    HISTORY_CONST.ACTION.UNFOLLOW,
  ],
  TARGET: [
    HISTORY_CONST.TARGET.POST,
    HISTORY_CONST.TARGET.COMMENT,
    HISTORY_CONST.TARGET.TAG,
    HISTORY_CONST.TARGET.PROFILE,
    HISTORY_CONST.TARGET.USER,
    HISTORY_CONST.TARGET.FOLLOWER,
  ],
}

export const NORTIFICATION_CONST = {
  TYPE: {
    SELF: 'Self',
    OTHER: 'Other',
    ADMIN: 'Admin',
  },
}
export const STATES_CONST = [
  {
    value: 'ACTIVE',
    label: 'ACTIVE',
  },
  {
    value: 'PENDING',
    label: 'PENDING',
  },
]
export const CONTRIBUTION_CONST = {
  TIER: {
    Iron: 15,
    Bronze: 50,
    Silver: 200,
    Gold: 600,
    Platinum: 1200,
    Diamond: 2000,
    Master: 3200,
    Challenger: 5000,
  },
  RECIEVED_PTS: {
    postReview: 15,
    postComment: 3,
    upvote: 1,
    downvote: -1,
  },
}

export const STATUS_POST = {
  Publish: {
    value: 'Publish',
    label: 'Publish',
  },
  Report: {
    value: 'Report',
    label: 'Report',
  },
  Refused: {
    value: 'Refused',
    label: 'Refused',
  },
}
export const CHOICE_OPTION = {
  EveryOne: {
    label: 'EveryOne',
    value: 1,
  },
  Individual: {
    label: 'Individual',
    value: 2,
  },
}
export const BUTTON_POST = {
  Save: {
    label: 'Save',
  },
  Undo: {
    label: 'Undo',
  },
  Delete: {
    label: 'Delete',
  },
}
export const VOTE_CONST = {
  TYPE: {
    POST: {
      context: 'Post',
      url: '/posts',
    },
    COMMENT: {
      context: 'Comment',
      url: '/comments',
    },
  },
}

export { INFORMATION_CONST, DASHBOARD_CONST }
