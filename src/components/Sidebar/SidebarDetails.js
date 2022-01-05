import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ViewListIcon from "@material-ui/icons/ViewList";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

const SidebarDetails = [
  {
    id: "Profile",
    parrentIcon: <AccountCircleIcon />,
    childIcon: [
      {
        icon: <AccountCircleIcon />,
        text: "Details",
        path: "/my-profile",
      },
    ],
  },
  {
    id: "Products",
    parrentIcon: <SupervisedUserCircleIcon />,
    childIcon: [
      {
        icon: <ViewListIcon />,
        text: "Products list",
        path: "/my-profile/products/products-index",
      },
      {
        icon: <AddCircleOutlineIcon />,
        text: "Create a new Product",
        path: "/my-profile/products/products-create",
      },
    ],
  },
  {
    id: "Orders",
    parrentIcon: <ReceiptIcon />,
    childIcon: [
      {
        icon: <ViewListIcon />,
        text: "Orders list",
        path: "/my-profile/orders/orders-index",
      },
    ],
  },
  {
    id: "Users",
    parrentIcon: <ReceiptIcon />,
    childIcon: [
      {
        icon: <ViewListIcon />,
        text: "Users list",
        path: "/my-profile/users/users-index",
      },
    ],
  },
];

export default SidebarDetails;
