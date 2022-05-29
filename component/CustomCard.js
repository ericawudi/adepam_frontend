import React from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import styles from "../styles/CustomCard.module.css";

function CustomCard(props) {
  const { name, picture, profile, dateEmployed, dateDesc } = props;
  return (
    <div className={styles.avatar}>
      <Avatar
        alt={name}
        src={picture}
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
          <div>{dateDesc}</div> <div>{dateEmployed}</div>
        </Typography>
      </div>
    </div>
  );
}
export default CustomCard;
