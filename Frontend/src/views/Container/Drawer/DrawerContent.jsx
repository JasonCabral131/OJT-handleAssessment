import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiBuildingHouse } from "react-icons/bi";

import logo from "./../../../assets/logo.png";
import Avatar from "@mui/material/Avatar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import MuiDrawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { ImUserTie } from "react-icons/im";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BiUserPin } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
import { AiOutlineReconciliation } from "react-icons/ai";
const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerContent = ({ open, setOpen }) => {
  const theme = useTheme();
  const history = useHistory();
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
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
            src={logo}
            style={{ marginRight: "5px" }}
          />{" "}
          Telmo Solution{" "}
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItemButton
          key={Math.random()}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
          onClick={() => {
            history.push("/tl-university/dashboard");
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <AiOutlineDashboard />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        <ListItemButton
          key={Math.random()}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
          onClick={() => {
            history.push("/tl-university/student");
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <ImUserTie />
          </ListItemIcon>
          <ListItemText primary={"Student"} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>

        <ListItemButton
          key={Math.random()}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
          onClick={() => {
            history.push("/tl-university/college");
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <BiBuildingHouse />
          </ListItemIcon>
          <ListItemText primary={"COLLEGE"} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        <ListItemButton
          key={Math.random()}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
          onClick={() => {
            history.push("/tl-university/programs");
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <AiOutlineReconciliation />
          </ListItemIcon>
          <ListItemText primary={"Programs"} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        <ListItemButton
          key={Math.random()}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
          onClick={() => {
            history.push("/tl-university/enrollment");
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <BiUserPin />
          </ListItemIcon>
          <ListItemText
            primary={" Student Information"}
            sx={{ opacity: open ? 1 : 0 }}
          />
        </ListItemButton>
        <ListItemButton
          key={Math.random()}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
          onClick={() => {
            history.push("/tl-university/admin");
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <RiAdminFill />
          </ListItemIcon>
          <ListItemText primary={"Admin"} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </List>
      <Divider />
    </Drawer>
  );
};

export default DrawerContent;
