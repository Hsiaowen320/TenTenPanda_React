import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../../supabaseClient";

function MyProfile() {
  const [isEdit, setIsEdit] = useState(false); // 控制編輯模式
  const [initialInfoData, setInitialInfoData] = useState({}); // 會員資料

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialInfoData,
  });

  // 取得會員資料的 API
  useEffect(() => {
    const getMemberInfo = async () => {
      try {
        // 先獲取當前登入使用者的 ID (確保有登入)
        const {
          data: { user },
        } = await supabase.auth.getUser();

        // 這裡可以寫程式碼 (如跳轉到登入頁面、警告未登入)
        if (!user) {
          throw new Error("請先登入！");
        }

        const response = await supabase
          .from("profiles") // 資料表名稱
          .select(`*`) // 取得資料
          .eq("id", user.id) // 加上 user_id 確保是該會員的資料
          .throwOnError(); // 如果發生錯誤，會直接跳進 catch 區塊

        // 儲存會員的原始資料
        setInitialInfoData(response.data[0]);
        // 拿到資料馬上重製表單
        reset(response.data[0]);
      } catch (error) {
        console.error("取得會員資料失敗：", error.message);
      }
    };
    getMemberInfo();

    if (Object.keys(initialInfoData).length > 0) {
      reset(initialInfoData);
    }    

  }, [reset]);

  // 更新會員資料的 API
  const updateProfile = async (updates) => {
    try {
      // 先獲取當前登入使用者的 ID (確保有登入)
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // 這裡可以寫程式碼 (如跳轉到登入頁面、警告未登入)
      if (!user) {
        throw new Error("請先登入！");
      }

      // 將不想被更新的欄位分離出來，而 finalUpdates 就是要修改的內容
      const { id, email, role, ...finalUpdates } = updates;

      // 執行會員資料更新
      const response = await supabase
        .from("profiles") // 資料表名稱
        .update(finalUpdates) // 更新特定的資料
        .eq("id", user.id) // 只更新 ID 等於目前登入者的那一行
        .throwOnError(); // 如果發生錯誤，會直接跳進 catch 區塊

      // 這裡寫更新成功的執行程式碼
      alert("資料修改成功！");
    } catch (error) {
      console.error("修改失敗：", error.message);
    }
  };

  // 儲存資料按鈕
  const onSubmit = (updateData) => {
    updateProfile(updateData);
    setIsEdit(false);
  };

  // 取消按鈕
  const handleCancel = () => {
    reset(initialInfoData); // 還原初始資料
    setIsEdit(false);
  };

  if (!initialInfoData) return <p>載入中...</p>;

  return (
    <>
      <p className="fs-2 fw-semibold mb-lg-12 mb-8">個人資訊</p>
      <div className="container min-vh-100">
        <div className="row">
          {/* 編輯按鈕 */}
          {/* 未編輯狀態則顯示此按鈕 */}
          <div className="d-flex justify-content-end mb-2">
            <button
              type="button"
              className="btn btn-primary-40 text-neutral-white"
              style={{ 
                visibility: isEdit ? "hidden" : "visible",
                pointerEvents: isEdit ? "none" : "auto" // 隱藏時防止點擊
              }}
              onClick={() => setIsEdit(true)}
            >
              編輯會員資料
            </button>
          </div>

          {/* 表單 */}
          <form onSubmit={handleSubmit(onSubmit)} className="my-4">
            {/* 姓名 */}
            <div className="mb-8">
              <label htmlFor="name" className="form-label fs-9 ps-5 mb-2">
                姓名
              </label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                {...register("name", { required: "姓名必填" })}
                disabled={!isEdit}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>

            {/* E-mail */}
            <div className="mb-8">
              <label htmlFor="email" className="form-label fs-9 ps-5 mb-2">
                電子信箱
              </label>
              <input
                type="email"
                className="form-control"
                value={initialInfoData.email || ""}
                disabled
              />
            </div>

            {/* 電話 */}
            <div className="mb-8">
              <label htmlFor="tel" className="form-label fs-9 ps-5 mb-2">
                聯絡電話
              </label>
              <input
                type="text"
                className={`form-control ${errors.tel ? "is-invalid" : ""}`}
                {...register("tel", { required: "電話必填" })}
                disabled={!isEdit}
              />
              {errors.tel && (
                <div className="invalid-feedback">{errors.tel.message}</div>
              )}
            </div>

            {/* 地址 */}
            <div className="mb-8">
              <label htmlFor="address" className="form-label fs-9 ps-5 mb-2">
                收貨地址（預設）
              </label>
              <input
                type="text"
                className={`form-control ${errors.address ? "is-invalid" : ""}`}
                {...register("address", { required: "地址必填" })}
                disabled={!isEdit}
              />
              {errors.address && (
                <div className="invalid-feedback">{errors.address.message}</div>
              )}
            </div>

            {/* 儲存 / 取消按鈕 */}
            {isEdit && (
              <div className="d-flex justify-content-center justify-content-lg-end mt-4 mb-2">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={handleCancel}
                >
                  取消修改
                </button>
                <button
                  type="submit"
                  className="btn btn-primary-40 text-neutral-white"
                >
                  確認修改
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
