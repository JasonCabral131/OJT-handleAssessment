import React, { useEffect, useState } from "react";

import TheTableHeading from "../../reusable/TheTableHeading";
import Enroll from "./Create/Enroll";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import { useDispatch, useSelector } from "react-redux";
import { toCapitalized } from "../../reusable";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { deleteEnrollStudent, getEnrollStudent } from "../../redux/actions";
import Alert from "@mui/material/Alert";
import UpdateEnroll from "./UpdateEnroll";
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const TheEnrollment = () => {
  const dispatch = useDispatch();
  const { programs } = useSelector((state) => state.program);
  const { enrolled } = useSelector((state) => state.student);
  const [search, setSearch] = useState("");
  const [modalAdd, setModalAdd] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [enroll, setEnroll] = useState(null);
  const [modalUpdate, setModalUpdate] = useState(false);
  const showEnrolled = () => {
    try {
      return enrolled.map((data) => {
        try {
          const date = moment(data.createdAt).format("YYYY-MM-DD hh:mm:ss");
          if (
            data.id.toString().includes(search.toLowerCase()) ||
            date.toLowerCase().includes(search.toLowerCase())
          ) {
            return { ...data, date };
          }
          if (typeof data.student_num === "object") {
            const name = toCapitalized(
              `${data.student_num.lastname}, ${data.student_num.firstname}`
            );
            if (
              name.toLowerCase().includes(search.toLowerCase()) ||
              data.student_num.student_num
                .toString()
                .toLowerCase()
                .includes(search.toLowerCase())
            ) {
              return { ...data, date };
            }
          }
          if (typeof data.course === "object") {
            if (
              data.course.course_code
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              data.course.course.toLowerCase().includes(search.toLowerCase()) ||
              data.course.program.prog_code
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              data.course.program.college.abreviation
                .toLowerCase()
                .includes(search.toLowerCase())
            ) {
              return { ...data, date };
            }
          }
          return null;
        } catch (e) {
          return null;
        }
      });
    } catch (e) {
      return [];
    }
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            showEnrolled().filter((d) => d !== null).length
        )
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteCourse = (id) => {
    Swal.fire({
      title: "Are You Sure?",
      text: `You Wont Revert this action!!!`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteEnrollStudent(id));
      }
    });
  };

  useEffect(() => {
    dispatch(getEnrollStudent());
    // eslint-disable-next-line
  }, []);

  return (
    <Paper>
      <TheTableHeading
        title="Student Enrollment Information"
        search={search}
        setSearch={setSearch}
        setModal={setModalAdd}
        modal={modalAdd}
      />
      <TableContainer component={Paper}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell align={"center"} component="th">
                ID
              </TableCell>
              <TableCell align={"center"} component="th">
                STUDENT #
              </TableCell>
              <TableCell align={"center"} component="th">
                NAME
              </TableCell>
              <TableCell align={"center"} component="th">
                COLLEGE
              </TableCell>
              <TableCell align={"center"} component="th">
                PROGRAM
              </TableCell>
              <TableCell align={"center"} component="th">
                COURSE_CODE
              </TableCell>
              <TableCell align={"center"} component="th">
                COURSE_NAME
              </TableCell>
              <TableCell align={"center"} component="th">
                DATE ENROLLED
              </TableCell>
              <TableCell align={"center"} component="th">
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? showEnrolled().slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : showEnrolled()
            ).map((row) => {
              if (row) {
                return (
                  <TableRow key={row._id}>
                    <TableCell component="th" align="center">
                      {row.id}
                    </TableCell>
                    <TableCell>{`${row.student_num?.student_num}`}</TableCell>
                    <TableCell align="center">
                      {toCapitalized(
                        `${row?.student_num?.lastname}, ${row?.student_num?.firstname}`
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {row?.course?.program?.college.abreviation}
                    </TableCell>
                    <TableCell align="center">
                      {row?.course?.program?.prog_code}
                    </TableCell>
                    <TableCell align="center">
                      {row?.course?.course_code}
                    </TableCell>
                    <TableCell align="center">{row?.course?.course}</TableCell>
                    <TableCell align="center">{row?.date}</TableCell>

                    <TableCell align="center">
                      <div className="d-flex">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            setModalUpdate(true);

                            const filterOutProg = programs.filter(
                              (data) => data._id === row?.course?.program._id
                            );
                            const name = toCapitalized(
                              `${row?.student_num?.firstname} ${row?.student_num?.middlename} ${row?.student_num?.lastname}`
                            );
                            setEnroll({
                              _id: row._id,
                              student: {
                                value: row?.student_num?._id,
                                label: toCapitalized(
                                  `${name} ( ${row?.student_num?.student_num} )`
                                ),
                              },
                              college: row?.course?.program?.college._id,
                              programs:
                                filterOutProg.length > 0
                                  ? filterOutProg[0]
                                  : null,
                              course: {
                                value: row?.course?._id,
                                label: `${row?.course?.course}  (  ${row?.course?.course_code}  )`,
                              },
                            });
                          }}
                          color="info"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            deleteCourse(row._id);
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
      {showEnrolled().filter((data) => data !== null).length < 1 ? (
        <Alert severity="error" className="align-center">
          No Enrolled Data Found
        </Alert>
      ) : null}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        colSpan={3}
        count={showEnrolled().filter((d) => d !== null).length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: {
            "aria-label": "rows per page",
          },
          native: true,
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
        component="div"
      />
      <Enroll modal={modalAdd} setModal={setModalAdd} />
      <UpdateEnroll
        modal={modalUpdate}
        setModal={setModalUpdate}
        setEnroll={setEnroll}
        enroll={enroll}
      />
    </Paper>
  );
};

export default TheEnrollment;
