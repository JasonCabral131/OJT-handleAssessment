import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "@mui/material/Button";
import Select from "react-select";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { toCapitalized } from "../../../reusable";
import { enrollStudent } from "../../../redux/actions/student.actions";
const initialState = {
  student: null,
  college: null,
  program: null,
  course: [],
};
const Enroll = ({ modal, setModal }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState(initialState);
  const { colleges } = useSelector((state) => state.college);
  const { students } = useSelector((state) => state.student);
  const { programs } = useSelector((state) => state.program);
  const handleSave = async () => {
    if (!student.student) {
      Swal.fire({
        icon: "warning",
        title: "Select Student to Enroll",
      });
      return;
    }
    if (!student.college) {
      Swal.fire({
        icon: "warning",
        title: "Select College to Enroll",
      });
      return;
    }
    if (!student.program) {
      Swal.fire({
        icon: "warning",
        title: "Select Program to Enroll",
      });
      return;
    }
    if (student.course.length < 1) {
      Swal.fire({
        icon: "warning",
        title: "Select Course to Enroll",
      });
      return;
    }
    setLoading(true);
    await dispatch(
      enrollStudent({ student: student.student, courses: student.course })
    );
    setModal(false);
    setStudent(initialState);
    setLoading(false);
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
      <Modal.Header>
        <Modal.Title>Enroll Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-12 mt-2">
            <Select
              cacheOptions
              options={
                Array.isArray(students)
                  ? students.map((stud) => {
                      const name = toCapitalized(
                        `${stud.firstname} ${stud.middlename} ${stud.lastname}`
                      );
                      return {
                        value: stud._id,
                        label: toCapitalized(`${name} ( ${stud.student_num} )`),
                      };
                    })
                  : []
              }
              placeholder="Select Student"
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(e) => {
                setStudent((prev) => {
                  return { ...prev, student: e.value };
                });
              }}
            />
          </div>
          <div className="col-md-12 w-100 mt-3">
            <TextField
              className="w-100"
              id="standard-select-currency"
              select
              label="College"
              value={student.college}
              onChange={(e) => {
                setStudent((prev) => {
                  return {
                    ...prev,
                    college: e.target.value,
                    program: null,
                    course: [],
                  };
                });
              }}
              helperText="Please select College"
              variant="standard"
            >
              {colleges.map((college) => (
                <MenuItem key={college._id} value={college}>
                  {college.college}
                </MenuItem>
              ))}
            </TextField>
          </div>

          {student.college ? (
            <div className="col-md-12 w-100 mt-3">
              <TextField
                className="w-100"
                select
                label={toCapitalized(
                  `${student.college.college} Offered Program`
                )}
                value={student.program}
                onChange={(e) => {
                  setStudent((prev) => {
                    return { ...prev, program: e.target.value, course: [] };
                  });
                }}
                helperText={toCapitalized(
                  `Please select ${student.college.college} Offered Program`
                )}
                variant="standard"
              >
                {programs.map((prog) => {
                  if (prog.college._id === student.college._id) {
                    return (
                      <MenuItem key={prog._id} value={prog}>
                        {prog.program} ({" "}
                        <span className="fw-bold"> {prog.prog_code}</span> )
                      </MenuItem>
                    );
                  }
                  return null;
                })}
              </TextField>
            </div>
          ) : null}
          {student.program ? (
            <div className="col-md-12 w-100 mt-3">
              <Select
                cacheOptions
                options={
                  Array.isArray(student.program.courses)
                    ? student.program.courses.map((course) => {
                        return {
                          value: course._id,
                          label: `${course.course}  (  ${course.course_code}  )`,
                        };
                      })
                    : []
                }
                isMulti
                placeholder="Select Course"
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(e) => {
                  setStudent((prev) => {
                    return { ...prev, course: e };
                  });
                  console.log(e);
                }}
              />
            </div>
          ) : null}
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

export default Enroll;
