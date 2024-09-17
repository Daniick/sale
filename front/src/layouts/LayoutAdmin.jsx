import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useMyContext } from "../pages/services/Context";

const LayoutAdmin = () => {
  const { user } = useMyContext();
  // console.log(user);

  return (
    <div className="grid min-h-screen grid-cols-1 xl:grid-cols-6">
      {!user && <Navigate to="/main" />}
      <Sidebar />
      <div className="xl:col-span-5">
        <Header />
        <div className="h-[90vh] overflow-y-scroll px-8 pt-[12px] bg-slate-700 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
