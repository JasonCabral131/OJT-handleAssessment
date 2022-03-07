import React, { useEffect, useState } from "react";

import TheTableHeading from "../../reusable/TheTableHeading";
import CreateAdmin from "./Create";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useDispatch, useSelector } from "react-redux";
import { toCapitalized } from "../../reusable";
import moment from "moment";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import Swal from "sweetalert2";
import { deleteAdminData, getAdmins } from "../../redux/actions";
import UpdateAdminData from "./Update";
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

const Admin = () => {
  const dispatch = useDispatch();
  const { admins } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [modalAdd, setModalAdd] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [admin, setAdmin] = useState(false);
  const showAdmin = () => {
    try {
      return admins.map((data) => {
        const name = toCapitalized(
          `${data.firstname} ${data.middlename} ${data.lastname}`
        );
        const date = moment(data.createdAt).format("MM-DD-YYYY , hh:mm:ss A");
        if (
          name.toLowerCase().includes(search.toLowerCase()) ||
          data.email.toLowerCase().includes(search.toLowerCase()) ||
          data.date.toLowerCase().includes(search.toLowerCase())
        ) {
          return { ...data, date, name };
        }
        return null;
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
            showAdmin().filter((data) => data !== null).length
        )
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteAdmin = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to Delete? `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteAdminData(_id));
      }
    });
  };
  useEffect(() => {
    dispatch(getAdmins);
    // eslint-disable-next-line
  }, []);

  return (
    <Paper>
      <TheTableHeading
        setModal={setModalAdd}
        search={search}
        setSearch={setSearch}
        modal={modalAdd}
        title={"Administration"}
      />
      <TableContainer component={Paper}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell align={"center"}>No.</TableCell>
              <TableCell align={"center"}>Profile</TableCell>
              <TableCell align={"center"}>Name</TableCell>
              <TableCell align={"center"}>Email</TableCell>
              <TableCell align={"center"}>Created At</TableCell>
              <TableCell align={"center"}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? showAdmin()
                  .filter((data) => data !== null)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : showAdmin().filter((data) => data !== null)
            ).map((row, index) => (
              <TableRow key={Math.random().toString()}>
                <TableCell component="th">{index + 1}</TableCell>
                <TableCell align="center">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      alt={`${row?.name}`}
                      src={row?.profile?.url}
                      sx={{ width: 60, height: 60 }}
                    />
                  </div>
                </TableCell>
                <TableCell align="center">{row?.name}</TableCell>
                <TableCell align="center">{row?.email}</TableCell>
                <TableCell align="center">{row?.date}</TableCell>
                <TableCell align="center">
                  <div className="d-flex text-center justify-content-center align-items-center">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setModalUpdate(true);
                        setAdmin(row);
                      }}
                      color="info"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        deleteAdmin(row._id);
                      }}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {showAdmin().filter((data) => data !== null).length < 1 ? (
        <Alert severity="error" className="align-center">
          No Admin Data Found
        </Alert>
      ) : null}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        colSpan={3}
        count={showAdmin().filter((data) => data !== null).length}
        rowsPerPage={rowsPerPage}
        page={page}
        component={"div"}
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
      <CreateAdmin modal={modalAdd} setModal={setModalAdd} />
      <UpdateAdminData
        modal={modalUpdate}
        setModal={setModalUpdate}
        userInfo={admin}
        setUserInfo={setAdmin}
      />
    </Paper>
  );
};

export default Admin;
