import { clientApi } from "../api/client";

export const authService = {
  login: (form) => clientApi.post("/user/login", form),
  register: (form) => clientApi.post("/user/register", form),
  //
  getFriendList: (id) => clientApi.get(`/user/${id}/friends`),
  getProfile: (id) => clientApi.get(`/user/${id}`),
  editProfile: (id, form) => clientApi.patch(`/user/${id}`, form),
  //
  getListLend: (id) => clientApi.get(`/user/${id}/listLend`),
  getListBorrow: (id) => clientApi.get(`/user/${id}/listBorrow`),
  getCommonTransactionsDetails: (userID, targetID) =>
    clientApi.get(`/friend/detail/${userID}/${targetID}`),
  getBillTag: (userID, billId) =>
    clientApi.get(`/bill/tag/${userID}/${billId}`),
  //
  searchFriendByKeyword: (userID, keyword) =>
    clientApi.post("/friend/search", {
      userID: userID,
      keyword: keyword,
    }),

  acceptFriendRequest: (userID, friendID) =>
    clientApi.post(`/friend/${userID}`, {
      friendID: friendID,
    }),
  isFriend: (userID, friendID) =>
    clientApi.get(`/friend/${userID}/${friendID}`),

  sendFriendRequest: (userID, friendID) =>
    clientApi.post(`notification/create/${userID}`, {
      to: [friendID],
      type: "invitedFriend",
      id: userID,
    }),

  unFriend: (userID, friendID) =>
    clientApi.delete(`/friend/${userID}`, {
      data: {
        friendID: friendID,
      },
    }),
};
