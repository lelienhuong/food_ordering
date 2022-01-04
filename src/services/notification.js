import { clientApi } from "../api/client";

export const notificationService = {
  /**
   * Create single record
   */
  createOne: (form, userID) =>
    clientApi.post(`/notification/create/${userID}`, form),
  /**
   * Get multiple records
   */
  getMany: (userID) => clientApi.get(`notification/${userID}`),
  /**
   * Get single record
   */
  getOne: (userID, groupID) =>
    clientApi.get(`group/detail/${groupID}/${userID}`),
  /**
   * Delete single record
   */
  deleteOne: (notiID) => clientApi.delete(`/notification/${notiID}`),
  /**
   * Announce is readed notification
   */
  announceReaded: (userID) => clientApi.patch(`/notification/${userID}`),
};
