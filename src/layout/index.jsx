import { useState } from "react";
import RouteComponent from "../routes";
import "./style.scss"

const Layout = () => {
  const [infoState,setInfoState]=useState({
    is_login:false,
  })
  
  return (
    <div className={infoState?.is_login?"budget_app_screen":"budget_login_screen"}>
      <RouteComponent/>
    </div>
  )
}

export default Layout;