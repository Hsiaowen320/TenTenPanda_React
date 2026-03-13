import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import graphic1 from "@/assets/images/graphic-1.webp";
import graphic2 from "@/assets/images/graphic-2.webp";
import graphic3 from "@/assets/images/graphic-3.webp";
import graphic4 from "@/assets/images/graphic-4.webp";
import graphic5 from "@/assets/images/graphic-5.webp";

const Password = () => {
  const navigate = useNavigate();

  // 是否顯示送出成功提示
  const [showSuccess, setShowSuccess] = useState(false);

  /**
   * react-hook-form
   *
   * mode: "onBlur"
   * - 離開欄位時才驗證，避免只點一下就誤判
   *
   * reValidateMode: "onChange"
   * - 驗證過後，後續輸入持續重新驗證
   */
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, touchedFields, isValid },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  /**
   * 根據 react-hook-form 的 touched + errors
   * 回傳 Bootstrap 驗證 class
   *
   * 規則：
   * - 尚未 blur 過：不加驗證樣式
   * - blur 過但只有空白：is-invalid
   * - blur 過且有錯：is-invalid
   * - blur 過且真的通過：is-valid
   */
  const getInputClassName = (fieldName, extraClass = "") => {
    const baseClass = `form-control br-8 input-bg px-5 ${extraClass}`.trim();
    const value = getValues(fieldName);

    if (!touchedFields[fieldName]) return baseClass;

    if (typeof value === "string" && !value.trim()) {
      return `${baseClass} is-invalid`;
    }

    return errors[fieldName]
      ? `${baseClass} is-invalid`
      : `${baseClass} is-valid`;
  };

  /**
   * 表單送出
   * data 由 react-hook-form 提供
   */
  const onSubmit = async (data) => {
    // 這裡先示範前端成功流程
    // 若之後接 API，可在這裡用 axios/fetch
    // console.log(data);

    setShowSuccess(true);
  };

  /**
   * 顯示送出成功後，1.5 秒跳轉登入頁
   */
  useEffect(() => {
    if (!showSuccess) return;

    const timer = setTimeout(() => {
      setShowSuccess(false);
      navigate("/login");
    }, 1500);

    return () => clearTimeout(timer);
  }, [showSuccess, navigate]);

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
            <form
              className="col-lg-8 ps-lg-5 px-3"
              id="letterForm"
              onSubmit={handleSubmit(onSubmit)}
            >
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
                      className={getInputClassName("email")}
                      id="emailFindInput"
                      placeholder="name@example.com"
                      {...register("email", {
                        required: "請輸入電子信箱",
                        validate: (value) => {
                          if (!value.trim()) return "請輸入電子信箱";
                          return (
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/.test(
                              value.trim(),
                            ) || "電子信箱格式不正確"
                          );
                        },
                      })}
                    />
                    <label htmlFor="emailFindInput" className="px-5">
                      例如：example@email.com
                    </label>
                  </div>

                  {/* 錯誤訊息（可選） */}
                  {touchedFields.email && errors.email && (
                    <p className="text-danger fs-7 ps-2 mt-2 mb-0">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* 驗證信按鈕 */}
                <div className="w-100 mb-8 mb-lg-6">
                  <div className="mb-2">
                    {/* 發送驗證信按鈕 */}
                    <button
                      type="submit"
                      className="btn login-btn fs-6 br-8 w-100 py-4"
                      id="letterBtn"
                      disabled={!isValid}
                    >
                      送出驗證信
                    </button>
                    {/* 發送驗證信畫面 */}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* 發送驗證信提示 */}
      {showSuccess && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.25)",
            zIndex: 1055,
          }}
        >
          <div className="bg-white br-32 p-10 d-flex border-0 justify-content-center align-items-center shadow">
            <div className="text-center">
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
      )}
    </>
  );
};

export default Password;
