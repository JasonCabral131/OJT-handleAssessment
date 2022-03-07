import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useDispatch, useSelector } from "react-redux";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";

import logox from "./../../../assets/logo.jpg";
import { AiOutlineLogout } from "react-icons/ai";

import { logout } from "../../../redux/actions/index";
import DrawerContent from "../Drawer/DrawerContent";
import Profile from "./UpdateAdmin/Profile";
import ChangePassword from "./UpdateAdmin/ChangePassword";
const drawerWidth = 240;
const initialState = {
  oldpass: "",
  newPass: "",
  confirmPass: "",
};
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Navbar = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalProfile, setModalProfile] = useState(false);
  const [password, setPasssword] = useState(initialState);
  const [modalChangePass, setModalChangePass] = useState(false);
  const [userInfo, setUserInfo] = useState(user);
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    setUserInfo(user);
    // eslint-disable-next-line
  }, [user]);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {open ? null : (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              alt={Math.random().toString()}
              src={logox}
              style={{ marginRight: "5px" }}
            />{" "}
            TS UNIVERSITY{" "}
          </Typography>

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {user ? (
                <Avatar alt={user.lastname} src={user.profile.url} />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              style={{ marginTop: "50px" }}
            >
              <MenuItem
                onClick={() => {
                  setModalProfile(true);
                  setAnchorEl(null);
                  setUserInfo(user);
                  setModalChangePass(false);
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setModalChangePass(true);
                  setAnchorEl(null);
                  setModalProfile(false);
                  setPasssword(initialState);
                }}
              >
                Change Password
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(logout());
                  setAnchorEl(null);
                }}
              >
                <Typography
                  variant="p"
                  component="div"
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AiOutlineLogout size={16} />{" "}
                  <span className="ms-1">Logout</span>
                </Typography>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <DrawerContent open={open} setOpen={setOpen} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {props.children}
      </Box>
      <Profile
        setModal={setModalProfile}
        modal={modalProfile}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      <ChangePassword
        password={password}
        setPasssword={setPasssword}
        modal={modalChangePass}
        setModal={setModalChangePass}
      />
    </Box>
  );
};

export default Navbar;
