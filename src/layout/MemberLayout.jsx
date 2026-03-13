import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

function MemberLayout() {
  return (
    <div className="container">
      <div className="row">
        {/* 左側選單 */}
        <div className="d-none d-lg-block col-lg-3">
          <ul>
            <li className="mb-lg-18 mt-lg-8">
              <h2 className="fs-1 fw-bold">會員中心</h2>
            </li>

            <li className="mb-lg-12">
              <NavLink
                to="/member/myprofile"
                className={({ isActive }) =>
                  `fs-4 ${isActive ? "fw-bold text-primary-60" : "text-dark"}`
                }
              >
                個人資訊
              </NavLink>
            </li>

            <li className="mb-lg-12">
              <NavLink
                to="/member/myFavorite"
                className={({ isActive }) =>
                  `fs-4 ${isActive ? "fw-bold text-primary-60" : "text-dark"}`
                }
              >
                我的收藏
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/member/myOrders"
                className={({ isActive }) =>
                  `fs-4 ${isActive ? "fw-bold text-primary-60" : "text-dark"}`
                }
              >
                我的訂單
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

export default MemberLayout;
