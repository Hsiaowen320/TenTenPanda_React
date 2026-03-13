import { useNavigate, Link } from "react-router-dom";
import logo from "@/assets/images/logo.webp";

const BackendHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="navbar flex-md-nowrap p-0 mb-8">
      <div className="mb-6 d-lg-flex flex-lg-row justify-content-lg-center align-items-lg-center">
        <img src={logo} alt="TenTen-Logo" className="mb-4 ms-4 mt-6 me-4 me-lg-10 ms-lg-10 mt-lg-8 px-lg-8" />
      </div>
      <Link
        className="navbar-brand ms-8 px-3 fs-6 fs-lg-4 fw-bold"
        to="/admin"
      >
        甜甜熊貓 | 管理後台系統
      </Link>

      <div className="navbar-nav w-100 d-flex flex-row justify-content-end px-3">
        <div className="nav-item text-nowrap d-flex align-items-center">
          <span className="me-10">管理員：Admin 您好</span>
          <button
            className="btn btn-outline-primary-80 btn-sm"
            onClick={handleLogout}
          >
            登出
          </button>
        </div>
      </div>
    </header>
  );
};

export default BackendHeader;
