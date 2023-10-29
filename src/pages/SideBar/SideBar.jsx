import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

function SideBar(props) {
  if (localStorage.getItem("token") === "") return <></>;

  return (
    <div>
      사이드바
      <Outlet />
    </div>
  );
}

export default SideBar;
