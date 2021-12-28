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
      url: '/',
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
      context: 'Post',
      url: '/posts',
    },
    COMMENT: {
      id: 1,
      label: 'Comment',
      property: 'Comment',
      context: 'Comment',
      url: '/comments',
    },
    TAG: {
      id: 2,
      label: 'Tag',
      property: 'Tag',
      context: 'Tag',
      url: 'tags',
    },
    PROFILE: {
      id: 3,
      label: 'Profile',
      property: 'RelatedUser',
      context: 'Profile',
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
