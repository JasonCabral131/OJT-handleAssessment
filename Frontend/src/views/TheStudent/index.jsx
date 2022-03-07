import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";

import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Alert from "@mui/material/Alert";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import "./style.scss";
import { useSelector } from "react-redux";
import TheTableHeading from "../../reusable/TheTableHeading";
import { toCapitalized, calculateAge, formatDate } from "../../reusable";
import EditIcon from "@mui/icons-material/Edit";

import AddStudent from "./AddStudent";
import UpdateStudent from "./UpdateStudent";

const TablePaginationActions = (props) => {
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
};

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const TheStudent = () => {
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

  return (
    <Paper>
      <TheTableHeading
        title={"TS University Student List"}
        search={search}
        setSearch={setSearch}
        setModal={setModalAdd}
      />
      <TableContainer
        component={Paper}
        style={{ padding: "10px" }}
        sx={{ maxHeight: 440 }}
      >
        <Table stickyHeader aria-label="custom pagination table">
          <TableHead>
            <TableRow>
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
                  <TableRow key={row.name}>
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
