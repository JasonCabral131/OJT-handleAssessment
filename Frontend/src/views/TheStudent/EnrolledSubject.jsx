import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import { formatDate } from "../../reusable";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import TheTableHeading from "../../reusable/TheTableHeading";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TablePaginationActions from "../../reusable/TheTPageAction";
import Alert from "@mui/material/Alert";
import moment from "moment";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
const EnrolledSubject = ({ row, setModalUpdate, setStudent, index }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - row.enrolled.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const showEnrolled = () => {
    try {
      return row.enrolled?.map((data) => {
        try {
          const date = moment(data.createdAt).format("YYYY-MM-DD hh:mm:ss");
          if (
            data.id.toString().includes(search.toLowerCase()) ||
            date.toLowerCase().includes(search.toLowerCase())
          ) {
            return { ...data, date };
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
  return (
    <React.Fragment>
      <TableRow key={row.name}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" align="center">
          {index + 1}
        </TableCell>
        <TableCell component="th" align="center">
          {row.student_num}
        </TableCell>
        <TableCell component="th" align="center">
          {row.name}
        </TableCell>
        <TableCell component="th" align="center">
          {row.sex}
        </TableCell>
        <TableCell component="th" align="center">
          {row.birthday}
        </TableCell>
        <TableCell component="th" align="center">
          {row.age}
        </TableCell>
        <TableCell component="th" align="center">
          {row.phone}
        </TableCell>
        <TableCell component="th" align="center">
          {row.email}
        </TableCell>
        <TableCell component="th" align="center">
          <div className="d-flex">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => {
                setModalUpdate(true);
                setStudent({
                  ...row,
                  birthday: formatDate(row.birthday),
                });
              }}
            >
              <EditIcon />
            </IconButton>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Paper sx={{ marginTop: 1, marginBottom: 1 }} className="w-100">
              <TheTableHeading
                add={true}
                title={`${row.name} Enrolled Courses`}
                search={search}
                setSearch={setSearch}
              />
              <TableContainer
                component={Paper}
                style={{ padding: "10px" }}
                sx={{ maxHeight: 440 }}
              >
                <Table stickyHeader aria-label="custom pagination table">
                  <TableHead>
                    <TableRow>
                      <TableCell align={"center"} component="th">
                        ID
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

                            <TableCell align="center">
                              {row?.course?.program?.college.abreviation}
                            </TableCell>
                            <TableCell align="center">
                              {row?.course?.program?.prog_code}
                            </TableCell>
                            <TableCell align="center">
                              {row?.course?.course_code}
                            </TableCell>
                            <TableCell align="center">
                              {row?.course?.course}
                            </TableCell>
                            <TableCell align="center">{row?.date}</TableCell>
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
            </Paper>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default EnrolledSubject;
