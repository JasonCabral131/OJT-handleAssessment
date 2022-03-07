import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toCapitalized } from "../../reusable/";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import { updateEnrollStudent } from "./../../redux/actions";
const UpdateEnroll = ({ modal, setModal, setEnroll, enroll }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.student);
  const { colleges } = useSelector((state) => state.college);

  const { programs } = useSelector((state) => state.program);
  const handleSave = async () => {
    if (enroll) {
      if (!enroll.student) {
        Swal.fire({
          icon: "warning",
          title: "Select Student",
        });
        return;
      }
      if (!enroll.college) {
        Swal.fire({
          icon: "warning",
          title: "Select College",
        });
        return;
      }
      if (!enroll.programs) {
        Swal.fire({
          icon: "warning",
          title: "Select Program",
        });
        return;
      }
      if (!enroll.course) {
        Swal.fire({
          icon: "warning",
          title: "Select Course",
        });
        return;
      }
      setLoading(false);
      Swal.fire({
        title: "Are You Sure?",
        text: `You Want to Update`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Update it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
        allowOutsideClick: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          console.log(enroll);
          setLoading(true);
          await dispatch(
            updateEnrollStudent({
              student: enroll.student.value,
              course: enroll.course.value,
              _id: enroll._id,
            })
          );
          setLoading(false);
          setModal(false);
          setEnroll(null);
        }
      });
      return;
    }
    Swal.fire({
      icon: "warning",
      text: "Failed to Update",
    });
    return;
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
        <Modal.Title>Update Enrolled Data</Modal.Title>
      </Modal.Header>
      {enroll ? (
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
                          label: toCapitalized(
                            `${name} ( ${stud.student_num} )`
                          ),
                        };
                      })
                    : []
                }
                placeholder="Select Student"
                className="basic-multi-select"
                classNamePrefix="select"
                value={enroll.student}
                onChange={(e) => {
                  setEnroll((prev) => {
                    return { ...prev, student: e };
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
                value={enroll.college}
                onChange={(e) => {
                  setEnroll((prev) => {
                    return {
                      ...prev,
                      college: e.target.value,
                      course: null,
                      programs: null,
                    };
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
            {enroll.college ? (
              <div className="col-md-12 mt-3">
                <TextField
                  className="w-100"
                  select
                  label={toCapitalized(
                    `${
                      colleges.filter((data) => data._id === enroll.college)[0]
                        .college
                    } Offered Program`
                  )}
                  helperText={toCapitalized(
                    `Please select ${
                      colleges.filter((data) => data._id === enroll.college)[0]
                        .college
                    } Offered Program`
                  )}
                  variant="standard"
                  value={enroll.programs}
                  onChange={(e) => {
                    setEnroll((prev) => {
                      return {
                        ...prev,
                        programs: e.target.value,
                        course: null,
                      };
                    });
                  }}
                >
                  {programs.map((prog) => {
                    if (prog.college._id === enroll.college) {
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
            {enroll.programs ? (
              <div className="col-md-12 w-100 mt-3">
                <Select
                  cacheOptions
                  options={
                    Array.isArray(enroll.programs.courses)
                      ? enroll.programs.courses.map((course) => {
                          return {
                            value: course._id,
                            label: `${course.course}  (  ${course.course_code}  )`,
                          };
                        })
                      : []
                  }
                  placeholder="Select Course"
                  className="basic-multi-select"
                  classNamePrefix="select"
                  value={enroll.course}
                  onChange={(e) => {
                    setEnroll((prev) => {
                      return { ...prev, course: e };
                    });
                    console.log(e);
                  }}
                />
              </div>
            ) : null}
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
          onClick={handleSave}
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

export default UpdateEnroll;
