import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "@mui/material/Button";

import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";

import { useDispatch } from "react-redux";
import { updateCollege } from "../../redux/actions/college.action";

const UpdateCollege = ({ modal, setModal, college, setCollege }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleUpdate = async () => {
    if (college) {
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
      await dispatch(updateCollege(college));
      setLoading(false);
      setModal(false);
      setCollege(null);
    }
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
        <Modal.Title>Update College</Modal.Title>
      </Modal.Header>
      {college ? (
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
      ) : null}

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
          onClick={handleUpdate}
          disabled={loading}
          loadingPosition="start"
          variant="contained"
          className="ms-1 loadinCircular"
        >
          {loading ? <>Loading...</> : "Update"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateCollege;
