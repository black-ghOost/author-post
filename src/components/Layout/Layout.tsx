import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.main}>
      <h2>Medina Tech Assignment 2022</h2>
      <Outlet />
    </div>
  );
}
