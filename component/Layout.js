import React from "react";
import Footer from "./Footer";
import styles from "../styles/Layout.module.css";
import Header from "./header";
import DrawerMenu from "./DrawerMenu";

function Layout({ children, title }) {
  return (
    <div className={styles.container}>
      <Header {...title} />
      <DrawerMenu>{children}</DrawerMenu>
      <Footer />
    </div>
  );
}

export default Layout;
