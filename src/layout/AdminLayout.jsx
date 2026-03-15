import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logoRb from "@/assets/images/logo-rb.webp";
import Breadcrumb from "@/components/Breadcrumb";

function AdminLayout() {
  return (
    <div className="container-fluid">
      <div className="row">

        {/* <!-- 左側選單 --> */}
        <div className="col-2 bg-primary-tint vh-100 z-3 position-fixed top-0 start-0 d-none d-lg-block p-0">
          <div className="p-4 me-10 d-lg-flex">
            <img src={logoRb} alt="TenTen-Logo" style={{ maxWidth: "150px" }}/>
          </div>
          <div className="pt-4">
            <ul className="d-flex flex-column">
              <li>
                <NavLink
                  to="/admin/product"
                  className={({ isActive }) =>
                    `fs-6 lh-base py-3 px-6 d-block ${isActive ? "bg-white border-start border-5 border-primary-40" : "text-dark"}`
                  }
                  style={{ letterSpacing: "0.04em" }}
                >
                  商品資訊
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/order"
                  className={({ isActive }) =>
                    `fs-6  lh-base py-3 px-6 d-block ${isActive ? "bg-white border-start border-5 border-primary-40" : "text-dark"}`
                  }
                  style={{ letterSpacing: "0.04em" }}
                >
                  訂單資訊
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/announcement"
                  className={({ isActive }) =>
                    `fs-6  lh-base py-3 px-6 d-block ${isActive ? "bg-white border-start border-5 border-primary-40" : "text-dark"}`
                  }
                  style={{ letterSpacing: "0.04em" }}
                >
                  消息公告
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/member"
                  className={({ isActive }) =>
                    `fs-6 lh-base py-3 px-6 d-block ${isActive ? "bg-white border-start border-5 border-primary-40" : "text-dark"}`
                  }
                  style={{ letterSpacing: "0.04em" }}
                >
                  會員列表
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/coupon"
                  className={({ isActive }) =>
                    `fs-6 lh-base py-3 px-6 d-block ${isActive ? "bg-white border-start border-5 border-primary-40" : "text-dark"}`
                  }
                  style={{ letterSpacing: "0.04em" }}
                >
                  折扣優惠
                </NavLink>
              </li>            
            </ul>
          </div>
        </div>

        {/* <!-- 主要內容 --> */}
        {/* 電腦 */}
        <main className="col-10 d-none d-lg-block" style={{ marginLeft: "16.666%" }}>
          <div className="ms-10 pe-10 mb-18">
            <div className="pt-8 pb-3">
              <Breadcrumb/>
            </div>
            <div>
              <Outlet />
            </div>
          </div>
        </main>
        {/* 手機 */}
        <main className="col-12 d-lg-none d-block">
          <div className="pt-8 mb-12">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
    
    
  );
}

export default AdminLayout;
