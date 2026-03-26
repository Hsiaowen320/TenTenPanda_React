import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient.js";

/**
 * 這裡先假設你有 adminChecked()
 * 如果你已經有共用函式，請改成正確 import
 * 例如：
 * import { adminChecked } from "@/utils/adminChecked";
 */
const adminChecked = () => {
  const admin = localStorage.getItem("isAdmin");
  if (admin === null) return undefined;
  return admin === "true";
};

const CATEGORY_OPTIONS = [
  { category_id: 1, name: "經典口味" },
  { category_id: 2, name: "季節限定" },
  { category_id: 3, name: "甜甜禮盒" },
];

const BackendProductCreate = () => {
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    english_name: "",
    price: "",
    category_id: "",
    slogan: "",
    highlight: "",
    description: "",
    note: "",
    image_title_url: "",
    image_content_url: "",
  });

  /**
   * 表單欄位更新
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * 新增商品 API
   */
  const createProduct = async (payload) => {
    try {
      // 確認是否為管理者
      const checked = adminChecked();

      // 尚未登入的情況
      // if (checked === undefined) {
      //   alert("請先登入！");
      //   navigate("/login", { replace: true });
      //   return false;
      // }

      // 非管理者的情況
      // if (!checked) {
      //   alert("無此權限！");
      //   navigate("/", { replace: true });
      //   return false;
      // }

      const { error } = await supabase
        .from("products")
        .insert(payload);

      if (error) {
        throw error;
      }

      alert("商品新增成功！");
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
      name: formData.name.trim(),
      english_name: formData.english_name.trim(),
      price: Number(formData.price),
      category_id: Number(formData.category_id),
      slogan: formData.slogan.trim(),
      highlight: formData.highlight.trim(),
      description: formData.description.trim(),
      note: formData.note.trim(),
      image_title_url: formData.image_title_url.trim(),
      image_content_url: formData.image_content_url.trim(),
    };

    // 基本防呆
    if (!payload.name) {
      alert("請輸入中文名稱");
      return;
    }

    if (!payload.english_name) {
      alert("請輸入英文名稱");
      return;
    }

    if (!payload.price || Number.isNaN(payload.price)) {
      alert("請輸入正確價格");
      return;
    }

    if (!payload.category_id || Number.isNaN(payload.category_id)) {
      alert("請選擇商品分類");
      return;
    }

    setSubmitting(true);
    const success = await createProduct(payload);
    setSubmitting(false);

    if (success) {
      navigate("/ProductInfo");
    }
  };

  /**
   * 取消新增
   */
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="backend-product-create-page">
      <div className="backend-product-create-card">
        <form className="backend-product-create-form" onSubmit={handleSubmit}>
          {/* 中文名稱 */}
          <div className="form-row">
            <label className="form-label" htmlFor="name">
              中文名稱
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              placeholder="請輸入商品中文名稱"
            />
          </div>

          {/* 英文名稱 */}
          <div className="form-row">
            <label className="form-label" htmlFor="english_name">
              英文名稱
            </label>
            <input
              id="english_name"
              name="english_name"
              type="text"
              className="form-input"
              value={formData.english_name}
              onChange={handleChange}
              placeholder="請輸入商品英文名稱"
            />
          </div>

          {/* 價格 */}
          <div className="form-row">
            <label className="form-label" htmlFor="price">
              價格(NT)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              className="form-input"
              value={formData.price}
              onChange={handleChange}
              placeholder="請輸入價格"
            />
          </div>

          {/* 商品分類 */}
          <div className="form-row">
            <label className="form-label" htmlFor="category_id">
              商品分類
            </label>
            <select
              id="category_id"
              name="category_id"
              className="form-input form-select"
              value={formData.category_id}
              onChange={handleChange}
            >
              <option value="">請選擇分類</option>
              {CATEGORY_OPTIONS.map((category) => (
                <option
                  key={category.category_id}
                  value={category.category_id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Slogan */}
          <div className="form-row">
            <label className="form-label" htmlFor="slogan">
              Slogan
            </label>
            <input
              id="slogan"
              name="slogan"
              type="text"
              className="form-input"
              value={formData.slogan}
              onChange={handleChange}
              placeholder="請輸入商品 slogan"
            />
          </div>

          {/* highlight */}
          <div className="form-row form-row-top">
            <label className="form-label" htmlFor="highlight">
              highlight
            </label>
            <textarea
              id="highlight"
              name="highlight"
              className="form-input form-textarea"
              value={formData.highlight}
              onChange={handleChange}
              placeholder="請輸入商品 highlight"
            />
          </div>

          {/* 商品詳情 */}
          <div className="form-row form-row-top">
            <label className="form-label" htmlFor="description">
              商品詳情
            </label>
            <textarea
              id="description"
              name="description"
              className="form-input form-textarea"
              value={formData.description}
              onChange={handleChange}
              placeholder="請輸入商品詳情"
            />
          </div>

          {/* 備註 */}
          <div className="form-row">
            <label className="form-label" htmlFor="note">
              備註
            </label>
            <input
              id="note"
              name="note"
              type="text"
              className="form-input"
              value={formData.note}
              onChange={handleChange}
              placeholder="請輸入備註"
            />
          </div>

          {/* 商品資訊圖片 */}
          <div className="form-row">
            <label className="form-label" htmlFor="image_title_url">
              商品資訊圖片
            </label>
            <input
              id="image_title_url"
              name="image_title_url"
              type="text"
              className="form-input"
              value={formData.image_title_url}
              onChange={handleChange}
              placeholder="https://xxxxx"
            />
          </div>

          {/* 商品詳情圖片 */}
          <div className="form-row">
            <label className="form-label" htmlFor="image_content_url">
              商品詳情圖片
            </label>
            <input
              id="image_content_url"
              name="image_content_url"
              type="text"
              className="form-input"
              value={formData.image_content_url}
              onChange={handleChange}
              placeholder="https://xxxxx"
            />
          </div>

          {/* 按鈕 */}
          <div className="form-actions">
            <button
              type="button"
              className="action-btn action-btn-cancel"
              onClick={handleCancel}
            >
              取消新增
            </button>

            <button
              type="submit"
              className="action-btn action-btn-submit"
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

export default BackendProductCreate;