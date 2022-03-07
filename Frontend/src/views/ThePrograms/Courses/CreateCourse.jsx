import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "@mui/material/Button";

import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { createCourse } from "./../../../redux/actions";
const initialState = {
  course_code: "",
  course: "",
  description: "",
};
const CreateCourse = ({ modal, setModal, program }) => {
  const dispatch = useDispatch();

  const [course, setCourse] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const handleSave = async () => {
    console.log(course);
    if (program) {
      if (course.course_code.length < 1) {
        Swal.fire({
          icon: "warning",
          text: "Course Code Required",
          allowOutsideClick: true,
        });
        return;
      }
      if (course.course.length < 1) {
        Swal.fire({
          icon: "warning",
          text: "Course Required",
          allowOutsideClick: true,
        });
        return;
      }

      setLoading(true);
      await dispatch(createCourse({ ...course, program: program._id }));
      setLoading(false);
      setModal(false);
      setCourse(initialState);
      return;
    }
    Swal.fire({
      icon: "warning",
      text: "Failed to Create",
    });
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
        <Modal.Title>Create New Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-3  mt-2">
            <TextField
              className="w-100 text-uppercase"
              label="Course Code"
              variant="standard"
              value={`${course.course_code.toUpperCase()}`}
              onChange={(e) => {
                setCourse((prev) => {
                  return { ...prev, course_code: e.target.value };
                });
              }}
            />
          </div>
          <div className="col-md-9 mt-2">
            <TextField
              className="w-100 text-capitalize"
              label="Course"
              variant="standard"
              value={`${course.course}`}
              onChange={(e) => {
                setCourse((prev) => {
                  return { ...prev, course: e.target.value };
                });
              }}
            />
          </div>
          <div className="col-md-12 mt-3">
            <TextField
              className="w-100 text-capitalize"
              id="standard-textarea"
              label="Course Description"
              placeholder="Description"
              multiline
              variant="standard"
              value={`${course.description}`}
              onChange={(e) => {
                setCourse((prev) => {
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

export default CreateCourse;
