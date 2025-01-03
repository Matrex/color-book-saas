import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function WebsiteLayout() {
  return (
    <div className="container mx-auto mb-14 px-5">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
