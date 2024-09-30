import UserTable from "../Components/user/UserTable";
import Dashboard from "../Pages/Dashboard";
import UserInfoDetails from "../Pages/UserInfoDetails";
import UserPosts from "../Pages/UserPosts";

export const DASHBOARD_PATH = "/";
export const USERLIST_PATH = "/user";
export const ALL_POST_PATH = "/posts";
export const USER_BY_ID_PATH = "/user/:id";
export const USER_POST_BY_ID_PATH = "/user/:id/post";

export const public_routes = [
    { id: "1", path: DASHBOARD_PATH, Component: Dashboard, },
    { id: "2", path: USERLIST_PATH, Component: UserTable, },
    { id: "3", path: USER_BY_ID_PATH, Component: UserInfoDetails, },
    { id: "4", path: USER_POST_BY_ID_PATH, Component: UserPosts, },
    { id: "5", path: ALL_POST_PATH, Component: UserPosts, },
]