import React from "react";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import CloseIcon from "@mui/icons-material/Close";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
const TheTableHeading = ({ search, setSearch, title, setModal, add }) => {
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="card-heading">
      <Typography
        variant="h6"
        component="div"
        sx={{
          flexGrow: 1,
        }}
      >
        {title}
      </Typography>
      <div className="search-area">
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Search</InputLabel>
          <Input
            id="standard-adornment-password"
            type={"text"}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setSearch("");
                  }}
                  onMouseDown={handleMouseDownPassword}
                >
                  {search.length > 0 ? <CloseIcon /> : null}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {!add ? (
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => {
              setModal(true);
            }}
          >
            <AddBoxIcon fontSize="large" />
          </IconButton>
        ) : null}
      </div>
    </div>
  );
};

export default TheTableHeading;
