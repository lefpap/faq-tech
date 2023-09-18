import NavBar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
