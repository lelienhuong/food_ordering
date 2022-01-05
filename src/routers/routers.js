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
        path: "/my-profile/products",
        exact: true,
        meta: { title: "Products" },
        children: [
          {
            path: "/my-profile/products/products-index",
            exact: true,
            component: GroupList,
            meta: { title: "Products list" },
          },
          {
            path: "/my-profile/products/products-create",
            exact: true,
            meta: { title: "Create a new product" },
          },
          {
            path: "/my-profile/products/products-detail/:id",
            exact: true,
            meta: { title: "Detail product" },
          },
        ],
      },
      {
        path: "/my-profile/edit",
        exact: true,
        component: EditProfile,
        meta: { title: "Edit profile" },
      },
      {
        path: "/my-profile/orders",
        exact: true,
        redirect: "/my-profile/orders/orders-index",
        component: GroupList,
        meta: { title: "My orders" },
        children: [
          {
            path: "/my-profile/orders/orders-index",
            exact: true,
            component: GroupList,
            meta: { title: "Orders list" },
          },
          {
            path: "/my-profile/orders/orders-detail/:id",
            exact: true,
            component: GroupDetail,
            meta: { title: "Detail order" },
          },
        ],
      },
      {
        path: "/my-profile/users",
        exact: true,
        redirect: "/my-profile/users/users-index",
        component: GroupList,
        meta: { title: "My users" },
        children: [
          {
            path: "/my-profile/users/users-index",
            exact: true,
            component: GroupList,
            meta: { title: "Users list" },
          },
          {
            path: "/my-profile/users/users-detail/:id",
            exact: true,
            component: GroupDetail,
            meta: { title: "Detail order" },
          },
        ],
      },
    ],
  },
];
