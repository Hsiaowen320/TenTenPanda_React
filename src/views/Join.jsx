import { Link } from "react-router-dom";
import login1 from "@/assets/images/login-1.webp";
import login7 from "@/assets/images/login-7.webp";
import banner from "@/assets/images/banner.webp";

const Join = () => {
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
                  <div className="swiper-slide join-card border-0">
                    <img
                      src={login1}
                      alt=""
                      className="login-img h-100 w-100 object-fit-cover"
                    />
                  </div>
                  {/* 照片 2 */}
                  <div className="swiper-slide join-card border-0">
                    <img
                      src={login7}
                      alt=""
                      className="login-img h-100 w-100 object-fit-cover"
                    />
                  </div>
                  {/* 照片 3 */}
                  <div className="swiper-slide join-card border-0">
                    <img
                      src={banner}
                      alt=""
                      className="login-img h-100 w-100 object-fit-cover"
                    />
                  </div>
                </div>
              </div>
            </aside>
            {/* 會員登入資訊 */}
            <form className="col-lg-8 ps-lg-5 px-3" id="joinForm">
              {/* 內容：白底背景 */}
              <div className="card br-lg-24 border-0 d-flex flex-column justify-content-center align-items-center px-lg-8 py-lg-18 h-100 w-100">
                <div className="join-title d-flex justify-content-center flex-column mb-6 mb-lg-10">
                  <h4 className="fs-2 fw-bold mb-2">填寫註冊資料加入</h4>
                  <h4 className="fs-2 fw-bold text-neutral-100">
                    TenTen Panda！
                  </h4>
                </div>
                {/* 姓名＋電話 */}
                <div className="row d-lg-flex mb-8 mb-lg-6 w-100">
                  {/* 姓名 */}
                  <div className="col-lg-6 mb-8 mb-lg-0 p-0 pe-lg-3">
                    <p className="fs-lg-9 fs-7 text-neutral-100 ps-2 mb-2">
                      姓名<span className="text-primary-40">*</span>
                    </p>
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control br-8 input-bg px-5"
                        id="nameInput"
                        placeholder="name"
                        required
                        pattern="^[\u4e00-\u9fa5A-Za-z]{2,}$"
                        title="請輸入中文姓名（至少兩個字）"
                      />
                      <label htmlFor="nameInput" className="px-5">
                        例如：王小明
                      </label>
                    </div>
                  </div>
                  {/* 電話 */}
                  <div className="col-lg-6 mb-lg-0 p-0 ps-lg-3">
                    <p className="fs-lg-9 fs-7 text-neutral-100 ps-2 mb-2">
                      電話<span className="text-primary-40">*</span>
                    </p>
                    <div className="form-floating">
                      <input
                        type="tel"
                        className="form-control br-8 input-bg px-5"
                        id="phoneInput"
                        placeholder="phone"
                        required
                        pattern="^\d{10}$"
                        maxLength="10"
                        title="請輸入有效的台灣手機號碼（09開頭，共10碼數字）"
                      />
                      <label htmlFor="phoneInput" className="px-5">
                        例如：0912345678
                      </label>
                    </div>
                  </div>
                </div>
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
                      className="form-control br-8 input-bg px-5"
                      id="passwordInput"
                      placeholder="Password"
                      pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                      required
                    />
                    <label htmlFor="passwordInput" className="px-5">
                      半形英數共 8 碼
                    </label>
                    <span
                      className="text-neutral-60 material-symbols-outlined position-absolute top-50 end-0 translate-middle-y me-12 cursor-pointer"
                      id="togglePassword"
                    >
                      visibility_off
                    </span>
                  </div>
                </div>
                {/* 確認密碼 */}
                <div className="w-100 mb-8 mb-lg-6">
                  <p className="fs-lg-9 fs-7 text-neutral-100 ps-2 mb-2">
                    確認密碼<span className="text-primary-40">*</span>
                  </p>
                  <div className="form-floating mb-2">
                    <input
                      type="password"
                      className="form-control br-8 input-bg px-5"
                      id="passwordReInput"
                      placeholder="Password"
                      pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                      required
                    />
                    <label htmlFor="passwordReInput" className="px-5">
                      請再輸入一次密碼
                    </label>
                    <span
                      className="text-neutral-60 material-symbols-outlined position-absolute top-50 end-0 translate-middle-y me-12 cursor-pointer"
                      id="togglePasswordRe"
                    >
                      visibility_off
                    </span>
                  </div>
                  <p
                    className="fs-lg-9 fs-7 text-danger fs-7 ps-2 d-none"
                    id="passwordError"
                  >
                    請輸入相同密碼！
                  </p>
                </div>
                {/* 地址 */}
                <div className="w-100 mb-10">
                  <p className="fs-lg-9 fs-7 text-neutral-100 ps-2 mb-2">
                    收件地址<span className="text-primary-40">*</span>
                  </p>
                  <div className="form-floating mb-2">
                    <input
                      type="text"
                      className="form-control br-8 input-bg px-5"
                      id="addressInput"
                      placeholder="Password"
                      pattern="^[\u4e00-\u9fa5a-zA-Z0-9\s\-\#之號巷弄樓]{6,}$"
                      required
                    />
                    <label htmlFor="addressInput" className="px-5">
                      例如：忠孝東路四段 123 號 5 樓
                    </label>
                  </div>
                  <p className="text-danger fs-7 ps-2 d-none" id="addressError">
                    請輸入地址！
                  </p>
                </div>

                {/* 會員註冊＋隱私權＋登入連結 */}
                <div className="w-100">
                  {/* 會員註冊 */}
                  <div className="col-lg mb-2">
                    {/* 註冊按鈕 */}
                    <button
                      type="submit"
                      className="btn login-btn fs-6 br-8 w-100 py-4"
                      data-bs-toggle="modal"
                      data-bs-target="#joinModal"
                      id="joinBtn"
                      disabled
                    >
                      立即註冊
                    </button>
                    {/* 註冊成功畫面 */}
                    <div
                      className="modal fade"
                      id="joinModal"
                      tabIndex="-1"
                      aria-labelledby="joinModalLabel"
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
                              註冊成功！請重新登入
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 同意退換貨政策＋隱私權政策 */}
                  <p className="text-neutral-100 fs-7 mb-10">
                    建立帳號即表示您同意我們的
                    <a
                      href="../../pages/return.html"
                      className="fs-lg-9 fs-7 link"
                      id="returnLink"
                      target="_blank"
                    >
                      退換貨政策
                    </a>
                    及
                    <a
                      href="../../pages/privacy.html"
                      className="fs-lg-9 fs-7 link"
                      id="privacyLink"
                      target="_blank"
                    >
                      隱私權政策
                    </a>
                  </p>
                  <p className="fs-lg-9 fs-7 text-neutral-100">
                    已經有 TenTen Panda 帳號了嗎？
                    <Link to="/login" className="link">
                      立即登入
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

export default Join;
