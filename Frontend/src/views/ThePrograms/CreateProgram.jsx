import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "@mui/material/Button";

import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { createProgram } from "../../redux/actions/program.actions";

const initialState = {
  college_id: "",
  prog_code: "",
  program: "",
  description: "",
};
const CreateProgram = ({ modal, setModal }) => {
  const dispatch = useDispatch();
  const { colleges } = useSelector((state) => state.college);
  const [program, setProgram] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const handleSave = async () => {
    if (program.college_id.length < 1) {
      Swal.fire({
        icon: "warning",
        text: "Select College",
      });
      return;
    }
    if (program.program.length < 1) {
      Swal.fire({
        icon: "warning",
        text: "Program Required",
      });
      return;
    }
    if (program.prog_code.length < 1) {
      Swal.fire({
        icon: "warning",
        text: "Abreviation Required",
      });
      return;
    }
    setLoading(true);
    await dispatch(createProgram(program));
    setLoading(false);
    setModal(false);
    setProgram(initialState);
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
        <Modal.Title>Create New Offer Program</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-12 w-100">
            <TextField
              className="w-100"
              id="standard-select-currency"
              select
              label="College"
              value={program.college_id}
              onChange={(e) => {
                setProgram((prev) => {
                  return { ...prev, college_id: e.target.value };
                });
              }}
              helperText="Please select College"
              variant="standard"
            >
              {colleges.map((college) => (
                <MenuItem key={college._id} value={college._id}>
                  {college.college}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="col-md-3  mt-2">
            <TextField
              className="w-100"
              label="Program Syllabus"
              variant="standard"
              value={`${program.prog_code.toUpperCase()}`}
              onChange={(e) => {
                setProgram((prev) => {
                  return { ...prev, prog_code: e.target.value };
                });
              }}
            />
          </div>
          <div className="col-md-9 mt-2">
            <TextField
              className="w-100"
              label="Program"
              variant="standard"
              value={`${program.program}`}
              onChange={(e) => {
                setProgram((prev) => {
                  return { ...prev, program: e.target.value };
                });
              }}
            />
          </div>
          <div className="col-md-12 mt-3">
            <TextField
              className="w-100"
              id="standard-textarea"
              label="Collge Description"
              placeholder="Description"
              multiline
              variant="standard"
              value={`${program.description}`}
              onChange={(e) => {
                setProgram((prev) => {
                  return { ...prev, description: e.target.value };
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
};

export default CreateProgram;
