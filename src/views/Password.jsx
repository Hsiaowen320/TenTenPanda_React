import graphic1 from "@/assets/images/graphic-1.webp";
import graphic2 from "@/assets/images/graphic-2.webp";
import graphic3 from "@/assets/images/graphic-3.webp";
import graphic4 from "@/assets/images/graphic-4.webp";
import graphic5 from "@/assets/images/graphic-5.webp";

const Password = () => {
  return (
    <>
      <main className="login-bg border-top border-bottom border-lg-0 position-relative">
        {/* 背景裝飾圖片 */}
        <img
          src={graphic1}
          alt=""
          className="password-donut-1 position-absolute d-lg-flex d-none"
        />
        <img
          src={graphic2}
          alt=""
          className="password-donut-2 position-absolute d-lg-flex d-none"
        />
        <img
          src={graphic3}
          alt=""
          className="password-donut-3 position-absolute d-lg-flex d-none"
        />
        <img
          src={graphic4}
          alt=""
          className="password-donut-4 position-absolute d-lg-flex d-none"
        />
        <img
          src={graphic5}
          alt=""
          className="password-donut-5 position-absolute d-lg-flex d-none"
        />
        <div className="login container py-lg-14 py-8 px-3 px-lg-0">
          <div className="row d-lg-flex justify-content-center">
            <form className="col-lg-8 ps-lg-5 px-3" id="letterForm">
              {/* 內容：白底背景 */}
              <div className="card br-lg-24 border-0 d-flex flex-column justify-content-center align-items-center px-lg-8 py-lg-18 h-100 w-100">
                <h4 className="fs-2 fw-bold mb-lg-10 text-neutral-100 mb-6">
                  查詢帳號密碼
                </h4>
                {/* 電子信箱 */}
                <div className="w-100 mb-8 mb-lg-6">
                  <p className="fs-lg-9 fs-7 text-neutral-100 ps-2 mb-2">
                    請輸入電子信箱<span className="text-primary-40">*</span>
                  </p>
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control br-8 input-bg px-5"
                      id="emailFindInput"
                      placeholder="name@example.com"
                      required
                      pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$"
                    />
                    <label htmlFor="emailFindInput" className="px-5">
                      例如：example@email.com
                    </label>
                  </div>
                </div>

                {/* 驗證信按鈕 */}
                <div className="w-100 mb-8 mb-lg-6">
                  <div className="mb-2">
                    {/* 發送驗證信按鈕 */}
                    <button
                      type="button"
                      className="btn login-btn fs-6 br-8 w-100 py-4"
                      data-bs-toggle="modal"
                      data-bs-target="#letterModal"
                      id="letterBtn"
                      disabled
                    >
                      送出驗證信
                    </button>
                    {/* 發送驗證信畫面 */}
                    <div
                      className="modal fade"
                      id="letterModal"
                      tabIndex="-1"
                      aria-labelledby="letterModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered mx-auto">
                        <div className="modal-content br-32 p-10 d-flex border-0 justify-content-center align-items-center shadow">
                          <div className="modal-body p-0 text-center">
                            {/* 驚嘆號圖標 */}
                            <span className="badge rounded-circle bg-primary-20 p-lg-6 p-4 mb-5">
                              <span className="material-symbols-outlined check-icon fw-bold text-primary-40 d-flex justify-content-center align-items-center">
                                exclamation
                              </span>
                            </span>
                            <p className="text-neutral-100 fw-bold fs-lg-5 fs-6">
                              已送出驗證信至您的電子信箱
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Password;
