import Link from "next/link";
// import {
//   Dashboard,
//   ,
//   ,
//   ,
// } from ""@mui/icons-material"";
import Dashboard from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";
import ManageAccounts from "@mui/icons-material/ManageAccounts";
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
      <Link href="/level">
        <ListItem disablePadding className={styles.main}>
          <ListItemButton onClick={props.handleDrawerToggle}>
            <ListItemIcon>
              <StarIcon className={styles.icons} />
            </ListItemIcon>
            <ListItemText primary="Level" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link href="/profile">
        <ListItem disablePadding className={styles.main}>
          <ListItemButton onClick={props.handleDrawerToggle}>
            <ListItemIcon>
              <ManageAccounts className={styles.icons} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
      </Link>
    </List>
  );
}

export default Routes;
