import { collegeConstant } from "./../constant/";

const INITIAL_STATE = {
  colleges: [],
  loading: false,
};

const collegeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case collegeConstant.COLLEGE_REQUEST:
      return (state = {
        ...state,
        loading: true,
      });
    case collegeConstant.GET_COLLEGE_SUCCESS:
      return (state = {
        ...state,
        colleges: action.payload.colleges,
        loading: false,
      });
    case collegeConstant.GET_COLLEGE_FAIL:
      return (state = {
        ...state,

        loading: false,
      });
    case collegeConstant.ADD_COLLEGE_SUCCESS:
      return (state = {
        ...state,
        colleges: [...state.colleges, action.payload.college],
        loading: false,
      });
    case collegeConstant.ADD_COLLEGE_FAIL:
      return (state = {
        ...state,
        loading: false,
      });
    case collegeConstant.UPDATE_COLLEGE_SUCCESS:
      return (state = {
        ...state,
        colleges: updateCollege(state.colleges, action.payload.college),
        loading: false,
      });
    case collegeConstant.UPDATE_COLLEGE_FAIL:
      return (state = {
        ...state,
        loading: false,
      });
    case collegeConstant.ERASE_COLLEGE_DATA:
      return (state = {
        ...INITIAL_STATE,
      });
    default:
      return state;
  }
};

export default collegeReducer;

const updateCollege = (state, college) => {
  return state.map((data) => {
    if (college) {
      if (data._id === college._id) {
        return { ...college };
      }
    }
    return data;
  });
};
