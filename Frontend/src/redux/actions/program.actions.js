import { programConstant } from "./../constant";
import { getColleges } from "./college.action";
import axios from "./../../helpers/axios";
import Swal from "sweetalert2";
import { getEnrollStudent } from "./student.actions";

export const createProgram = (data) => {
  return async (dispatch) => {
    dispatch({ type: programConstant.PROGRAM_REQUEST });
    const result = await axios
      .put("/program", data)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: programConstant.ADD_PROGRAM_SUCCESS,
            payload: { program: res.data.program },
          });
          dispatch(getColleges());
          Swal.fire({
            icon: "success",
            text: "Successfully Created",
          });
          return;
        }
        Swal.fire({
          icon: "warning",
          text: res.data.msg,
        });
        dispatch({ type: programConstant.ADD_PROGRAM_FAIL });
      })
      .catch((e) => {
        Swal.fire({
          icon: "warning",
          text: e.response.data.msg,
        });
        dispatch({ type: programConstant.ADD_PROGRAM_FAIL });
        return;
      });
    return result;
  };
};

export const getPrograms = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: programConstant.PROGRAM_REQUEST });
      const res = await axios.get("/programs");
      if (res.status === 200) {
        dispatch({
          type: programConstant.GET_PROGRAM_SUCCESS,
          payload: { programs: res.data },
        });
      }
    } catch (e) {
      dispatch({ type: programConstant.GET_PROGRAM_FAIL });
    }
  };
};

export const updateProgram = (data) => {
  return async (dispatch) => {
    const result = await axios
      .post("/program", data)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            text: "Updated Successfully",
          });
          dispatch({
            type: programConstant.UPDATE_PROGRAM_SUCCESS,
            payload: { program: res.data.program },
          });
          dispatch(getColleges());
          return;
        }
        Swal.fire({
          icon: "warning",
          text: res.data.msg,
        });
        dispatch({ type: programConstant.UPDATE_PROGRAM_FAIL });
        return;
      })
      .catch((e) => {
        Swal.fire({
          icon: "warning",
          text: e.response.data.msg,
        });
        dispatch({ type: programConstant.UPDATE_PROGRAM_FAIL });
        return;
      });

    return result;
  };
};

export const eraseProgramData = () => {
  return async (dispatch) => {
    dispatch({ type: programConstant.ERASE_PROGRAM_DATA });
  };
};

export const createCourse = (data) => {
  return async (dispatch) => {
    const result = axios
      .put("/course", data)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            text: "Successfully Created",
          });
          dispatch({
            type: programConstant.ADD_COURSE_SUCCESS,
            payload: { course: res.data.course },
          });
          return;
        }
        Swal.fire({
          icon: "warning",
          text: res.data.msg,
        });
        dispatch({ type: programConstant.ADD_COURSE_FAIL });
        return;
      })
      .catch((e) => {
        Swal.fire({
          icon: "warning",
          text: e.response.data.msg,
        });
        dispatch({ type: programConstant.ADD_COURSE_FAIL });
        return;
      });

    return result;
  };
};
export const updateCourse = (data) => {
  return async (dispatch) => {
    const result = axios
      .post("/course", data)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            text: "Successfully Updated",
          });
          dispatch({
            type: programConstant.UPDATE_COURSE_SUCCESS,
            payload: { course: res.data.course },
          });
          return;
        }
        Swal.fire({
          icon: "warning",
          text: res.data.msg,
        });
        dispatch({ type: programConstant.UPDATE_COURSE_FAIL });
        return;
      })
      .catch((e) => {
        Swal.fire({
          icon: "warning",
          text: e.response.data.msg,
        });
        dispatch({ type: programConstant.UPDATE_COURSE_FAIL });
        return;
      });
    return result;
  };
};

export const deleteCourseProgram = ({ id, course }) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/course/${id}`);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          text: "Successfully Deleted",
        });
        dispatch({
          type: programConstant.DELETE_COURSE_SUCCESS,
          payload: { course },
        });
        dispatch(getEnrollStudent());
        return;
      }
      Swal.fire({
        icon: "warning",
        text: "Failed to Delete Course",
      });
      return;
    } catch (e) {
      Swal.fire({
        icon: "warning",
        text: "Failed to Delete Course",
      });
      return;
    }
  };
};
