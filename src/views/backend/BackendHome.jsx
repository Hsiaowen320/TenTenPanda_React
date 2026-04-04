
import { NavLink } from "react-router-dom";
import logoRb from "@/assets/images/logo-rb.webp";

function BackendHome() {
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-neutral-20 container-fluid">
        <div className="rounded-4 bg-white p-12">
          <p className="fs-lg-6 fs-5 text-center text-neutral-60 pb-2">Welcome to</p>
          <h1 className="fs-lg-2 fs-3 pb-12 fw-bold text-center">甜甜熊貓 後台管理系統</h1>
          <div className="d-flex gap-5 justify-content-between flex-column flex-lg-row">
            {/* 左邊 */}
            <div>
              <div className="d-flex gap-3 flex-column mx-8 ">
                <NavLink to="/admin/login" className="btn btn-primary-40 text-whitpy-2 fs-6 w-100 px-8 py-2 text-white">
                    管理員登入
                </NavLink>
                <NavLink to="/" className="btn btn-outline-primary-80 py-2 fs-6 w-100 px-7 py-2">
                    前往您的網站
                </NavLink>
              </div>
            </div>
            {/* 中間分隔線 */}
              <div
                className="d-none d-lg-block"
                style={{
                  width: "1px",
                  height: "120px",
                  backgroundColor: "#dee2e6"
                }}
              ></div>
            {/* 右邊 */}
            <div className="d-none d-lg-block mx-8">
              <img src={logoRb} alt="TenTen-Logo" style={{ maxWidth: "200px" }}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BackendHome;
