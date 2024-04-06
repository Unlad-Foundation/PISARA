module.exports = {
  API_ENDPOINTS: {
    MAIN: {
      DEFAULT: "/",
    },

    USER: {
      REGISTER: {
        GET: "/user/get/all",
        GET_BY_ID: "/user/get/:id",
        POST: "/user/create",
        PUT: "/user/update",
        DELETE: "/user/remove/:id",
      },
      LOGIN: {
        GET: "/current/user",
        POST: "/user/login",
      },
    },

    PROJECT: {
      GET: "/project/get/all",
      GET_BY_ID: "/project/get/:id",
      POST: "/project/create",
      PUT: "/project/update",
      DELETE: "/project/delete/:id",
    },

    MEMBER: {
      GET: "/member/get/all",
      GET_BY_ID: "/member/:projectId",
      POST: "/member/adduser",
      PUT_DEACTIVATE: "/member/deactivate",
      PUT_ACTIVATE: "/member/activate",
    },

    SPRINT: {},

    ITEM: {
      GET: "/item/get/all",
      GET_BY_ID: "/item/get/:id",
      POST: "/item/create",
      PUT: "/item/update",
      DELETE: "/item/remove/:id",
      POST_SEARCH: "/item/search",
      POST_COMMENT: "/item/:itemId/addcomment",
      DELETE_COMMENT: "/item/:itemId/removecomment",
      POST_IMAGE: "/item/:itemId/addimage",
    },
  },
};
