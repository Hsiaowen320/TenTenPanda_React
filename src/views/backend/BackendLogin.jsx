import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { supabase } from "../../../supabaseClient.js";

function BackendLogin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  //提交登入
  const onSubmit = async (formData) => {
    try {
      const { email, password } = formData;
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        alert(error.message);
        return;
      }
      const isAdmin = await adminChecked();
      if (!isAdmin) {
        alert("你沒有管理員權限");
        return;
      }
      navigate("/admin/product", { replace: true });
    } catch (error) {
      console.error("驗證過程中發生錯誤：", error.message);
    }
  };

  //登入驗證
  const adminChecked = async () => {
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        return false;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error || !data || data.role !== "admin") {
        return false;
      }
      return true;
    } catch (error) {
      console.error("驗證錯誤:", error.message);
      return false;
    }
  };

  //刷新後執行登入驗證
  useEffect(() => {
    const check = async () => {
      const isAdmin = await adminChecked();
      if (!isAdmin) {
        return;
      }
      navigate("/admin/product");
    };
    check();
  }, []);

  return (
    <div className="container login py-24">
      <div className="d-flex justify-content-center align-items-center">
        <div className="col-5">
          <h1 className="fs-4 fw-bold text-center py-5">
            甜甜熊貓｜管理員登入
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 帳號 */}
            <div className="form-floating mb-3">
              <input
                id="email"
                type="email"
                className={`form-control ${errors.email && "border border-danger"}`}
                placeholder="name@example.com"
                autoComplete="email"
                {...register("email", {
                  required: "請輸入帳號",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "請輸入有效的 Email 格式",
                  },
                })}
              />
              {errors.email && (
                <div className="text-danger pt-1">{errors.email.message}</div>
              )}
              <label htmlFor="email">Email address</label>
            </div>
            {/* 密碼 */}
            <div className="form-floating">
              <input
                type="password"
                className={`form-control ${errors.password && "border border-danger"}`}
                placeholder="Password"
                autoComplete="current-password"
                id="password"
                {...register("password", {
                  required: "請輸入密碼",
                })}
              />
              {errors.password && (
                <div className="text-danger pt-1">
                  {errors.password.message}
                </div>
              )}
              <label htmlFor="password">Password</label>
            </div>
            {/* 登入按鈕 */}
            <button
              type="submit"
              className="btn btn-outline-primary-80 my-5 w-100"
            >
              登入
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BackendLogin;
