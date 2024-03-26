module.exports = {
    API_ENDPOINTS: {
        MAIN: {
            DEFAULT: "/",
        },
        // user endpoints
        USER_REGISTER: {
            GET: "/users",
            POST: "/users/register",
            GET_UPDATE_DELETE_BY_ID: "/users/:id",
        },
        USER_LOGIN: {
            GET: "/current",
            POST: "/users/login"
        },
        // project endpoints
        PROJECT: {
            GET: "/projects",
            POST: "/projects",
            GET_UPDATE_DELETE_BY_ID: "/projects/:id",
            ADD_MEMBER: "/projects/:project_id/member"
        },
        // project members endpoints
        PROJECT_MEMBER: {
            GET: "/:project_id",
        }
    }
}