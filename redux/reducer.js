import { GET_DATA } from './action';
const initialState = {
  data:{},
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case GET_DATA:
      return {
        ...state,
        data:action.payload,
      };
  
     
    default:
      return state;
  }
}