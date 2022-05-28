import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <h2>Posts Table</h2>
      <Outlet />
    </div>
  );
}
