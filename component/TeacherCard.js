import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import styles from "../styles/TeacherCard.module.css";

function TeacherCard(props) {
  const { name, picture, profile, dateEmployed } = props;
  return (
    <div className={styles.avatar}>
      <Avatar
        alt={name}
        src={`/${picture}`}
        sx={{ width: 70, height: 70 }}
        children={`${name.split(" ")[0][0]}${
          name.split(" ")[1] ? name.split(" ")[1][0] : ""
        }`}
      />
      <div className={styles.content}>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          component="div"
          className={styles.text}
        >
          {profile}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          component="div"
          className={styles.date}
        >
          <div>Date Employed</div> <div>{dateEmployed}</div>
        </Typography>
      </div>
    </div>
  );
}
export default TeacherCard;
