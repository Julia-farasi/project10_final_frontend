import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div
      // className="flex flex-col min-h-screen text-white bg-no-repeat bg-top bg-cover"
      className="flex flex-col min-h-screen bg-cover bg-no-repeat bg-center bg-[#014325]"
      // style={{
      //   backgroundImage: "url('/MindmoneyBackground3.png')", // ✅ kein /public nötig // MindmoneyBackground3.png //MindMoneyBild2//BildTest5
      // }}
    >
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
