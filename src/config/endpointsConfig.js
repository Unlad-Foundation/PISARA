module.exports = {
  API_ENDPOINTS: {
    MAIN: {
      DEFAULT: '/api',
    },

    USER: {
      GET: '/user/get/all',
      GET_BY_ID: '/user/get/:id',
      POST: '/user/create',
      PUT: '/user/update',
      DELETE: '/user/remove/:id',
      LOGIN: '/user/login',
      CHECKLOGIN: '/current/user',
    },

    PROJECT: {
      GET: '/project/get/all',
      GET_BY_ID: '/project/get/:id',
      POST: '/project/create',
      PUT: '/project/update',
      DELETE: '/project/remove/:id',
    },

    MEMBER: {
      GET: '/member/get/all',
      GET_BY_ID: '/member/:projectId',
      POST: '/member/adduser',
      DEACTIVATE: '/member/deactivate',
      ACTIVATE: '/member/activate',
    },

    SPRINT: {
      GET: '/sprint/get/all',
      GET_BY_ID: '/sprint/get/:id',
      POST: '/sprint/create',
      PUT: '/sprint/update',
      DELETE: '/sprint/remove/:id',
    },

    ITEM: {
      GET: '/item/get/all',
      GET_BY_ID: '/item/get/:id',
      POST: '/item/create',
      PUT: '/item/update',
      DELETE: '/item/remove/:id',
      SEARCH: '/item/search',
      ADD_COMMENT: '/item/:itemId/addcomment',
      DELETE_COMMENT: '/item/:itemId/removecomment',
      ADD_IMAGE: '/item/:itemId/addimage',
    },
  },
};
