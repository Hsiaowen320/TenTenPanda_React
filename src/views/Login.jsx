import { Link, useNavigate } from "react-router-dom";
import { useMemo, useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CommonSwiper from "@/components/CommonSwiper";
import { supabase } from "../../supabaseClient";
import { useLocation } from "react-router";

import login3 from "@/assets/images/login-3.webp";
import login4 from "@/assets/images/login-4.webp";
import login2 from "@/assets/images/login-2.webp";


const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("redirect") || "/"; 

  // 右側表單卡片 ref，右側表單卡片高度（同步給左側照片區）
  const cardRef = useRef(null);
  const [photoHeight, setPhotoHeight] = useState(0);

  // 是否顯示登入成功提示
  const [showSuccess, setShowSuccess] = useState(false);

  // 密碼是否顯示
  const [showPassword, setShowPassword] = useState(false);

  // 是否正在送出
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * react-hook-form
   *
   * mode: "onBlur"
   * - 離開欄位時才驗證，避免只是點到旁邊就誤判綠勾
   *
   * reValidateMode: "onChange"
   * - 一旦欄位被驗證過，後續輸入持續重新驗證
   */
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, touchedFields, isValid },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
  });

  /**
   * 左側輪播圖片資料
   */
  const loginSlides = [
    { id: "login-1", img: login3, alt: "登入頁圖片 1" },
    { id: "login-2", img: login4, alt: "登入頁圖片 2" },
    { id: "login-3", img: login2, alt: "登入頁圖片 3" },
  ];

  /**
   * Swiper 設定
   */
  const loginSwiperOptions = useMemo(
    () => ({
      slidesPerView: 1,
      loop: true,
      spaceBetween: 0,
      pagination: {
        clickable: true,
      },
    }),
    [],
  );

  /**
   * 讓左側照片區高度跟著右側表單卡片同步
   *
   * 為什麼要這樣做：
   * - 右側高度是由內容自然撐開
   * - 左側圖片若只靠 h-100，沒有明確高度基準時會失準
   * - 用 ResizeObserver 可在欄位內容變動時自動更新高度
   */
  useEffect(() => {
    if (!cardRef.current) return;

    const updateHeight = () => {
      if (!cardRef.current) return;
      setPhotoHeight(cardRef.current.offsetHeight);
    };

    // 初次量測
    updateHeight();

    // 監聽右側卡片高度變化
    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    observer.observe(cardRef.current);

    // 視窗尺寸改變時也重新量測
    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  /**
   * 如果有勾選記住帳號，進頁面時自動帶入 email
   */
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberEmail");

    if (rememberedEmail) {
      setValue("email", rememberedEmail);
      setValue("remember", true);
    }
  }, [setValue]);

  /**
   * 顯示登入成功後，1.5 秒跳轉首頁
   */
  useEffect(() => {
    if (!showSuccess) return;

    const timer = setTimeout(() => {
      setShowSuccess(false);
      navigate(redirectTo, { replace: true });
    }, 1500);

    return () => clearTimeout(timer);
  }, [showSuccess, navigate, redirectTo]);

  /**
   * 每張輪播圖內容
   */
  const renderLoginSlide = (slide) => {
    return (
      <div className="login-card border-0 h-100 w-100">
        <img
          src={slide.img}
          alt={slide.alt}
          className="login-img h-100 w-100 object-fit-cover d-block"
        />
      </div>
    );
  };

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

    // 只有空白時，不可顯示綠勾
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
    try {
      setIsSubmitting(true);

      const email = data.email.trim();
      const password = data.password;

      // 使用 supabase 登入（auth.signInWithPassword 不支援 .throwOnError）
      const { data: loginData, error } = await supabase.auth.signInWithPassword(
        {
          email: email,
          password: password,
        },
      );
      if (error) {
        throw error;
      }

      // 記住帳號
      if (data.remember) {
        localStorage.setItem("rememberEmail", email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      // 存登入狀態
      // user 可能在 loginData.user，也可能寫在 loginData.session.user
      const user = loginData.user || loginData.session?.user || null;
      localStorage.setItem("user", JSON.stringify(user));

      console.log("登入成功！歡迎回來");

      setShowSuccess(true);
    } catch (error) {
      console.error("登入失敗：", error);

      if (error.message?.includes("Invalid login credentials")) {
        alert("帳號或密碼錯誤");
      } else {
        alert(error.message || "登入失敗，請稍後再試");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="login-bg border-top border-bottom border-lg-0">
        {/* 保留原本 padding */}
        <div className="login container py-lg-14 py-8 px-3 px-lg-0">
          <div className="row align-items-start">
            {/* 左側照片區 */}
            <aside className="col-lg-4 pe-5 d-none d-lg-block">
              <div
                style={{ height: photoHeight ? `${photoHeight}px` : "auto" }}
              >
                <CommonSwiper
                  slides={loginSlides}
                  renderSlide={renderLoginSlide}
                  options={loginSwiperOptions}
                  className="mySwiper h-100 w-100"
                  swiperClassName="br-24 h-100"
                  showPagination={false}
                  fillHeight={true}
                />
              </div>
            </aside>

            {/* 右側表單區 */}
            <div className="col-lg-8 ps-lg-5 px-3">
              <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
                <div
                  ref={cardRef}
                  className="card br-lg-24 border-0 d-flex flex-column justify-content-center align-items-center px-lg-8 py-lg-18 w-100"
                >
                  {/* 標題 */}
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
                        id="emailInput"
                        placeholder="name@example.com"
                        className={getInputClassName("email")}
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
                      <label htmlFor="emailInput" className="px-5">
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

                  {/* 密碼 */}
                  <div className="w-100 mb-8 mb-lg-6">
                    <p className="fs-lg-9 fs-7 text-neutral-100 ps-2 mb-2">
                      密碼<span className="text-primary-40">*</span>
                    </p>

                    <div className="form-floating">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="passwordInput"
                        placeholder="Password"
                        className={getInputClassName("password", "mb-2")}
                        {...register("password", {
                          required: "請輸入密碼",
                          validate: (value) => {
                            if (!value.trim()) return "請輸入密碼";
                            return (
                              /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
                                value,
                              ) || "密碼需為至少 8 碼，且包含英文與數字"
                            );
                          },
                        })}
                      />
                      <label htmlFor="passwordInput" className="px-5">
                        例如：aa12345678
                      </label>
                      <span
                        className="text-neutral-60 material-symbols-outlined position-absolute top-50 end-0 translate-middle-y me-12 cursor-pointer"
                        id="togglePassword"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? "visibility" : "visibility_off"}
                      </span>
                    </div>

                    {/* 錯誤訊息（可選） */}
                    {touchedFields.password && errors.password && (
                      <p className="text-danger fs-7 ps-2 mt-2 mb-2">
                        {errors.password.message}
                      </p>
                    )}

                    {/* 記住帳號＋忘記密碼 */}
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="form-check m-0">
                        <input
                          className="form-check-input border-primary-40 p-2"
                          type="checkbox"
                          id="rememberCheck"
                          {...register("remember")}
                        />
                        <label
                          className="fs-lg-9 fs-7 form-check-label align-text-bottom text-primary-40"
                          htmlFor="rememberCheck"
                        >
                          記住帳號
                        </label>
                      </div>

                      <Link to="/password" className="fs-lg-9 fs-7 link">
                        忘記密碼？
                      </Link>
                    </div>
                  </div>

                  {/* 登入按鈕＋註冊連結 */}
                  <div className="w-100 mb-8 mb-lg-6">
                    <div className="mb-2">
                      <button
                        type="submit"
                        className="btn login-btn fs-6 br-8 w-100 py-4"
                        id="loginBtn"
                        disabled={!isValid || isSubmitting}
                      >
                        {isSubmitting ? "登入中..." : "立即登入"}
                      </button>
                    </div>

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
        </div>
      </main>

      {/* 登入成功提示 */}
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
              <span className="badge rounded-circle bg-primary-20 p-lg-6 p-4 mb-5">
                <span className="material-symbols-outlined check-icon fw-bold text-primary-40 d-flex justify-content-center align-items-center">
                  check
                </span>
              </span>
              <p className="text-neutral-100 fw-bold fs-lg-5 fs-6 mb-0">
                登入成功！
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
