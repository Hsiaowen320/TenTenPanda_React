import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="container">
      <div className="row">
        {/* 左側選單 */}
        <div className="d-none d-lg-block col-lg-3">
          <ul>
            <li className="mb-lg-18 mt-lg-8">
              <h2 className="fs-1 fw-bold">後臺管理</h2>
            </li>

            <li className="mb-lg-12">
              <NavLink
                to="/admin/product"
                className={({ isActive }) =>
                  `fs-4 ${isActive ? "fw-bold text-primary-60" : "text-dark"}`
                }
              >
                商品資訊
              </NavLink>
            </li>

            <li className="mb-lg-12">
              <NavLink
                to="/admin/order"
                className={({ isActive }) =>
                  `fs-4 ${isActive ? "fw-bold text-primary-60" : "text-dark"}`
                }
              >
                訂單資訊
              </NavLink>
            </li>

            <li  className="mb-lg-12">
              <NavLink
                to="/admin/announcement"
                className={({ isActive }) =>
                  `fs-4 ${isActive ? "fw-bold text-primary-60" : "text-dark"}`
                }
              >
                消息公告
              </NavLink>
            </li>

            <li  className="mb-lg-12">
              <NavLink
                to="/admin/coupon"
                className={({ isActive }) =>
                  `fs-4 ${isActive ? "fw-bold text-primary-60" : "text-dark"}`
                }
              >
                折扣優惠
              </NavLink>
            </li>            
          </ul>
        </div>

        {/* 右側內容 */}
        <div className="col-lg-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
