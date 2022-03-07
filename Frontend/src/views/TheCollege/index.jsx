import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import TheTableHeading from "../../reusable/TheTableHeading";
import CreateCollege from "./CreateCollege";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
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
import { useDispatch, useSelector } from "react-redux";
import TableHead from "@mui/material/TableHead";
import EditIcon from "@mui/icons-material/Edit";
import UpdateCollege from "./UpdateCollege";
import { toCapitalized } from "./../../reusable/index";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getColleges } from "../../redux/actions/college.action";
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

const Rows = ({ row, setModalUpdate, setCollege }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow key={Math.random().toString()}>
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
          {toCapitalized(row.college)}
        </TableCell>
        <TableCell component="th" align="center">
          {row.abreviation.toString().toUpperCase()}
        </TableCell>
        <TableCell component="th" align="center">
          {toCapitalized(row.description)}
        </TableCell>
        <TableCell component="th" align="center">
          {row.date}
        </TableCell>
        <TableCell component="th" align="center">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => {
              setModalUpdate(true);
              setCollege(row);
            }}
          >
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Paper
              sx={{ marginTop: 1, marginBottom: 1, padding: 1 }}
              className="w-100"
            >
              <Typography variant="h6" gutterBottom component="div">
                {row.college} Offered Program
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Abreviation</TableCell>
                    <TableCell>Program</TableCell>
                    <TableCell align="right">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.programs.map((historyRow) => (
                    <TableRow key={Math.random().toString()}>
                      <TableCell component="th" scope="row">
                        {historyRow.prog_code}
                      </TableCell>
                      <TableCell>{historyRow.program}</TableCell>
                      <TableCell align="right">
                        {historyRow.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
const TheCollege = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");
  const { colleges } = useSelector((state) => state.college);
  const [modalAdd, setModalAdd] = React.useState(false);
  const [modalUpdate, setModalUpdate] = React.useState(false);
  const [college, setCollege] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  useEffect(() => {
    dispatch(getColleges());
    // eslint-disable-next-line
  }, []);

  const showColleges = () => {
    return colleges.map((data, index) => {
      const date = new Date(data.createdAt).toLocaleString();
      if (
        data.college.toLowerCase().includes(search.toLowerCase()) ||
        data.abreviation.toLowerCase().includes(search.toLowerCase()) ||
        data.description.toLowerCase().includes(search.toLowerCase())
      ) {
        return { ...data, date };
      }
      return null;
    });
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            showColleges().filter((data) => data !== null).length
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
        title={"TS University College List"}
        search={search}
        setSearch={setSearch}
        setModal={setModalAdd}
      />
      <TableContainer component={Paper}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell component="th" align="center">
                College
              </TableCell>
              <TableCell component="th" align="center">
                Abreviation
              </TableCell>
              <TableCell component="th" align="center">
                Description
              </TableCell>
              <TableCell component="th" align="center">
                Created At
              </TableCell>
              <TableCell component="th" align="center">
                Update
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? showColleges().slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : showColleges()
            ).map((row, index) => {
              if (row) {
                return (
                  <Rows
                    key={row._id}
                    row={row}
                    setCollege={setCollege}
                    setModalUpdate={setModalUpdate}
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
      {showColleges().filter((data) => data !== null).length < 1 ? (
        <Alert severity="error" className="align-center">
          No College Data Found
        </Alert>
      ) : null}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        colSpan={3}
        count={showColleges().filter((data) => data !== null).length}
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
      <CreateCollege modal={modalAdd} setModal={setModalAdd} />
      <UpdateCollege
        modal={modalUpdate}
        setModal={setModalUpdate}
        college={college}
        setCollege={setCollege}
      />
    </Paper>
  );
};

export default TheCollege;
