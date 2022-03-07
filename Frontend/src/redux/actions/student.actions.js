import { studentConstant } from "../constant/index";
import axios from "../../helpers/axios";
import Swal from "sweetalert2";
export const createStudent = (data) => {
  return async (dispatch) => {
    dispatch({ type: studentConstant.STUDENT_REQUEST });
    const res = await axios
      .put("/student", data)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: studentConstant.ADD_STUDENT_SUCCESS,
            payload: { student: res.data.student },
          });

          Swal.fire({
            icon: "success",
            title: "Successfully",
            text: res.data.msg,
          });
          return;
        }
        Swal.fire({
          icon: "warning",
          title: "Failed",
          text: res.data.msg,
        });
        return;
      })
      .catch((e) => {
        Swal.fire({
          icon: "warning",
          title: "Failed",
          text: e.response.data.msg,
        });
        return;
      });
    return res;
  };
};

export const getStudents = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: studentConstant.STUDENT_REQUEST });
      const res = await axios.get("/student");
      dispatch({
        type: studentConstant.GET_STUDENT_SUCCESS,
        payload: { students: res.data },
      });
    } catch (e) {
      dispatch({ type: studentConstant.GET_STUDENT_FAIL });
    }
  };
};
export const updateStudent = (data) => {
  return async (dispatch) => {
    const result = await axios
      .post("/student", data)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: studentConstant.UPDATE_STUDENT_SUCCESS,
            payload: { student: res.data.student },
          });
          Swal.fire({
            icon: "success",
            title: "Successfully",
            text: res.data.msg,
          });
          return;
        }
        dispatch({ type: studentConstant.UPDATE_STUDENT_FAIL });
        Swal.fire({
          icon: "warning",
          title: "Failed",
          text: res.data.msg,
        });
        return;
      })
      .catch((e) => {
        dispatch({ type: studentConstant.UPDATE_STUDENT_FAIL });
        Swal.fire({
          icon: "warning",
          title: "Failed",
          text: e.response.data.msg,
        });
        return;
      });
    return result;
  };
};

export const eraseStudentData = () => {
  return async (dispatch) => {
    dispatch({ type: studentConstant.ERASE_STUDENT_DATA });
  };
};

export const enrollStudent = (data) => {
  return async (dispatch) => {
    const result = axios
      .put("/enroll", data)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: studentConstant.ENROLL_STUDENT_SUCCESS,
            payload: { student: res.data.savedData },
          });
          Swal.fire({
            icon: "success",
            text: "Successfully Enrolled",
          });
          dispatch(getStudents());
          return;
        }
        dispatch({ type: studentConstant.ENROLL_STUDENT_FAIL });
        Swal.fire({
          icon: "warning",
          text: res.data.msg,
        });
        return;
      })
      .catch((e) => {
        dispatch({ type: studentConstant.ENROLL_STUDENT_FAIL });
        Swal.fire({
          icon: "warning",
          text: e.response.data.msg,
        });
        return;
      });

    return result;
  };
};

export const getEnrollStudent = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/enrolls");
      if (res.status === 200) {
        dispatch({
          type: studentConstant.GET_ENROLL_STUDENT_SUCCESS,
          payload: { students: res.data.students },
        });
      }
    } catch (e) {}
  };
};

export const deleteEnrollStudent = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/enroll/${id}`);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          text: "Successfully Deleted",
        });
        dispatch({
          type: studentConstant.DELETE_ENROLL_STUDENT_SUCCES,
          payload: { id: res.data.id },
        });
        return;
      }
      Swal.fire({
        icon: "warning",
        text: "Failed to Delete Enrolled Data",
      });
      return;
    } catch (e) {
      Swal.fire({
        icon: "warning",
        text: "Failed to Delete Enrolled Data",
      });
      return;
    }
  };
};

export const updateEnrollStudent = (data) => {
  return async (dispatch) => {
    const result = axios
      .post("/enroll", data)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            text: res.data.msg,
          });
          dispatch({
            type: studentConstant.UPDATE_ENROLL_STUDENT_SUCCESS,
            payload: { student: res.data.student },
          });
          return;
        }
        Swal.fire({
          icon: "warning",
          text: res.data.msg,
        });
        return;
      })
      .catch((e) => {
        Swal.fire({
          icon: "warning",
          text: e.response.data.msg,
        });
        return;
      });
    return result;
  };
};
