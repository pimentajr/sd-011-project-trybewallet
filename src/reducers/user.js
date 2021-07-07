import { USER_INFO } from '../actions';
const initialState = { email: '' };

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_INFO: {
      return { ...state, payload };
    }
    default:
      return { ...state };
  }
};

export default userReducer;
