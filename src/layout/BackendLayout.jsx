import { Link, Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import BackendHeader from "../components/BackendHeader";

function BackendLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <ScrollToTop />
      <BackendHeader />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <footer className="mt-16 mt-lg-10 text-center">
        <div className="pt-4 pb-5 pt-lg-6 pb-lg-8 fs-T-S">
          <p>B-3 甜甜熊貓 ©2025 All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default BackendLayout;
