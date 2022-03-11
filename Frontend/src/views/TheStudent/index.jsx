import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Alert from "@mui/material/Alert";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import TheTableHeading from "../../reusable/TheTableHeading";
import { toCapitalized, calculateAge } from "../../reusable";

import AddStudent from "./AddStudent";
import UpdateStudent from "./UpdateStudent";
import { getStudents } from "../../redux/actions";
import EnrolledSubject from "./EnrolledSubject";
import TablePaginationActions from "./../../reusable/TheTPageAction";

const TheStudent = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.student);
  const [search, setSearch] = React.useState("");
  const [modalAdd, setModalAdd] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [student, setStudent] = React.useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  // Avoid a layout jump when reaching the last page with empty rows.
  const showStudent = () => {
    return students.map((data, index) => {
      const name = toCapitalized(
        `${data.firstname} ${data.middlename} ${data.lastname}`
      );
      const birthday = new Date(data.birthday).toLocaleDateString();
      const age = calculateAge(new Date(data.birthday));
      if (
        name.toLowerCase().includes(search.toLowerCase()) ||
        data.student_num.toString().includes(search.toLowerCase()) ||
        data.student_num.toString().includes(search.toLowerCase()) ||
        data.sex.toLowerCase().includes(search.toLowerCase()) ||
        data.sex.toLowerCase().includes(search.toLowerCase()) ||
        birthday.toLowerCase().includes(search.toLowerCase()) ||
        data.phone.toString().includes(search.toLowerCase()) ||
        data.email.toLowerCase().includes(search.toLowerCase()) ||
        age.toString().includes(search.toLowerCase())
      ) {
        return { ...data, name, birthday, no: index + 1, age };
      }
      return null;
    });
  };
  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            showStudent().filter((data) => data !== null).length
        )
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    dispatch(getStudents());
    // eslint-disable-next-line
  }, []);
  return (
    <Paper>
      <TheTableHeading
        title={"TS University Student List"}
        search={search}
        setSearch={setSearch}
        setModal={setModalAdd}
      />
      <TableContainer component={Paper} style={{ padding: "10px" }}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">#</TableCell>
              <TableCell align="center">Student Number</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Sex</TableCell>
              <TableCell align="center">Birthday</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">Phone Number</TableCell>

              <TableCell align="center">Email</TableCell>
              <TableCell align="center"> Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? showStudent().slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : showStudent()
            ).map((row, index) => {
              if (row) {
                return (
                  <EnrolledSubject
                    row={row}
                    key={row._id}
                    setModalUpdate={setModalUpdate}
                    setStudent={setStudent}
                    index={index}
                  />
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
      {showStudent().filter((data) => data !== null).length < 1 ? (
        <Alert severity="error" className="align-center">
          No Student Data Found
        </Alert>
      ) : null}

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        colSpan={3}
        count={showStudent().filter((data) => data !== null).length}
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
      <AddStudent modal={modalAdd} setModal={setModalAdd} />
      <UpdateStudent
        modal={modalUpdate}
        setModal={setModalUpdate}
        student={student}
        setStudent={setStudent}
      />
    </Paper>
  );
};

export default TheStudent;
