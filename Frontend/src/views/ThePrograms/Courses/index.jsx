import React, { useState } from "react";
import TheTableHeading from "./../../../reusable/TheTableHeading";
import Paper from "@mui/material/Paper";
import CreateCourse from "./CreateCourse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import IconButton from "@mui/material/IconButton";

import TableHead from "@mui/material/TableHead";
import { toCapitalized } from "./../../../reusable/";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import UpdateCourse from "./UpdateCourse";
import { useDispatch } from "react-redux";
import { deleteCourseProgram } from "../../../redux/actions";
import TablePaginationActions from "./.././../../reusable/TheTPageAction";
const Courses = ({ program }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");
  const [modalAdd, setModalAdd] = useState(false);
  const [course, setCourse] = useState(null);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const showCourse = () => {
    if (program) {
      return program.courses.map((data) => {
        try {
          const date = new Date(data.createdAt).toLocaleString();
          if (
            data.course_code
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            data.course
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            data.description
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            date.toString().toLowerCase().includes(search.toLowerCase())
          ) {
            return { ...data, date };
          }

          return null;
        } catch (e) {
          return null;
        }
      });
    }
    return [];
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            showCourse().filter((data) => data !== null).length
        )
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const deleteCourse = (id, name, data) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete this ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteCourseProgram({ id, course: data }));
      }
    });
  };
  return (
    <Paper>
      {program ? (
        <React.Fragment>
          <TheTableHeading
            search={search}
            setSearch={setSearch}
            setModal={setModalAdd}
            title={`${program.program} Underlying Courses`}
          />
          <Paper sx={{ padding: 1 }}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table sticky "
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell align="center">Course Code</TableCell>
                    <TableCell align="center">Course</TableCell>
                    <TableCell align="center">Course Description</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? showCourse().slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : showCourse()
                  ).map((row, index) => {
                    if (row) {
                      return (
                        <TableRow key={row.name}>
                          <TableCell component="th">{index + 1}</TableCell>
                          <TableCell align="right">{row.course_code}</TableCell>
                          <TableCell align="right">{row.course}</TableCell>
                          <TableCell align="right">
                            {toCapitalized(row.description)}
                          </TableCell>
                          <TableCell align="right">
                            {toCapitalized(row.date)}
                          </TableCell>
                          <TableCell align="center">
                            <div className="d-flex">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => {
                                  setModalUpdate(true);
                                  setCourse(row);
                                }}
                                color="info"
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => {
                                  deleteCourse(row._id, row.course, row);
                                }}
                                color="error"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    }
                    return null;
                  })}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {showCourse().filter((data) => data !== null).length < 1 ? (
              <Alert severity="error" className="align-center">
                No Course Data Found
              </Alert>
            ) : null}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={showCourse().filter((data) => data !== null).length}
              rowsPerPage={rowsPerPage}
              page={page}
              component="div"
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
            <CreateCourse
              modal={modalAdd}
              setModal={setModalAdd}
              program={program}
            />
            <UpdateCourse
              modal={modalUpdate}
              setModal={setModalUpdate}
              course={course}
              setCourse={setCourse}
              program={program}
            />
          </Paper>
        </React.Fragment>
      ) : null}
    </Paper>
  );
};

export default Courses;
