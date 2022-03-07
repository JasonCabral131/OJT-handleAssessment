import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Modal } from "react-bootstrap";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import axiosInstance from "../../../../helpers/axios";
import { useSelector } from "react-redux";
function ChangePassword({ setModal, modal, password, setPasssword }) {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const handleSave = async () => {
    try {
      if (password.oldpass.length < 1) {
        Swal.fire({
          icon: "warning",
          text: "Old Password Required",
        });
        return;
      }
      if (password.newPass.length < 8) {
        Swal.fire({
          icon: "warning",
          text: "New Password must be 8 Character Length",
        });
        return;
      }
      if (password.confirmPass !== password.newPass) {
        Swal.fire({
          icon: "warning",
          text: "Confirmation Your Password ",
        });
        return;
      }
      Swal.fire({
        title: "Are You Sure?",
        text: `You Wont Revert this action!!!`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Update it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
        allowOutsideClick: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setLoading(true);
            const res = await axiosInstance.post("/admin/change-password", {
              ...password,
              _id: user._id,
            });
            setLoading(false);
            setModal(false);
            if (res.status === 200) {
              Swal.fire({
                icon: "success",
                text: "Password Successfully Changed",
              });
              return;
            }
            Swal.fire({
              icon: "warning",
              text: res.data.msg,
            });
            setLoading(false);
            return;
          } catch (e) {
            Swal.fire({
              icon: "warning",
              text: "Failed to Change Password",
            });
            setLoading(false);
            return;
          }
        }
        setLoading(false);
      });
    } catch (e) {
      Swal.fire({
        icon: "warning",
        text: "Failed to Update Password",
      });
      setModal(false);
      setLoading(false);
    }
  };
  return (
    <Modal
      show={modal}
      onHide={() => {
        setModal(false);
      }}
      dialogClassName="modal-margin-top"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>{" "}
      <Modal.Body>
        <div className="row p-1">
          <div className="col-md-12  mt-2">
            <TextField
              type={"password"}
              className="w-100"
              label="Old Password"
              variant="outlined"
              value={`${password.oldpass}`}
              onChange={(e) => {
                setPasssword((prev) => {
                  return { ...prev, oldpass: e.target.value };
                });
              }}
            />
          </div>
          <div className="col-md-12  mt-2">
            <TextField
              type={"password"}
              className="w-100"
              label="New Password"
              placeholder="Enter new Password"
              variant="outlined"
              value={`${password.newPass}`}
              onChange={(e) => {
                setPasssword((prev) => {
                  return { ...prev, newPass: e.target.value };
                });
              }}
            />
          </div>
          <div className="col-md-12  mt-2">
            <TextField
              type={"password"}
              className="w-100"
              label="New Password"
              placeholder="Enter new Password"
              variant="outlined"
              value={`${password.confirmPass}`}
              onChange={(e) => {
                setPasssword((prev) => {
                  return { ...prev, confirmPass: e.target.value };
                });
              }}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => setModal(false)}
          disabled={loading}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={handleSave}
          disabled={loading}
          variant="contained"
          className="ms-1 loadinCircular"
        >
          {loading ? <>Loading...</> : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChangePassword;
