import { ADD_TO_USERDATA } from "../Constance";
export const addUserData = (data) => {
  console.warn("action", data);
  return {
    type: ADD_TO_USERDATA,
    payload: data,
  };
};
