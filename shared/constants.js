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

export const INFORMATION_CONST = {
  GENDER: ['Male', 'Female', 'Unknown'],
}

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
  },
}

export const HISTORY_LIST = {
  ACTOR: [HISTORY_CONST.ACTOR.SELF, HISTORY_CONST.ACTOR.OTHER],
  ACTION: [HISTORY_CONST.ACTION.CREATE, HISTORY_CONST.ACTION.UPDATE, HISTORY_CONST.ACTION.DELETE],
  TARGET: [HISTORY_CONST.TARGET.POST, HISTORY_CONST.TARGET.COMMENT, HISTORY_CONST.TARGET.TAG, HISTORY_CONST.TARGET.PROFILE]
}

export const NORTIFICATION_CONST = {
  TYPE: {
    SELF: 'Self',
    OTHER: 'Other',
    ADMIN: 'Admin'
  }
}