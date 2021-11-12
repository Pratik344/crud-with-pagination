import { ADD_TO_USERDATA } from "../../Constance"; 
const initialState = {
  userData: [],
};

export default function profileData(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_USERDATA:
      // console.warn("reducer",action)
      return {...state,  profileData: action.payload }
    default:
      return state;
  }
}
