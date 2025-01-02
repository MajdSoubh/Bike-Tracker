import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const MainLayout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
