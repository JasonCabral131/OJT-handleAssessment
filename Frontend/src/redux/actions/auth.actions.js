import { authConstant } from "../constant";
import { eraseCollegeData, eraseStudentData, eraseProgramData } from "./index";
import axiosInstance from "./../../helpers/axios";
import Swal from "sweetalert2";
export const login = (user_info) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstant.LOGIN_REQUEST });
      const res = await axiosInstance.post("/admin/login", {
        ...user_info,
      });

      if (res.status === 200) {
        const { token, user } = res.data;
        await dispatch({
          type: authConstant.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
        return { result: true, user };
      } else {
        dispatch({ type: authConstant.LOGIN_FAILURE });
        return { result: false, message: res.data.message };
      }
    } catch (e) {
      return { result: false, message: e.response.data.msg };
    }
  };
};
export const checkValidity = (data) => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance.post("/admin/check-validity", data);
      if (res.status === 200) {
        const { user, token } = res.data;
        await dispatch({
          type: authConstant.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
        return { result: true };
      } else {
        dispatch(logout());
        return { result: false };
      }
    } catch (e) {
      dispatch(logout());
      return { result: false };
    }
  };
};
export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstant.LOGOUT_SUCCESS });
    dispatch(eraseCollegeData());
    dispatch(eraseStudentData());
    dispatch(eraseProgramData());
  };
};

export const updateProfileDetails = (form, data) => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance.post("/admin/update-profile", form);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          text: "Successfully Updated Profile Image",
        });
        await dispatch(checkValidity(data));
        return true;
      }
      Swal.fire({
        icon: "warning",
        text: res.data.msg,
      });
      return false;
    } catch (e) {
      Swal.fire({
        icon: "warning",
        text: "Failed to Update Profile Picture",
      });
      return false;
    }
  };
};

export const createNewAdmin = (data) => {
  return async (dispatch) => {
    const result = axiosInstance
      .put("/admin", data)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            text: "Successfully Added",
          });
          dispatch({
            type: authConstant.ADD_NEW_ADMIN_SUCCESS,
            payload: res.data.admin,
          });

          return;
        }

        Swal.fire({
          icon: "warning",
          text: res?.data?.msg,
        });
        return;
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          icon: "warning",
          text: e?.response?.data?.msg,
        });
        return;
      });
    return result;
  };
};

export const getAdmins = () => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance.get("/admins");
      if (res.status === 200) {
        dispatch({ type: authConstant.GET_ADMIN_SUCCESS, payload: res.data });
        return;
      }
      return;
    } catch (e) {
      return;
    }
  };
};
export const deleteAdminData = (id) => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance.delete(`/admin/${id}`);
      if (res.status === 200) {
        dispatch({ type: authConstant.DELETE_ADMIN_SUCCESS, payload: id });
        Swal.fire({
          icon: "success",
          text: "Successfully Deleted",
        });
        return;
      }
      Swal.fire({
        icon: "warning",
        text: "Failed to Delete Data",
      });
      return;
    } catch (e) {
      Swal.fire({
        icon: "warning",
        text: "Failed to Delete Data",
      });
      return;
    }
  };
};
export const updateAdminData = (data) => {
  return async (dispatch) => {
    const result = axiosInstance
      .post("/admin/update-profile", data)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: authConstant.UPDATE_ADMIN_SUCCESS,
            payload: res.data.admin,
          });
          Swal.fire({
            icon: "success",
            text: "Updated Successfully",
          });
          return;
        }
        Swal.fire({
          icon: "success",
          text: res.data.msg,
        });
        return;
      })
      .catch((e) => {
        Swal.fire({
          icon: "success",
          text: "Failed to Updated Data",
        });
        return;
      });
    return result;
  };
};
