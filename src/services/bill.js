import { clientApi } from "../api/client";

export const billService = {
  /**
   * Create single record
   */
  createOne: (id, form) => clientApi.post(`bill/${id}`, form),
  /**
   * Get multiple records
   */
  getMany: (id) => clientApi.get(`bill/${id}`),
  /**
   * Get single record
   */
  getOne: (userID, id) => clientApi.get(`bill/detail/${userID}/${id}`),
  /**
   * Delete single record
   */
  deleteTransaction: (billID, form) =>
    clientApi.post(`/bill/transfer/${billID}`, form),
  /**
   * Archieve single record
   */
  archiveBill: (userID, billID) =>
    clientApi.patch(`/bill/detail/${userID}/${billID}`),
};
