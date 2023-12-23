import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/StudentComponent/Navbar";

const Admin = () => {
  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
};

export default Admin;