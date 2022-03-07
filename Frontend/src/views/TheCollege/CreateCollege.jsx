import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "@mui/material/Button";

import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";

import { useDispatch } from "react-redux";
import { createCollege } from "../../redux/actions/college.action";
const initialState = {
  college: "",
  description: "",
  abreviation: "",
};
const CreateCollege = ({ modal, setModal }) => {
  const dispatch = useDispatch();
  const [college, setCollege] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const handleSave = async () => {
    if (college.college.length < 1) {
      Swal.fire({
        icon: "warning",
        text: "College Required",
      });
      return;
    }
    if (college.abreviation.length < 1) {
      Swal.fire({
        icon: "warning",
        text: "Abreviation Required",
      });
      return;
    }
    setLoading(true);
    await dispatch(
      createCollege({
        ...college,
        college: college.college.toUpperCase(),
        abreviation: college.abreviation.toUpperCase(),
      })
    );
    setLoading(false);
    setModal(false);
    setCollege(initialState);
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
        <Modal.Title>Create New College</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-8 mt-3">
            <TextField
              className="w-100"
              label="College Name"
              variant="standard"
              value={`${college.college.toUpperCase()}`}
              onChange={(e) => {
                setCollege((prev) => {
                  return { ...prev, college: e.target.value };
                });
              }}
            />
          </div>
          <div className="col-md-4 mt-3">
            <TextField
              className="w-100"
              label="Abreviation"
              variant="standard"
              value={`${college.abreviation.toUpperCase()}`}
              onChange={(e) => {
                setCollege((prev) => {
                  return { ...prev, abreviation: e.target.value };
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
              value={`${college.description}`}
              onChange={(e) => {
                setCollege((prev) => {
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

export default CreateCollege;
