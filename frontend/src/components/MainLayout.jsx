import { Outlet } from "react-router-dom";
import Header from "../pages/Header";
import Sidebar from "./Sidebar";


export default function MainLayout() {
  return (
    <div>
        <Header/>
        <div className="flex">
            <Sidebar/>
            <Outlet/>
        </div>
    </div>
  )
}
