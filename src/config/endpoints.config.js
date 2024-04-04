module.exports = {
  MAIN: {
    DEFAULT: "/",
  },

  USER: {
    REGISTER: {
      GET: "/user/get/all",
      GET_BY_ID: "/user/get/:id",
      POST: "/user/create",
      PUT: "/user/update/:id",
      DELETE: "/user/remove/:id",
    },
    LOGIN: {
      GET: "/user/current",
      POST: "/user/login",
    },
  },

  PROJECT: {
    GET: "/project/get/all",
    GET_BY_ID: "/project/get/:id",
    POST: "/project/create",
    PUT: "/project/update/:id",
    DELETE: "/project/delete/:id",
  },

  MEMBER: {
    GET: "member/get/all",
    GET_BY_ID: "/member/:projectId",
    POST: "/member/adduser/:projectId",
    PUT_DEACTIVATE: "/member/deactivate/:projectId/:userId",
    PUT_ACTIVATE: "/member/activate/:projectId/:userId",
  },

  ITEM: {
    GET: "/item/get/all",
    GET_BY_ID: "/item/get/:id",
    POST: "/item/create",
    PUT: "/item/update/:id",
    DELETE: "/item/remove/:id",
    POST_SEARCH: "/item/search",
    POST_COMMENT: "/item/:itemId/addcomment",
    DELETE_COMMENT: "/item/:itemId/removecomment",
    POST_IMAGE: "/item/:itemId/addimage",
  },

  EVENT: {},
};
