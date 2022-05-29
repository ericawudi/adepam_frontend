import Link from "next/link";

import Dashboard from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import styles from "../styles/Routes.module.css";

function Routes(props) {
  return (
    <List>
      <Link href="/">
        <ListItem disablePadding className={styles.main}>
          <ListItemButton onClick={props.handleDrawerToggle}>
            <ListItemIcon>
              <Dashboard className={styles.icons} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link href="/student">
        <ListItem disablePadding className={styles.main}>
          <ListItemButton onClick={props.handleDrawerToggle}>
            <ListItemIcon>
              <SchoolIcon className={styles.icons} />
            </ListItemIcon>
            <ListItemText primary="Student" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link href="/teacher">
        <ListItem disablePadding className={styles.main}>
          <ListItemButton onClick={props.handleDrawerToggle}>
            <ListItemIcon>
              <AdminPanelSettingsIcon className={styles.icons} />
            </ListItemIcon>
            <ListItemText primary="Teacher" />
          </ListItemButton>
        </ListItem>
      </Link>

      <Link href="/procurement">
        <ListItem disablePadding className={styles.main}>
          <ListItemButton onClick={props.handleDrawerToggle}>
            <ListItemIcon>
              <PrecisionManufacturingIcon className={styles.icons} />
            </ListItemIcon>
            <ListItemText primary="Procurement" />
          </ListItemButton>
        </ListItem>
      </Link>
    </List>
  );
}

export default Routes;
