import { programConstant } from "./../constant";
const INITIAL_STATE = {
  programs: [],
  loading: false,
};

const programReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case programConstant.PROGRAM_REQUEST:
      return (state = {
        ...state,
        loading: true,
      });
    case programConstant.ADD_PROGRAM_SUCCESS:
      return (state = {
        ...state,
        programs: [...state.programs, action.payload.program],
        loading: false,
      });
    case programConstant.ADD_PROGRAM_FAIL:
      return (state = {
        ...state,

        loading: false,
      });
    case programConstant.GET_PROGRAM_SUCCESS:
      return (state = {
        ...state,
        programs: action.payload.programs,
        loading: false,
      });
    case programConstant.GET_PROGRAM_FAIL:
      return (state = {
        ...state,
        loading: false,
      });
    case programConstant.UPDATE_PROGRAM_SUCCESS:
      return (state = {
        ...state,
        programs: updateProgram(state.programs, action.payload.program),
        loading: false,
      });
    case programConstant.UPDATE_PROGRAM_FAIL:
      return (state = {
        ...state,
        loading: false,
      });
    case programConstant.ADD_COURSE_SUCCESS:
      return (state = {
        ...state,
        programs: pushCourseProgram(state.programs, action.payload.course),
        loading: false,
      });
    case programConstant.ADD_COURSE_FAIL:
      return (state = {
        ...state,
        loading: false,
      });
    case programConstant.UPDATE_COURSE_SUCCESS:
      return (state = {
        ...state,
        programs: updateCourseProgram(state.programs, action.payload.course),
        loading: false,
      });
    case programConstant.UPDATE_COURSE_FAIL:
      return (state = {
        ...state,
        loading: false,
      });
    case programConstant.DELETE_COURSE_SUCCESS:
      return (state = {
        ...state,
        programs: deleteCourseProgram(state.programs, action.payload.course),
        loading: false,
      });
    case programConstant.ERASE_PROGRAM_DATA:
      return (state = {
        ...INITIAL_STATE,
      });

    default:
      return state;
  }
};

export default programReducer;

const updateProgram = (state, program) => {
  return state.map((data) => {
    if (program) {
      if (data._id === program._id) {
        return { ...program };
      }
    }
    return data;
  });
};

const pushCourseProgram = (state, course) => {
  return state.map((data) => {
    if (course) {
      if (data._id === course.program) {
        return { ...data, courses: [...data.courses, course] };
      }
    }
    return data;
  });
};

const updateCourseProgram = (state, course) => {
  return state.map((data) => {
    if (course) {
      if (data._id === course.program) {
        const newCourse = data.courses.map((cdata) => {
          if (cdata._id === course._id) {
            return { ...course };
          }
          return cdata;
        });
        return { ...data, courses: newCourse };
      }
    }
    return data;
  });
};

const deleteCourseProgram = (state, course) => {
  return state.map((data) => {
    if (course) {
      if (data._id === course.program) {
        const newCourse = data.courses.filter(
          (cdata) => cdata._id !== course._id
        );
        return { ...data, courses: newCourse };
      }
    }
    return data;
  });
};
