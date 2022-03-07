import { authConstant } from "./../constant/";

const INITIAL_STATE = {
  token: null,
  user: null,
  isAuthenticated: false,
  authenticating: false,
  admins: [],
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authConstant.LOGIN_REQUEST:
      return (state = {
        ...state,
        authenticating: true,
      });

    case authConstant.LOGIN_SUCCESS:
      return (state = {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        authenticating: false,
        user: action.payload.user,
      });

    case authConstant.LOGOUT_SUCCESS:
      return (state = {
        ...INITIAL_STATE,
      });
    case authConstant.ADD_NEW_ADMIN_SUCCESS:
      return (state = {
        ...state,
        admins: [...state.admins, action.payload],
      });
    case authConstant.UPDATE_ADMIN_SUCCESS:
      return (state = {
        ...state,
        admins: updateAdmin(state.admins, action.payload),
      });
    case authConstant.GET_ADMIN_SUCCESS:
      return (state = {
        ...state,
        admins: action.payload,
      });
    case authConstant.DELETE_ADMIN_SUCCESS:
      return (state = {
        ...state,
        admins: deleteAdmin(state.admins, action.payload),
      });
    default:
      return state;
  }
};

export default authReducer;

const updateAdmin = (state, admin) => {
  console.log(admin);
  return state.map((data) => {
    if (admin) {
      if (data._id === admin._id) {
        return admin;
      }
    }
    return data;
  });
};

const deleteAdmin = (state, id) => {
  const filterOut = state.filter((data) => data._id !== id);

  return filterOut;
};
