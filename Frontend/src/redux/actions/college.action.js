import { collegeConstant } from "./../constant";
import axios from "./../../helpers/axios";
import Swal from "sweetalert2";

export const createCollege = (data) => {
  return async (dispatch) => {
    const res = await axios
      .put("/college", data)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({ icon: "success", text: "Successfully Created" });
          dispatch({
            type: collegeConstant.ADD_COLLEGE_SUCCESS,
            payload: { college: res.data.college },
          });
          return;
        }
        Swal.fire({ icon: "warning", text: res.data.msg });
        dispatch({ type: collegeConstant.ADD_COLLEGE_FAIL });
        return;
      })
      .catch((e) => {
        Swal.fire({
          icon: "warning",
          text: e.response.data.msg,
        });
        return;
      });
    return res;
  };
};

export const getColleges = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: collegeConstant.COLLEGE_REQUEST });
      const res = await axios.get("/colleges");
      if (res.status === 200) {
        dispatch({
          type: collegeConstant.GET_COLLEGE_SUCCESS,
          payload: { colleges: res.data.colleges },
        });
        return;
      }
      dispatch({ type: collegeConstant.GET_COLLEGE_FAIL });
    } catch (e) {}
  };
};
export const updateCollege = (data) => {
  return async (dispatch) => {
    const result = await axios
      .post("/college", data)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: collegeConstant.UPDATE_COLLEGE_SUCCESS,
            payload: { college: res.data.college },
          });
          Swal.fire({
            icon: "success",
            text: "Successfully Updated",
          });
          return;
        }
        dispatch({ type: collegeConstant.UPDATE_COLLEGE_FAIL });
        Swal.fire({
          icon: "success",
          text: res.data.msg,
        });
        return;
      })
      .catch((e) => {
        Swal.fire({
          icon: "warning",
          text: e.response.data.msg,
        });
        dispatch({ type: collegeConstant.UPDATE_COLLEGE_FAIL });
        return;
      });
    return result;
  };
};

export const eraseCollegeData = () => {
  return async (dispatch) => {
    dispatch({ type: collegeConstant.ERASE_COLLEGE_DATA });
  };
};
