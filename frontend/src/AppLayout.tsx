import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">  
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
    </div>
  </div>
  
  );
}
