import { studentConstant } from "./../constant/";

const INITIAL_STATE = {
  students: [],
  loading: false,
  enrolled: [],
};

const studentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case studentConstant.STUDENT_REQUEST:
      return (state = {
        ...state,
        loading: true,
      });
    case studentConstant.GET_STUDENT_SUCCESS:
      return (state = {
        ...state,
        students: action.payload.students,
        loading: false,
      });
    case studentConstant.GET_STUDENT_FAIL:
      return (state = {
        ...state,
        loading: false,
      });
    case studentConstant.ADD_STUDENT_SUCCESS:
      return (state = {
        ...state,
        loading: false,
        students: [...state.students, action.payload.student],
      });
    case studentConstant.ADD_STUDENT_FAIL:
      return (state = {
        ...state,
        loading: false,
      });
    case studentConstant.UPDATE_STUDENT_SUCCESS:
      return (state = {
        ...state,
        students: updateStudent(state.students, action.payload.student),
        loading: false,
      });
    case studentConstant.UPDATE_STUDENT_FAIL:
      return (state = {
        ...state,
        loading: false,
      });
    case studentConstant.ENROLL_STUDENT_SUCCESS:
      return (state = {
        ...state,
        enrolled: [...state.enrolled, ...action.payload.student],
        loading: false,
      });
    case studentConstant.GET_ENROLL_STUDENT_SUCCESS:
      return (state = {
        ...state,
        enrolled: action.payload.students,
        loading: false,
      });
    case studentConstant.DELETE_ENROLL_STUDENT_SUCCES:
      return (state = {
        ...state,
        enrolled: deleteEnroll(state.enrolled, action.payload.id),
        loading: false,
      });
    case studentConstant.UPDATE_ENROLL_STUDENT_SUCCESS:
      return (state = {
        ...state,
        enrolled: updateEnrollData(state.enrolled, action.payload.student),
        loading: false,
      });
    case studentConstant.ERASE_STUDENT_DATA:
      return (state = {
        ...INITIAL_STATE,
      });
    default:
      return state;
  }
};
export default studentReducer;

const updateStudent = (state, student) => {
  const newUpdated = state.map((data) => {
    if (student) {
      if (data._id === student._id) {
        return { ...student };
      }
    }
    return { ...data };
  });
  return newUpdated;
};

const deleteEnroll = (state, id) => {
  return state.filter((data) => data._id !== id);
};

const updateEnrollData = (state, enroll) => {
  return state.map((data) => {
    if (enroll) {
      if (data._id === enroll._id) {
        return { ...enroll };
      }
    }
    return { ...data };
  });
};
