import { clientApi } from "../api/client";

export const groupService = {
  /**
   * Create single record
   */
  createOne: (form, id) => clientApi.post(`group/${id}`, form),
  /**
   * Get multiple records
   */
  getMany: (id) => clientApi.get(`group/${id}`),
  /**
   * Get single record
   */
  getOne: (userID, groupID) =>
    clientApi.get(`group/detail/${groupID}/${userID}`),
  /**
   * add a new member in group
   */
  addMember: (groupID, form) => clientApi.post(`group/member/${groupID}`, form),
  /**
   * Archieve single record
   */
  archiveGroup: (userID, groupID) =>
    clientApi.patch(`group/detail/${groupID}/${userID}`),
};
