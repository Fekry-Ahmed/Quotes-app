import React from "react";
import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

const Layout = function (props) {
  return (
    <>
      <MainNavigation></MainNavigation>
      <main className={classes.main}>{props.children}</main>
    </>
  );
};

export default Layout;
