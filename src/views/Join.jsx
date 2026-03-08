import { Link, useNavigate } from "react-router-dom";
import { useMemo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CommonSwiper from "@/components/CommonSwiper";
import { supabase } from "../../supabaseClient";

import login1 from "@/assets/images/login-1.webp";
import login7 from "@/assets/images/login-7.webp";
import banner from "@/assets/images/banner.webp";

const Join = () => {
  const navigate = useNavigate();

  // 是否顯示註冊成功提示
  const [showSuccess, setShowSuccess] = useState(false);

  // 密碼是否顯示
  const [showPassword, setShowPassword] = useState(false);

  // 確認密碼是否顯示
  const [showPasswordRe, setShowPasswordRe] = useState(false);

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
    reset,
    formState: { errors, touchedFields, isValid },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      passwordRe: "",
      address: "",
    },
  });

  /**
   * Login 頁輪播資料
   * 每一筆就是一張圖片
   */
  const joinSlides = [
    {
      id: "login-1",
      img: login1,
      alt: "登入頁圖片 1",
    },
    {
      id: "login-2",
      img: login7,
      alt: "登入頁圖片 2",
    },
    {
      id: "login-3",
      img: banner,
      alt: "登入頁圖片 3",
    },
  ];

  /**
   * Join 頁的 swiper 設定
   * 用 useMemo 避免每次 render 都產生新物件，
   * 否則可能導致 CommonSwiper 重新初始化
   */
  const joinSwiperOptions = useMemo(
    () => ({
      slidesPerView: 1, // 一次顯示一張
      loop: true, // 無限循環
      initialSlide: 0,
      spaceBetween: 0, // slide 間距
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      on: {
        afterInit: function () {
          this.slideToLoop(0, 0);
        },
      },
      pagination: {
        clickable: true, // 分頁可點擊
      },
    }),
    [],
  );

  /**
   * Join 頁每張 slide 的長相
   * 由 CommonSwiper 呼叫這個 function 去渲染內容
   */
  const renderJoinSlide = (slide) => {
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
   * 置中開新視窗
   * hashPath 會接要開的 hash 路由，例如：
   * "/return" 或 "/privacy"
   */
  const openCenteredWindow = (hashPath) => {
    // 新視窗寬度
    const width = 1280;

    // 新視窗高度
    const height = 720;

    // 計算新視窗要出現在螢幕上的 left 位置
    // window.screenLeft：目前這個瀏覽器視窗距離螢幕左邊的位置
    // window.innerWidth：目前瀏覽器視窗本身的寬度
    // (window.innerWidth - width) / 2：算出要讓新視窗水平置中時，左邊要留多少空間
    const left = window.screenLeft + (window.innerWidth - width) / 2;

    // 計算新視窗要出現在螢幕上的 top 位置
    // window.screenTop：目前這個瀏覽器視窗距離螢幕上方的位置
    // window.innerHeight：目前瀏覽器視窗本身的高度
    // (window.innerHeight - height) / 2：算出要讓新視窗垂直置中時，上方要留多少空間
    const top = window.screenTop + (window.innerHeight - height) / 2;

    // 組出完整網址
    // 因為你現在使用的是 createHashRouter
    // 所以真正的路由要放在 # 後面
    //
    // 例如目前網站是：
    // http://localhost:5173/
    //
    // hashPath 如果是 "/return"
    // 最後 fullUrl 會變成：
    // http://localhost:5173/#/return
    //
    // window.location.origin  = 網站主網域，例如 http://localhost:5173
    // window.location.pathname = 目前路徑，通常開發時是 "/"
    // #${hashPath} = Hash Router 真正吃的路由部分
    const fullUrl = `${window.location.origin}${window.location.pathname}#${hashPath}`;

    // 開新視窗
    window.open(
      fullUrl, // 要開啟的完整網址
      "policyWindow", // 視窗名稱，相同名稱時可能會重用同一個視窗
      // 第三個參數是新視窗設定
      // width：寬度
      // height：高度
      // top：距離螢幕上方的位置
      // left：距離螢幕左方的位置
      // resizable=yes：允許使用者調整視窗大小
      // scrollbars=yes：內容超出時允許出現捲軸
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`,
    );
  };

  /**
   * 表單送出
   * data 由 react-hook-form 提供
   */
  const onSubmit = async (formData) => {
    try {
      setIsSubmitting(true);

      // 把欄位整理成乾淨資料（trim：拿掉多餘空白）
      const email = formData.email.trim();
      const password = formData.password;
      const name = formData.name.trim();
      const tel = formData.phone.trim();
      const address = formData.address.trim();

      // 使用 supabase 註冊會員
      const { data, error } = await supabase.auth.signUp({
        // 會員資料，先存成物件再放入
        email: email,
        password: password,
        options: {
          data: {
            name: name,
            tel: tel,
            address: address,
          },
        },
      });

      if (error) {
        throw error; // 手動把錯誤丟給 catch
      }

      console.log("註冊成功！資料如下：", data);

      reset();
      setShowSuccess(true);
    } catch (error) {
      console.error("註冊失敗：", error);

      // 簡單版錯誤提示
      if (error.message?.includes("User already registered")) {
        alert("這個信箱已經註冊過了");
      } else {
        alert(error.message || "註冊失敗，請稍後再試");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * 顯示註冊成功後，1.5 秒跳轉登入頁
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
      <main className="login-bg border-top border-bottom border-lg-0">
        <div className="login container py-lg-14 py-8 px-3 px-lg-0">
          <div className="row align-items-stretch">
            {/* 照片區 */}
            <aside className="col-lg-4 pe-5 d-none d-lg-block">
              <div className="h-100">
                {/* 
                在 Join 內增加 CommonSwiper
                但 CommonSwiper 本身是共用元件，
                所以其他頁也可以直接 import 使用
              */}
                <CommonSwiper
                  slides={joinSlides}
                  renderSlide={renderJoinSlide}
                  options={joinSwiperOptions}
                  className="mySwiper h-100 w-100"
                  swiperClassName="br-24 h-100"
                  showPagination={false}
                  fillHeight={true}
                />
              </div>
            </aside>

            {/* 會員登入資訊 */}
            <div className="col-lg-8 ps-lg-5 px-3">
              <form
                className="h-100"
                id="joinForm"
                onSubmit={handleSubmit(onSubmit)}
              >
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
                          className={getInputClassName("name")}
                          id="nameInput"
                          placeholder="name"
                          title="請輸入中文姓名（至少兩個字）"
                          {...register("name", {
                            required: "請輸入姓名",
                            validate: (value) => {
                              if (!value.trim()) return "請輸入姓名";
                              return (
                                /^[\u4e00-\u9fa5A-Za-z]{2,}$/.test(
                                  value.trim(),
                                ) || "請輸入中文姓名（至少兩個字）"
                              );
                            },
                          })}
                        />
                        <label htmlFor="nameInput" className="px-5">
                          例如：王小明
                        </label>
                      </div>

                      {/* 錯誤訊息 */}
                      {touchedFields.name && errors.name && (
                        <p className="text-danger fs-7 ps-2 mt-2 mb-0">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* 電話 */}
                    <div className="col-lg-6 mb-lg-0 p-0 ps-lg-3">
                      <p className="fs-lg-9 fs-7 text-neutral-100 ps-2 mb-2">
                        電話<span className="text-primary-40">*</span>
                      </p>
                      <div className="form-floating">
                        <input
                          type="tel"
                          className={getInputClassName("phone")}
                          id="phoneInput"
                          placeholder="phone"
                          maxLength={10}
                          title="請輸入有效的台灣手機號碼（09開頭，共10碼數字）"
                          {...register("phone", {
                            required: "請輸入電話",
                            validate: (value) => {
                              if (!value.trim()) return "請輸入電話";
                              return (
                                /^09\d{8}$/.test(value.trim()) ||
                                "請輸入有效的台灣手機號碼（共10碼數字）"
                              );
                            },
                          })}
                        />
                        <label htmlFor="phoneInput" className="px-5">
                          例如：0912345678
                        </label>
                      </div>

                      {/* 錯誤訊息 */}
                      {touchedFields.phone && errors.phone && (
                        <p className="text-danger fs-7 ps-2 mt-2 mb-0">
                          {errors.phone.message}
                        </p>
                      )}
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
                        className={getInputClassName("email")}
                        id="emailInput"
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
                        className={getInputClassName("password")}
                        id="passwordInput"
                        placeholder="Password"
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
                        半形英數共 8 碼
                      </label>
                      <span
                        className="text-neutral-60 material-symbols-outlined position-absolute top-50 end-0 translate-middle-y me-12 cursor-pointer"
                        id="togglePassword"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? "visibility" : "visibility_off"}
                      </span>
                    </div>

                    {/* 錯誤訊息 */}
                    {touchedFields.password && errors.password && (
                      <p className="text-danger fs-7 ps-2 mt-2 mb-0">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* 確認密碼 */}
                  <div className="w-100 mb-8 mb-lg-6">
                    <p className="fs-lg-9 fs-7 text-neutral-100 ps-2 mb-2">
                      確認密碼<span className="text-primary-40">*</span>
                    </p>
                    <div className="form-floating mb-2">
                      <input
                        type={showPasswordRe ? "text" : "password"}
                        className={getInputClassName("passwordRe")}
                        id="passwordReInput"
                        placeholder="Password"
                        {...register("passwordRe", {
                          required: "請再輸入一次密碼",
                          validate: (value) => {
                            if (!value.trim()) return "請再輸入一次密碼";
                            return (
                              value === getValues("password") ||
                              "兩次輸入的密碼不一致"
                            );
                          },
                        })}
                      />
                      <label htmlFor="passwordReInput" className="px-5">
                        請再輸入一次密碼
                      </label>
                      <span
                        className="text-neutral-60 material-symbols-outlined position-absolute top-50 end-0 translate-middle-y me-12 cursor-pointer"
                        id="togglePasswordRe"
                        onClick={() => setShowPasswordRe((prev) => !prev)}
                      >
                        {showPasswordRe ? "visibility" : "visibility_off"}
                      </span>
                    </div>
                    <p
                      className={`fs-lg-9 fs-7 text-danger fs-7 ps-2 ${
                        touchedFields.passwordRe && errors.passwordRe
                          ? ""
                          : "d-none"
                      }`}
                      id="passwordError"
                    >
                      {errors.passwordRe?.message || "請輸入相同密碼！"}
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
                        className={getInputClassName("address")}
                        id="addressInput"
                        placeholder="Password"
                        {...register("address", {
                          required: "請輸入地址",
                          validate: (value) => {
                            if (!value.trim()) return "請輸入地址";
                            return (
                              /^[\u4e00-\u9fa5a-zA-Z0-9\s\-\#之號巷弄樓]{6,}$/.test(
                                value,
                              ) || "請輸入有效地址"
                            );
                          },
                        })}
                      />
                      <label htmlFor="addressInput" className="px-5">
                        例如：忠孝東路四段 123 號 5 樓
                      </label>
                    </div>
                    <p
                      className={`text-danger fs-7 ps-2 ${
                        touchedFields.address && errors.address ? "" : "d-none"
                      }`}
                      id="addressError"
                    >
                      {errors.address?.message || "請輸入地址！"}
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
                        id="joinBtn"
                        disabled={!isValid || isSubmitting}
                      >
                        {isSubmitting ? "註冊中..." : "立即註冊"}
                      </button>
                      {/* 註冊成功畫面 */}
                    </div>
                    {/* 同意退換貨政策＋隱私權政策 */}
                    <p className="text-neutral-100 fs-7 mb-10">
                      建立帳號即表示您同意我們的
                      <a
                        href="#/return"
                        className="fs-lg-9 fs-7 link"
                        id="returnLink"
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => {
                          // 開一個置中的新視窗，並導到 #/return
                          // 這裡傳 "/return" 就好
                          // 因為 function 裡會自動幫你組成完整網址：
                          // http://localhost:5173/#/return
                          e.preventDefault();
                          openCenteredWindow("/return");
                        }}
                      >
                        退換貨政策
                      </a>
                      及
                      <a
                        href="#/privacy"
                        className="fs-lg-9 fs-7 link"
                        id="privacyLink"
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => {
                          // 開一個置中的新視窗，並導到 #/return
                          // 這裡傳 "/return" 就好
                          // 因為 function 裡會自動幫你組成完整網址：
                          // http://localhost:5173/#/return
                          e.preventDefault();
                          openCenteredWindow("/privacy");
                        }}
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
        </div>
      </main>

      {/* 註冊成功畫面 */}
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
      )}
    </>
  );
};

export default Join;
