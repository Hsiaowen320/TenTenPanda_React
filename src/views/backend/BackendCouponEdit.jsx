import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../../supabaseClient.js";

/**
 * 這裡先假設你有 adminChecked()
 * 如果你已經有共用函式，請改成正確 import
 */
const adminChecked = () => {
  const admin = localStorage.getItem("isAdmin");
  if (admin === null) return undefined;
  return admin === "true";
};

const BackendCouponEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    discount_value: "",
    min_spend: "",
    is_active: "true",
  });

  /**
   * 取得單筆優惠券資料
   */
  const getCouponDetail = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("coupons")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      setFormData({
        id: data.id || "",
        title: data.title || "",
        discount_value: data.discount_value ?? "",
        min_spend: data.min_spend ?? "",
        is_active: String(data.is_active),
      });
    } catch (error) {
      console.error("取得優惠券資料失敗：", error.message);
      setErrorMessage("優惠券資料載入失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  /**
   * 初始化
   */
  useEffect(() => {
    if (!id) return;
    getCouponDetail();
  }, [id]);

  /**
   * 表單更新
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * 編輯優惠券 API
   */
  const handleEditCoupon = async (couponId, updates) => {
    try {
      // 確認是否為管理者
      const checked = adminChecked();

      // 尚未登入的情況
      //   if (checked === undefined) {
      //     alert("請先登入！");
      //     navigate("/login", { replace: true });
      //     return false;
      //   }

      // 非管理者的情況
      //   if (!checked) {
      //     alert("無此權限！");
      //     navigate("/", { replace: true });
      //     return false;
      //   }

      const { error } = await supabase
        .from("coupons") // 資料表名稱
        .update(updates) // 注意這裡不能更改 id 資料
        .eq("id", couponId); // 條件：id 必須等於傳入的 couponId

      if (error) {
        throw error;
      }

      // console.log("優惠券編輯成功！");
      alert("優惠券修改成功！");
      return true;
    } catch (error) {
      console.error("修改失敗：", error.message);
      alert("修改失敗，請稍後再試");
      return false;
    }
  };

  /**
   * 送出修改
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) return;

    const updates = {
      title: formData.title.trim(),
      discount_value: Number(formData.discount_value),
      min_spend: Number(formData.min_spend),
      is_active: formData.is_active === "true",
    };

    if (!formData.id.trim()) {
      alert("請輸入折扣優惠碼");
      return;
    }

    if (!updates.title) {
      alert("請輸入標題名稱");
      return;
    }

    if (Number.isNaN(updates.discount_value)) {
      alert("請輸入正確的折抵價格");
      return;
    }

    if (Number.isNaN(updates.min_spend)) {
      alert("請輸入正確的最低消費金額");
      return;
    }

    setSubmitting(true);
    const success = await handleEditCoupon(id, updates);
    setSubmitting(false);

    if (success) {
      navigate(-1);
    }
  };

  /**
   * 取消修改
   */
  const handleCancel = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="coupon-edit-page">
        <div className="coupon-edit-card">
          <p className="coupon-edit-status">優惠券資料載入中...</p>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="coupon-edit-page">
        <div className="coupon-edit-card">
          <p className="coupon-edit-status error">{errorMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="coupon-edit-page">
      <div className="coupon-edit-card">
        <form className="coupon-edit-form" onSubmit={handleSubmit}>
          {/* 折扣優惠碼 */}
          <div className="coupon-form-row">
            <label className="coupon-form-label" htmlFor="id">
              折扣優惠碼
            </label>
            <input
              id="id"
              name="id"
              type="text"
              className="coupon-form-input"
              value={formData.id}
              readOnly
            />
          </div>

          {/* 標題名稱 */}
          <div className="coupon-form-row">
            <label className="coupon-form-label" htmlFor="title">
              標題名稱
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="coupon-form-input"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          {/* 折抵價格 */}
          <div className="coupon-form-row">
            <label className="coupon-form-label" htmlFor="discount_value">
              折抵價格(NT)
            </label>
            <input
              id="discount_value"
              name="discount_value"
              type="number"
              className="coupon-form-input"
              value={formData.discount_value}
              onChange={handleChange}
            />
          </div>

          {/* 最低消費金額 */}
          <div className="coupon-form-row">
            <label className="coupon-form-label" htmlFor="min_spend">
              最低消費金額
            </label>
            <input
              id="min_spend"
              name="min_spend"
              type="number"
              className="coupon-form-input"
              value={formData.min_spend}
              onChange={handleChange}
            />
          </div>

          {/* 是否啟用 */}
          <div className="coupon-form-row">
            <label className="coupon-form-label" htmlFor="is_active">
              是否啟用
            </label>
            <select
              id="is_active"
              name="is_active"
              className="coupon-form-input coupon-form-select"
              value={formData.is_active}
              onChange={handleChange}
            >
              <option value="true">啟用</option>
              <option value="false">停用</option>
            </select>
          </div>

          {/* 按鈕 */}
          <div className="coupon-form-actions">
            <button
              type="button"
              className="coupon-action-btn coupon-action-btn-cancel btn btn-primary-40"
              onClick={handleCancel}
            >
              取消修改
            </button>

            <button
              type="submit"
              className="coupon-action-btn coupon-action-btn-submit btn btn-primary-40"
              disabled={submitting}
            >
              {submitting ? "修改中..." : "確認修改"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BackendCouponEdit;
