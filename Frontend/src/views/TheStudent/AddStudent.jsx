import React, { useState } from "react";
import TextField from "@mui/material/TextField";

import { Modal } from "react-bootstrap";

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import { EmailValidator, phoneValidtor } from "../../reusable";

import { useDispatch } from "react-redux";
import { createStudent } from "../../redux/actions/student.actions";
const initialState = {
  lastname: "",
  firstname: "",
  middlename: "",
  phone: "",
  email: "",
  sex: "",
  birthday: "",
};
const AddStudent = ({ modal, setModal }) => {
  const dispatch = useDispatch();
  const [student, setStudent] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const handleSave = async () => {
    if (student.firstname.length < 1) {
      Swal.fire({
        icon: "warning",
        text: "Firstname Required",
      });
      return;
    }
    if (student.lastname.length < 1) {
      Swal.fire({
        icon: "warning",
        text: "Lastname Required",
      });
      return;
    }
    if (student.sex.length < 1) {
      Swal.fire({
        icon: "warning",
        text: "Sex Required",
      });
      return;
    }
    if (student.birthday.length < 1) {
      Swal.fire({
        icon: "warning",
        text: "Birthday Required",
      });
      return;
    }
    if (student.phone.length < 1) {
      Swal.fire({
        icon: "warning",
        text: "phone Required",
      });
      return;
    }
    if (!phoneValidtor(student.phone)) {
      Swal.fire({
        icon: "warning",
        text: "Invalid Phone Number",
      });
      return;
    }
    if (!EmailValidator(student.email)) {
      Swal.fire({
        icon: "warning",
        text: "Invalid/Required Email Address",
      });
      return;
    }
    setLoading(true);
    await dispatch(
      createStudent({ ...student, email: student.email.toLowerCase() })
    );
    setLoading(false);
    setModal(false);
    setStudent(initialState);
  };
  return (
    <Modal
      show={modal}
      onHide={() => {
        setModal(false);
      }}
      size="lg"
      dialogClassName="modal-margin-top"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create New Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-4 mt-2">
            <TextField
              className="w-100"
              label="First Name"
              variant="standard"
              value={`${student.firstname}`}
              onChange={(e) => {
                setStudent((prev) => {
                  return { ...prev, firstname: e.target.value };
                });
              }}
            />
          </div>
          <div className="col-md-4 mt-2">
            <TextField
              className="w-100"
              label="Middle Name"
              variant="standard"
              value={`${student.middlename}`}
              onChange={(e) => {
                setStudent((prev) => {
                  return { ...prev, middlename: e.target.value };
                });
              }}
            />
          </div>
          <div className="col-md-4 mt-2">
            <TextField
              className="w-100"
              label="Last Name"
              variant="standard"
              value={`${student.lastname}`}
              onChange={(e) => {
                setStudent((prev) => {
                  return { ...prev, lastname: e.target.value };
                });
              }}
            />
          </div>
          <div className="col-md-4 mt-2">
            <TextField
              className="w-100"
              id="filled-select-currency"
              select
              label="Sex"
              variant="standard"
              value={student.sex}
              onChange={(e) => {
                setStudent((prev) => {
                  return { ...prev, sex: e.target.value };
                });
              }}
            >
              <MenuItem key={"male"} value={"Male"}>
                Male
              </MenuItem>
              <MenuItem key={"Female"} value={"Female"}>
                Female
              </MenuItem>
            </TextField>
          </div>
          <div className="col-md-4 mt-2">
            <TextField
              id="date"
              label="Birthday"
              type="date"
              className="w-100"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              value={student.birthday}
              onChange={(e) => {
                setStudent((prev) => {
                  return { ...prev, birthday: e.target.value };
                });
              }}
            />
          </div>
          <div className="col-md-4 mt-2">
            <TextField
              className="w-100"
              label="Phone Number"
              variant="standard"
              type={"text"}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onPaste={(e) => {
                const data = e.clipboardData.getData("Text");
                if (!/[0-9]/.test(data)) {
                  e.preventDefault();
                }
              }}
              value={student.phone}
              onChange={(e) => {
                setStudent((prev) => {
                  return { ...prev, phone: e.target.value };
                });
              }}
            />
          </div>
          <div className="col-md-12 mt-2">
            <TextField
              className="w-100"
              label="Email Address"
              variant="standard"
              type={"email"}
              value={student.email}
              onChange={(e) => {
                setStudent((prev) => {
                  return { ...prev, email: e.target.value };
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
          loadingPosition="start"
          variant="contained"
          className="ms-1 loadinCircular"
        >
          {loading ? <>Loading...</> : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddStudent;
