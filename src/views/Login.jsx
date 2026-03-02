import { Link } from "react-router-dom";
import login3 from "@/assets/images/login-3.webp";
import login4 from "@/assets/images/login-4.webp";
import login2 from "@/assets/images/login-2.webp";

const Login = () => {
  return (
    <>
      <main className="login-bg border-top border-bottom border-lg-0">
        <div className="login container py-lg-14 py-8 px-3 px-lg-0">
          <div className="row d-lg-flex">
            {/* 照片區 */}
            <aside className="col-lg-4 pe-5 d-none d-lg-block">
              <div className="swiper mySwiper br-24">
                <div className="swiper-wrapper">
                  {/* 照片 1 */}
                  <div className="swiper-slide login-card border-0">
                    <img
                      src={login3}
                      alt=""
                      className="login-img h-100 w-100 object-fit-cover"
                    />
                  </div>
                  {/* 照片 2 */}
                  <div className="swiper-slide login-card border-0">
                    <img
                      src={login4}
                      alt=""
                      className="login-img h-100 w-100 object-fit-cover"
                    />
                  </div>
                  {/* 照片 3 */}
                  <div className="swiper-slide login-card border-0">
                    <img
                      src={login2}
                      alt=""
                      className="login-img h-100 w-100 object-fit-cover"
                    />
                  </div>
                </div>
              </div>
            </aside>
            {/* 會員登入資訊 */}
            <form className="col-lg-8 ps-lg-5 px-3" id="loginForm">
              {/* 內容：白底背景 */}
              <div className="card br-lg-24 border-0 d-flex flex-column justify-content-center align-items-center px-lg-8 py-lg-18 h-100 w-100">
                <h4 className="fs-2 fw-bold mb-lg-10 text-neutral-100 mb-6">
                  歡迎回來！
                </h4>
                {/* 電子信箱 */}
                <div className="w-100 mb-8 mb-lg-6">
                  <p className="fs-lg-9 fs-7 text-neutral-100 ps-2 mb-2">
                    電子信箱<span className="text-primary-40">*</span>
                  </p>
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control br-8 input-bg px-5"
                      id="emailInput"
                      placeholder="name@example.com"
                      required
                      pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$"
                    />
                    <label htmlFor="emailInput" className="px-5">
                      例如：example@email.com
                    </label>
                  </div>
                </div>
                {/* 密碼 */}
                <div className="w-100 mb-8 mb-lg-6">
                  <p className="fs-lg-9 fs-7 text-neutral-100 ps-2 mb-2">
                    密碼<span className="text-primary-40">*</span>
                  </p>
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control br-8 input-bg px-5 mb-2"
                      id="passwordInput"
                      placeholder="Password"
                      pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                      required
                    />
                    <label htmlFor="passwordInput" className="px-5">
                      例如：aa12345678
                    </label>
                  </div>
                  {/* 記住帳號＋忘記密碼 */}
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="form-check m-0">
                      <input
                        className="form-check-input border-primary-40 p-2"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                        checked
                      />
                      <label
                        className="fs-lg-9 fs-7 form-check-label align-text-bottom text-primary-40"
                        htmlFor="flexCheckChecked"
                      >
                        記住帳號
                      </label>
                    </div>
                    <Link to="/password" className="fs-lg-9 fs-7 link">
                      忘記密碼？
                    </Link>
                  </div>
                </div>
                {/* 會員登入按鈕＋註冊連結 */}
                <div className="w-100 mb-8 mb-lg-6">
                  {/* 會員登入 */}
                  <div className="mb-2">
                    {/* 登入按鈕 */}
                    <button
                      type="button"
                      className="btn login-btn fs-6 br-8 w-100 py-4"
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal"
                      id="loginBtn"
                    >
                      立即登入
                    </button>
                    {/* 登入畫面 */}
                    <div
                      className="modal fade"
                      id="loginModal"
                      tabIndex="-1"
                      aria-labelledby="loginModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered mx-auto">
                        <div className="modal-content br-32 p-10 d-flex border-0 justify-content-center align-items-center shadow">
                          <div className="modal-body p-0 text-center">
                            {/* 登入成功圖標 */}
                            <span className="badge rounded-circle bg-primary-20 p-lg-6 p-4 mb-5">
                              <span className="material-symbols-outlined check-icon fw-bold text-primary-40 d-flex justify-content-center align-items-center">
                                check
                              </span>
                            </span>
                            <p className="text-neutral-100 fw-bold fs-lg-5 fs-6">
                              登入成功！
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 註冊連結 */}
                  <p className="text-neutral-100">
                    還不是會員嗎？
                    <Link to="/join" className="link">
                      立即註冊
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
