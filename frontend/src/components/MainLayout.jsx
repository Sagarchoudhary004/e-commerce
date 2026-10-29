import { Outlet } from "react-router-dom";
import Header from "../pages/Header";
import Sidebar from "./Sidebar";
import Products from "../pages/Products";


export default function MainLayout() {
  return (
    <div>
        <Header/>
        
        <div className="flex">
            <Sidebar/>
            <main   >
            <Outlet/>
            </main>
        </div>
    </div>
  )
}
