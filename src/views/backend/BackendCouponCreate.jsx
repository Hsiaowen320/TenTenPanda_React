import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const BackendCouponCreate = () => {
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    discount_value: "",
    min_spend: "",
    is_active: "true",
  });

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
   * 新增優惠券 API
   */
  const handleCreateCoupon = async (payload) => {
    try {
      // 確認是否為管理者
      const checked = adminChecked();

      // 尚未登入的情況
      if (checked === undefined) {
        alert("請先登入！");
        navigate("/login", { replace: true });
        return false;
      }

      // 非管理者的情況
      if (!checked) {
        alert("無此權限！");
        navigate("/", { replace: true });
        return false;
      }

      const { error } = await supabase
        .from("coupons")
        .insert(payload);

      if (error) {
        throw error;
      }

      alert("優惠券新增成功！");
      return true;
    } catch (error) {
      console.error("新增失敗：", error.message);
      alert("新增失敗，請稍後再試");
      return false;
    }
  };

  /**
   * 送出新增
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: formData.id.trim(),
      title: formData.title.trim(),
      discount_value: Number(formData.discount_value),
      min_spend: Number(formData.min_spend),
      is_active: formData.is_active === "true",
    };

    if (!payload.id) {
      alert("請輸入折扣優惠碼");
      return;
    }

    if (!payload.title) {
      alert("請輸入標題名稱");
      return;
    }

    if (Number.isNaN(payload.discount_value)) {
      alert("請輸入正確的折抵價格");
      return;
    }

    if (Number.isNaN(payload.min_spend)) {
      alert("請輸入正確的最低消費金額");
      return;
    }

    setSubmitting(true);
    const success = await handleCreateCoupon(payload);
    setSubmitting(false);

    if (success) {
      navigate("/Coupon");
    }
  };

  /**
   * 取消新增
   */
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="coupon-create-page">
      <div className="coupon-create-card">
        <form className="coupon-create-form" onSubmit={handleSubmit}>
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
              onChange={handleChange}
              placeholder="例如：MARCH100"
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
              placeholder="例如：三月特惠折抵"
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
              placeholder="例如：100"
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
              placeholder="例如：300"
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
              className="coupon-action-btn coupon-action-btn-cancel"
              onClick={handleCancel}
            >
              取消新增
            </button>

            <button
              type="submit"
              className="coupon-action-btn coupon-action-btn-submit"
              disabled={submitting}
            >
              {submitting ? "新增中..." : "確認新增"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BackendCouponCreate;