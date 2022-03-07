import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import TheTableHeading from "../../reusable/TheTableHeading";
import CreateProgram from "./CreateProgram";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import { toCapitalized } from "../../reusable";
import Alert from "@mui/material/Alert";
import UpdateProgram from "./UpdateProgram";
import Collapse from "@mui/material/Collapse";
import Courses from "./Courses";
import { getPrograms } from "../../redux/actions";
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

const Rows = ({ setProgram, setModalUpdate, row }) => {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <TableRow key={row._id}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{`${row.prog_code}`}</TableCell>
        <TableCell>{toCapitalized(`${row.program}`)}</TableCell>
        <TableCell align="left">
          {toCapitalized(`${row.college.college}`)}{" "}
          <span className="fw-bold"> ( {row.college.abreviation} )</span>
        </TableCell>
        <TableCell align="left">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => {
              setModalUpdate(true);
              setProgram({ ...row, college_id: row.college._id });
            }}
            color="info"
          >
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Paper sx={{ marginTop: 1, marginBottom: 1 }} className="w-100">
              <Courses program={row} />
            </Paper>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
const TheProgram = () => {
  const dispatch = useDispatch();
  const { programs } = useSelector((state) => state.program);
  const [search, setSearch] = React.useState("");
  const [modalAdd, setModalAdd] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [program, setProgram] = React.useState(null);
  const [modalUpdate, setModalUpdate] = React.useState(false);
  // Avoid a layout jump when reaching the last page with empty rows.
  const showPrograms = () => {
    return programs.map((data) => {
      try {
        if (
          data.prog_code
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          data.program
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          data.description
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          data.college.college
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          data.college.abreviation
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase())
        ) {
          return data;
        }
        return null;
      } catch (e) {
        return null;
      }
    });
  };
  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            showPrograms().filter((data) => data !== null).length
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
    dispatch(getPrograms());
    // eslint-disable-next-line
  }, []);

  return (
    <Paper>
      <TheTableHeading
        title={"TS University Offer Program List"}
        search={search}
        setSearch={setSearch}
        setModal={setModalAdd}
      />
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="custom pagination table sticky ">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">Abreviation</TableCell>
              <TableCell align="left">Program</TableCell>
              <TableCell align="left">College</TableCell>
              <TableCell align="left">Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? showPrograms().slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : showPrograms()
            ).map((row) => {
              if (row) {
                return (
                  <Rows
                    key={row._id}
                    setModalUpdate={setModalUpdate}
                    setProgram={setProgram}
                    row={row}
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
      {showPrograms().filter((data) => data !== null).length < 1 ? (
        <Alert severity="error" className="align-center">
          No Program Data Found
        </Alert>
      ) : null}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        colSpan={3}
        count={showPrograms().filter((data) => data !== null).length}
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
      <CreateProgram modal={modalAdd} setModal={setModalAdd} />
      <UpdateProgram
        program={program}
        setProgram={setProgram}
        modal={modalUpdate}
        setModal={setModalUpdate}
      />
    </Paper>
  );
};

export default TheProgram;
