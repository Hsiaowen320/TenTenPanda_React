import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import BackendHeader from "../components/BackendHeader";

function BackendLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <ScrollToTop />
      <BackendHeader />
      <main className="flex-grow-1 bg-neutral-20">
        <Outlet />
      </main>
      {/* <footer className="text-center">
        <div className="py-9 py-lg-6 fs-T-S">
          <p>B-3 甜甜熊貓 ©2025 All Rights Reserved</p>
        </div>
      </footer> */}
    </div>
  );
}

export default BackendLayout;
