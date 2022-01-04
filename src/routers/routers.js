import GroupCreate from "../pages/Group/GroupCreate";
import GroupDetail from "../pages/Group/GroupDetail";
import GroupList from "../pages/Group/GroupList";
import EditProfile from "../pages/Profile/EditProfile";
import Details from "../pages/Details/Details";
import AddFriend from "../components/Friend/AddFriend";
export const routes = [
  {
    path: "/my-profile",
    exact: true,
    meta: { title: "My profile" },
    children: [
      {
        path: "/my-profile/bills",
        exact: true,
        meta: { title: "My bills" },
        children: [
          {
            path: "/my-profile/bills/bills-index",
            exact: true,
            component: GroupList,
            meta: { title: "Bills list" },
          },
          {
            path: "/my-profile/bills/bills-create",
            exact: true,
            meta: { title: "Create a new bill" },
          },
          {
            path: "/my-profile/bills/bills-detail/:id",
            exact: true,
            meta: { title: "Detail bill" },
          },
        ],
      },
      {
        path: "/my-profile/add-friend",
        exact: true,
        component: AddFriend,
        meta: { title: "Add friend" },
      },
      {
        path: "/my-profile/edit",
        exact: true,
        component: EditProfile,
        meta: { title: "Edit profile" },
      },
      {
        path: "/my-profile/transaction-details",
        exact: true,
        component: Details,
        meta: { title: "Transaction Details" },
        children: [
          {
            path: "/my-profile/transaction-details/:id",
            exact: true,
            meta: { title: "Transaction Details" },
          },
        ],
      },
      {
        path: "/my-profile/groups",
        exact: true,
        redirect: "/my-profile/groups/groups-index",
        component: GroupList,
        meta: { title: "My groups" },
        children: [
          {
            path: "/my-profile/groups/groups-index",
            exact: true,
            component: GroupList,
            meta: { title: "Groups list" },
          },
          {
            path: "/my-profile/groups/groups-detail/:id",
            exact: true,
            component: GroupDetail,
            meta: { title: "Detail group" },
          },
          {
            path: "/my-profile/groups/groups-create",
            exact: true,
            component: GroupCreate,
            meta: { title: "Create a new group" },
          },
        ],
      },
    ],
  },
];
