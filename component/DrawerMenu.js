import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import { useRouter } from "next/router";
import Header from "./header";
import Loading from "./Loading";
import style from "../styles/Drawer.module.css";
import Routes from "./Routes";

const drawerWidth = 240;

function DrawerMenu({ children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [modalState, setModalState] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`);
      setModalState(true);
    };
    const handleStop = () => {
      console.log("done");
      setModalState(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //   links on side navbar
  const drawer = (
    <div>
      <div className={style.schoolName}>Adepam</div>
      <Routes handleDrawerToggle={handleDrawerToggle} />
      <Divider />
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Header title={"props.titlsde"} handleDrawerToggle={handleDrawerToggle} />

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          PaperProps={{
            sx: {
              backgroundColor: "#12005e",
              //   backgroundColor: "#7c43bd",
              color: "#ffffff",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          PaperProps={{
            sx: {
              backgroundColor: "#12005e",
              //   backgroundColor: "#7c43bd",
              color: "#ffffff",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {modalState ? <Loading modalState={modalState} /> : children}
      </Box>
    </Box>
  );
}

export default DrawerMenu;
