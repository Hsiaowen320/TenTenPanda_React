import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../../supabaseClient.js";

/**
 * 這裡先假設你有 adminChecked()
 * 如果你已經有共用函式，請改成正確 import
 * 例如：
 * import { adminChecked } from "@/utils/adminChecked";
 */
const adminChecked = () => {
  // 這裡先示意，請換成你專案內真正的管理者判斷邏輯
  const admin = localStorage.getItem("isAdmin");
  if (admin === null) return undefined;
  return admin === "true";
};

const CATEGORY_OPTIONS = [
  { category_id: 1, name: "經典口味" },
  { category_id: 2, name: "季節限定" },
  { category_id: 3, name: "甜甜禮盒" },
];

const BackendProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
   * 取得單筆商品資料
   */
  const getProductDetail = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      setFormData({
        name: data.name || "",
        english_name: data.english_name || "",
        price: data.price ?? "",
        category_id: data.category_id ?? "",
        slogan: data.slogan || "",
        highlight: data.highlight || "",
        description: data.description || "",
        note: data.note || "",
        image_title_url: data.image_title_url || "",
        image_content_url: data.image_content_url || "",
      });
    } catch (error) {
      console.error("取得商品資料失敗：", error.message);
      setErrorMessage("商品資料載入失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  /**
   * 初始化
   */
  useEffect(() => {
    if (!id) return;
    getProductDetail();
  }, [id]);

  /**
   * 表單欄位更新
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // 判斷是否為需要「防呆」的欄位（例如價格）
    let finalValue = value;

    if (name === "price") {
      // 如果使用者輸入負數，強制轉回 0；若為空字串則保持空（方便使用者編輯）
      finalValue = value === "" ? "" : Math.max(0, parseFloat(value));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  /**
   * 編輯商品 API
   */
  const updateProduct = async (productId, updates) => {
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

      // 將不想被更新的欄位分離出來，而 finalUpdates 就是要修改的內容
      const { path, ...finalUpdates } = updates;

      const { error } = await supabase
        .from("products") // 資料表名稱
        .update(finalUpdates) // 更新特定的資料
        .eq("id", productId) // 只更新 ID 等於產品id的那一行

      if (error) {
        throw error;
      }

      // 這裡寫更新成功的執行程式碼
      alert("資料修改成功！");
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

    setSubmitting(true);
    const success = await updateProduct(Number(id), updates);
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
      <div className="backend-product-edit-page">
        <div className="backend-product-edit-card">
          <p className="backend-product-edit-status">商品資料載入中...</p>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="backend-product-edit-page">
        <div className="backend-product-edit-card">
          <p className="backend-product-edit-status error">{errorMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="backend-product-edit-page">
      <div className="backend-product-edit-card">
        <form className="backend-product-edit-form" onSubmit={handleSubmit}>
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
              min="0"
              onKeyDown={(e) => { if (e.key === '-') e.preventDefault(); }}
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
              取消修改
            </button>

            <button
              type="submit"
              className="action-btn action-btn-submit"
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

export default BackendProductEdit;