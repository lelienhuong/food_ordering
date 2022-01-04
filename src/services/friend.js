import { clientApi } from "../api/client";

export const friendService = {
  getMany: (id) => clientApi.get(`/user/${id}/friends`),
  /**
   * Get single record
   */
  getOne: (id) => clientApi.get(`bill/detail/${id}`),
  /**
   * add a new member in group
   */
  addFriend: (userID, form) => clientApi.post(`friend/${userID}`, form),
};
