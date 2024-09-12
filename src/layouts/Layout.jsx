import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <Header />
      <div className="px-[162px]">
        <Outlet />
      </div>
    </div>
  );
}
