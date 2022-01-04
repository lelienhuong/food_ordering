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
    id: "My groups",
    parrentIcon: <SupervisedUserCircleIcon />,
    childIcon: [
      {
        icon: <ViewListIcon />,
        text: "Groups list",
        path: "/my-profile/groups/groups-index",
      },
      {
        icon: <AddCircleOutlineIcon />,
        text: "Create a new group",
        path: "/my-profile/groups/groups-create",
      },
    ],
  },
  {
    id: "My bills",
    parrentIcon: <ReceiptIcon />,
    childIcon: [
      {
        icon: <ViewListIcon />,
        text: "Bills list",
        path: "/my-profile/bills/bills-index",
      },
      {
        icon: <AddCircleOutlineIcon />,
        text: "Create a new bill",
        path: "/my-profile/bills/bills-create",
      },
    ],
  },
];

export default SidebarDetails;
