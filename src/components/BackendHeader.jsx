import { useNavigate, Link } from "react-router-dom";
import logo from "@/assets/images/logo.webp";

const BackendHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="p-lg-8 p-3 containter-fluid bg-white">

      <div className="d-flex align-items-center justify-content-between">
        <div className="col-5 col-lg-2">
          {/* LOGO */}
          <div className="d-lg-flex d-block d-lg-none">
            <img src={logo} alt="TenTen-Logo" className="p-3 d-block d-lg-none" style={{ maxWidth: "150px" }}/>
          </div>
        </div>

        {/* 文字 */}
        <div className="col-2 col-lg-8 d-none d-lg-block">
          <Link
            className="ms-8 px-3 fs-6 fs-lg-4 fw-bold "
            to="/admin"
          >
            甜甜熊貓 | 管理後台系統
          </Link>
        </div>

        {/* 管理員與登出 */}
        <div className="col-2">
          <div className="w-100 d-flex flex-row justify-content-end px-3">
            <div className="nav-item text-nowrap d-flex align-items-center">
              <span className="me-3">管理員：Admin 您好</span>
              <button
                className="btn btn-outline-primary-80 btn-sm"
                onClick={handleLogout}
              >
                登出
              </button>
            </div>
          </div>
        </div>
      </div>

    </header>
  );
};

export default BackendHeader;
