/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppLogo from "@assets/images/logo-white.png";
import userIcon from "@assets/images/matters/userprofilepic.jpg";
import Header from "@components/header";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import { Typography } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import "@styles/scss/layouts/sidebar.scss";
import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NavigateFunction,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { logout } from "src/redux/slice/authSlice";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  isDrawerOpen?: boolean;
}

const drawerWidth = 240;
const openedMixin = (theme: any) => ({
  width: drawerWidth,
  backgroundColor: "black",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: any) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "black",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  minHeight: "80px !important",

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

//appbar means the header component based on the drawer width it takes space
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open, isDrawerOpen }: any) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#FFFFFF",
  minHeight: "80px",
  width: isDrawerOpen ? "100%" : "85%",
  top: 0,
  left: isDrawerOpen ? "68px" : "242px",
  right: 0,
  boxShadow: "0px 4px 4px 0px #0000001F",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    [theme.breakpoints.down("sm")]: {
      width: `100%`,
    },
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }: any) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state: any) => state.login?.userInfo);
  const { firstName } = userName?.userInfo;
  const [open, setOpen] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectField, setSelectField] = useState<boolean>(false);
  const location = useLocation();
  const { pathname } = location;

  const handleDrawerOpen = () => {
    setOpen((prev) => !prev);
  };

  const adminAccess = [
    {
      title: "Edit Profile",
      value: "Edit Profile",
    },
    {
      title: "Change Password",
      value: "Change Password",
    },
    {
      title: "Log Out",
      value: "Log Out",
      handleFunction: () => {
        dispatch(logout());
        navigate("/");
      },
    },
  ];
  const selectMode = useRef(null);
  const sideBarKeys = [
    {
      title: "Dashboard",
      url: "dashboard",
      icon: <GridViewRoundedIcon />,
    },
    {
      title: "Matters",
      url: "matters",
      icon: <FolderRoundedIcon />,
    },
    {
      title: "Reports",
      url: "reports",
      icon: <SummarizeRoundedIcon />,
    },
    {
      title: "Settings",
      url: "settings",
      icon: <SettingsRoundedIcon />,
    },
  ];

  const displayedUserName =
    firstName?.length > 9
      ? firstName?.charAt(0).toUpperCase() + firstName?.slice(1, 9) + "..."
      : firstName?.charAt(0).toUpperCase() + firstName?.slice(1, 9);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} isDrawerOpen={isDrawerOpen}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "80px !important",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => {
                handleDrawerOpen();
                setIsDrawerOpen(!isDrawerOpen);
              }}
              edge="start"
              sx={{
                marginRight: 10,
                color: "black",
                "&:hover": {
                  background: "none",
                },
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <MenuIcon />
                <Header isDrawerOpen={isDrawerOpen} />
              </div>
            </IconButton>
          </Box>
          <Box
            sx={{
              color: "#000000",
              cursor: "pointer",
              marginRight: "60px",
              width: "15%",
              position: "relative",
            }}
          >
            <div
              ref={selectMode}
              className={`sidebar-dropdown ${selectField ? "active" : ""}`}
              onMouseEnter={() => setSelectField(true)}
              onMouseLeave={() => setSelectField(false)}
            >
              <span className="tooltip-icon">
                <img src={userIcon} alt="user" className="user-icon" />
              </span>
              {displayedUserName}
              <span className="left-icon"></span>
              <span className="right-icon"></span>
              <div className="items">
                {adminAccess.map((item, index) => (
                  <span
                    key={`id${index}`}
                    data-value={`${item.title}`}
                    onClick={item.handleFunction}
                  >
                    {item.title}
                  </span>
                ))}
              </div>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        {/* drawer open content place here */}
        <DrawerHeader sx={{ minHeight: "80px !important" }}></DrawerHeader>
        <Divider />
        <List>
          {sideBarKeys.map((parentItem, index) => (
            <Fragment key={`sidebar-${index}`}>
              {index === 0 && !isDrawerOpen ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignSelf: "center",
                      padding: 14,
                      marginRight: 40,
                      marginTop: -80,
                    }}
                  >
                    <div>
                      <img
                        src={AppLogo}
                        alt="logo doesn't exist"
                        style={{
                          height: 40,
                          width: 50,
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <div>
                      <Typography
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "24px",
                          fontWeight: "700",
                          lineHeight: "40.2px",
                          color: "#ffffff",
                        }}
                      >
                        themis.AI
                      </Typography>
                    </div>
                  </div>
                  <Divider
                    component="li"
                    style={{
                      backgroundColor: "#ffffff",
                      marginTop: -5,
                      marginBottom: 25,
                    }}
                  />
                </>
              ) : index === 0 ? (
                <>
                  <div style={{ marginTop: -70 }}>
                    <img
                      src={AppLogo}
                      alt="logo doesn't exist"
                      style={{
                        height: 40,
                        width: 50,
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </>
              ) : null}
              <ListItem
                key={parentItem.title}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  onClick={() => navigate(`/${parentItem.url}`)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    color:
                      pathname === `/${parentItem.url}` ||
                      (pathname.startsWith(`/${parentItem.url}/`) &&
                        parentItem.url === "matters")
                        ? "#000000"
                        : "#ffffff",
                    borderLeft:
                      pathname === `/${parentItem.url}` ||
                      (pathname.startsWith(`/${parentItem.url}/`) &&
                        parentItem.url === "matters")
                        ? "5px solid #ffffff"
                        : "",
                    backgroundColor:
                      pathname === `/${parentItem.url}` ||
                      (pathname.startsWith(`/${parentItem.url}/`) &&
                        parentItem.url === "matters")
                        ? "#ffffff"
                        : "",
                    borderRadius: "25px",
                    transition: "all 0.3s ease-in",
                    "&:hover": {
                      backgroundColor:
                        pathname === `/${parentItem.url}` ||
                        (pathname.startsWith(`/${parentItem.url}/`) &&
                          parentItem.url === "matters")
                          ? "#ffffff"
                          : "",
                      color:
                        pathname === `/${parentItem.url}` ||
                        (pathname.startsWith(`/${parentItem.url}/`) &&
                          parentItem.url === "matters")
                          ? "#000000"
                          : "",
                    },
                  }}
                >
                  {parentItem.icon && (
                    <Box
                      sx={{
                        marginRight: 1,
                        marginTop:
                          pathname === `/${parentItem.url}` ||
                          (pathname.startsWith(`/${parentItem.url}/`) &&
                            parentItem.url === "matters")
                            ? 0.6
                            : "",
                        minWidth: "auto",
                        transform:
                          pathname === `/${parentItem.url}` ||
                          (pathname.startsWith(`/${parentItem.url}/`) &&
                            parentItem.url === "matters")
                            ? "translate3d(0px, 0px, 70px)"
                            : "",
                      }}
                    >
                      {parentItem.icon}
                    </Box>
                  )}
                  <Box className="flex-box"> </Box>
                  <ListItemText
                    primary={parentItem.title}
                    sx={{
                      opacity: open ? 1 : 0,
                      "& span": {
                        fontWeight: "600",
                        fontSize: "16px",
                        transition: "all 0.3s ease-in",
                        transform:
                          pathname === `/${parentItem.url}` ||
                          (pathname.startsWith(`/${parentItem.url}/`) &&
                            parentItem.url === "matters")
                            ? " translate3d(0px, 0px, 70px)"
                            : "",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Fragment>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <DrawerHeader sx={{ minHeight: "80px !important" }} />
        <Box>
          {/* {children} */}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
