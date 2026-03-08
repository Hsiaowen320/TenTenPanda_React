import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

import logo from "@/assets/images/logo.webp";
import cornerS from "@/assets/images/corner-s.webp";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  /**
   * 取得目前登入狀態
   * 這裡改用 Supabase session 來判斷
   */
  const checkLoginStatus = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        throw error;
      }

      const session = data.session;

      if (session && session.user) {
        setIsLogin(true);

        // 從 user metadata 取出 name
        const userData = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name || "會員",
          tel: session.user.user_metadata?.tel || "",
          address: session.user.user_metadata?.address || "",
        };

        setUser(userData);

        // 若其他頁面還有在用 localStorage，這裡一起同步
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        setIsLogin(false);
        setUser(null);

        localStorage.removeItem("isLogin");
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("取得登入狀態失敗：", error.message);
      setIsLogin(false);
      setUser(null);
    }
  };

  /**
   * 進頁面或換頁時，重新確認登入狀態
   */
  useEffect(() => {
    checkLoginStatus();
  }, [location]);

  /**
   * 監聽 Supabase 登入 / 登出狀態變化
   * 這樣一登入或一登出，Header 畫面會立刻更新
   */
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && session.user) {
        const userData = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name || "會員",
          tel: session.user.user_metadata?.tel || "",
          address: session.user.user_metadata?.address || "",
        };

        setIsLogin(true);
        setUser(userData);

        localStorage.setItem("isLogin", "true");
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        setIsLogin(false);
        setUser(null);

        localStorage.removeItem("isLogin");
        localStorage.removeItem("user");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /**
   * 手機版 modal 關閉後跳轉登入頁
   * 因為在 modal 裡直接用 Link + data-bs-dismiss，有時會吃掉跳頁
   */
  const goToLoginFromMobileMenu = () => {
    const modalElement = document.getElementById("modal-menu");

    if (modalElement) {
      modalElement.classList.remove("show");
      modalElement.setAttribute("aria-hidden", "true");
      modalElement.style.display = "none";
    }

    const backdrops = document.querySelectorAll(".modal-backdrop");
    backdrops.forEach((backdrop) => backdrop.remove());

    document.body.classList.remove("modal-open");
    document.body.style.removeProperty("padding-right");
    document.body.style.removeProperty("overflow");

    navigate("/login");
  };

  /**
   * 登出
   * 改成真的使用 Supabase 登出
   */
  const handleLogout = async () => {
    try {
      // 修正：解構賦值直接拿到 error，因為 auth.signOut 不支援 .throwOnError()
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error; // 手動把錯誤丟給 catch 處理
      }

      // 清掉前端本地登入資料
      localStorage.removeItem("isLogin");
      localStorage.removeItem("user");
      localStorage.removeItem("rememberEmail");

      // 畫面狀態立即改變
      setIsLogin(false);
      setUser(null);

      // 如果目前是手機 modal 開著，順手關掉
      const modalElement = document.getElementById("modal-menu");
      if (modalElement) {
        modalElement.classList.remove("show");
        modalElement.setAttribute("aria-hidden", "true");
        modalElement.style.display = "none";
      }

      const backdrops = document.querySelectorAll(".modal-backdrop");
      backdrops.forEach((backdrop) => backdrop.remove());

      document.body.classList.remove("modal-open");
      document.body.style.removeProperty("padding-right");
      document.body.style.removeProperty("overflow");

      // 這裡寫登出成功的執行程式碼
      console.log("已成功登出");

      navigate("/login");
    } catch (error) {
      console.error("登出時發生錯誤：", error.message);
      alert(error.message || "登出失敗，請稍後再試");
    }
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-neutral-white">
      <div className="container d-flex justify-content-between align-items-center px-3 py-4 position-relative">
        {/* LOGO */}
        <div className="order-0 mx-lg-auto">
          <Link className="navbar-brand" to="/">
            <img className="logo" src={logo} alt="TenTen-Logo" />
          </Link>
        </div>

        {/* 購物車 + 漢堡選單 (行動裝置) */}
        <div className="d-flex order-1 align-items-center order-lg-0">
          <Link
            to="/cart"
            className="headerBtn bg-primary-20 p-3 br-12 d-lg-none me-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-cart2 text-primary-40"
              viewBox="0 0 16 16"
            >
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
            </svg>
          </Link>

          <button
            className="navbar-toggler headerBtn bg-primary-20 p-0 border-0"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#modal-menu"
            aria-controls="menu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="material-symbols-outlined text-primary-40 p-4">
              menu
            </span>
          </button>

          {/* 導航選單（桌機） */}
          <div
            className="collapse navbar-collapse position-absolute start-0"
            id="menu"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-none d-lg-flex">
              <li className="nav-item p-4 me-8 fs-6">
                <Link className="nav-link text-neutral-100" to="/story">
                  品牌故事
                </Link>
              </li>
              <li className="nav-item p-4 me-8 fs-6">
                <Link className="nav-link text-neutral-100" to="/news">
                  最新消息
                </Link>
              </li>

              {/* Dropdown */}
              <li className="nav-item dropdown p-4">
                <a
                  className="nav-link dropdown-toggle no-caret fs-6 fw-700 text-neutral-100"
                  href="#"
                  id="productList"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={(e) => e.preventDefault()}
                >
                  商品列表
                </a>
                <ul
                  className="dropdown-menu border-0 br-bl-16 br-br-16 text-center fs-6"
                  aria-labelledby="productList"
                >
                  <li>
                    <Link
                      className="dropdown-item p-4 text-neutral-100"
                      to="/productList-classic"
                    >
                      經典口味
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item p-4 text-neutral-100"
                      to="/productList-seasonal"
                    >
                      季節限定
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item p-4 text-neutral-100"
                      to="/productList-giftbox"
                    >
                      甜甜禮盒
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        {/* 會員 + 購物車 (桌機模式) */}
        <div className="d-none d-lg-flex align-items-center position-absolute end-0 ms-auto order-lg-2">
          {!isLogin ? (
            <Link
              to="/login"
              className="headerBtn bg-primary-20 p-3 br-12 me-8"
              title="登入 / 註冊"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-person text-primary-40"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
              </svg>
            </Link>
          ) : (
            <div className="d-flex align-items-center me-8">
              <div className="headerBtn bg-primary-20 p-3 br-12 me-4 d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-person text-primary-40"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg>
              </div>

              <span className="text-neutral-100 me-4">
                您好，{user?.name || "會員"}
              </span>

              <button
                type="button"
                className="btn btn-sm btn-outline-primary-80 br-4"
                onClick={handleLogout}
              >
                登出
              </button>
            </div>
          )}

          <Link to="/cart" className="headerBtn bg-primary-20 p-3 br-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-cart2 text-primary-40"
              viewBox="0 0 16 16"
            >
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Modal (行動版選單) */}
      <div
        className="modal fade d-lg-none"
        id="modal-menu"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen-sm-down">
          <div className="modal-content p-3 modal-height">
            <div className="modal-header p-0 border-0 header-height align-items-start bg-primary-tint br-tl-40">
              <button
                type="button"
                className="btn ms-auto p-0"
                data-bs-dismiss="modal"
                aria-label="關閉"
              >
                <div className="position-relative">
                  <div className="bg-neutral-white br-bl-32 position-relative position-absolute top-0 end-0">
                    <span className="material-symbols-outlined text-primary-40 m-7">
                      close
                    </span>
                    <img
                      src={cornerS}
                      alt="corner"
                      className="position-absolute start-0"
                      style={{
                        transform: "translateX(-100%) rotate(-90deg)",
                      }}
                    />

                    <div>
                      <img
                        src={cornerS}
                        alt="corner"
                        className="position-absolute"
                        style={{ transform: "rotate(-90deg)" }}
                      />
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <div className="modal-body bg-primary-tint p-5 br-bl-40 br-br-40">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    to="/story"
                    type="button"
                    className="nav-link mb-6 py-3 ps-1 text-neutral-100"
                    data-bs-dismiss="modal"
                  >
                    品牌故事
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/news"
                    type="button"
                    className="nav-link mb-6 py-3 ps-1 text-neutral-100"
                    data-bs-dismiss="modal"
                  >
                    最新消息
                  </Link>
                </li>

                {/* 下拉選單 */}
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link d-flex justify-content-between align-items-center no-caret dropdown-toggle p-0 mb-4 fw-400"
                    id="productListMobile"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="py-3 ps-1 text-neutral-100">商品列表</span>
                    <span
                      className="material-symbols-outlined"
                      id="dropdownIcon"
                    >
                      keyboard_arrow_down
                    </span>
                  </a>

                  <ul
                    className="dropdown-menu border-0 bg-primary-tint"
                    aria-labelledby="productListMobile"
                  >
                    <li>
                      <Link
                        className="dropdown-item mx-4 py-3 ps-1 mb-2 text-neutral-100"
                        to="/productList-classic"
                        data-bs-dismiss="modal"
                      >
                        經典口味
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item mx-4 py-3 ps-1 mb-2 text-neutral-100"
                        to="/productList-seasonal"
                        data-bs-dismiss="modal"
                      >
                        季節限定
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item mx-4 py-3 ps-1 text-neutral-100"
                        to="/productList-giftbox"
                        data-bs-dismiss="modal"
                      >
                        甜甜禮盒
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="modal-footer border-0 d-flex justify-content-center mt-3 mb-6">
              {!isLogin ? (
                <button
                  type="button"
                  className="btn headerLogin btn-outline-primary-80 br-4 fs-6 px-8 py-4"
                  onClick={goToLoginFromMobileMenu}
                >
                  登入／註冊
                </button>
              ) : (
                <div className="d-flex flex-column align-items-center w-100">
                  <p className="mb-4 text-neutral-100">
                    您好，{user?.name || "會員"}
                  </p>
                  <button
                    type="button"
                    className="btn headerLogin btn-outline-primary-80 br-4 fs-6 px-8 py-4"
                    onClick={handleLogout}
                  >
                    登出
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
