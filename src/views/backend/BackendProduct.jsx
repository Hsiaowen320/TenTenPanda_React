import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient.js";


const CATEGORY_OPTIONS = [
  { category_id: 1, name: "經典口味" },
  { category_id: 2, name: "季節限定" },
  { category_id: 3, name: "甜甜禮盒" },
];

const BackendProduct = () => {
  const navigate = useNavigate();

  // 商品原始資料
  const [products, setProducts] = useState([]);

  // 載入狀態
  const [loading, setLoading] = useState(true);

  // 錯誤訊息
  const [errorMessage, setErrorMessage] = useState("");

  // 搜尋名稱
  const [searchName, setSearchName] = useState("");

  // 商品分類篩選
  const [selectedCategory, setSelectedCategory] = useState("");

  /**
   * 取得商品資料
   */
  const getProduct = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error("取得失敗：", error.message);
      setErrorMessage("商品資料取得失敗，請稍後再試");
      return [];
    } finally {
      setLoading(false);
    }
  };

  /**
   * 頁面初始化
   */
  useEffect(() => {
    const initPage = async () => {
      const data = await getProduct();
      setProducts(data);
    };

    initPage();
  }, []);

  /**
   * category_id 轉中文分類名稱
   */
  const getCategoryName = (categoryId) => {
    const category = CATEGORY_OPTIONS.find(
      (item) => Number(item.category_id) === Number(categoryId),
    );
    return category ? category.name : "未分類";
  };

  /**
   * 依搜尋文字 + 分類過濾商品
   */
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchName = product.name
        ?.toLowerCase()
        .includes(searchName.trim().toLowerCase());

      const matchCategory = selectedCategory
        ? Number(product.category_id) === Number(selectedCategory)
        : true;

      return matchName && matchCategory;
    });
  }, [products, searchName, selectedCategory]);

  /**
   * 點擊編輯商品
   */
  const handleEdit = (id) => {
    navigate(`/admin/productedit/${id}`);
  };

  /**
   * 點擊刪除商品
   * 目前先做確認視窗
   */
  const handleDelete = (id, name) => {
    const confirmed = window.confirm(`確定要刪除商品「${name}」嗎？`);
    if (!confirmed) return;

    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="product-info-page">
      <main className="product-content">
        <div className="product-header">
          <h2 className="product-page-title">商品資訊</h2>

          <div className="product-toolbar">
            {/* 搜尋商品名稱 */}
            <div className="search-box">
              <span className="material-symbols-outlined search-icon">
                search
              </span>
              <input
                type="text"
                placeholder="輸入名稱"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="search-input"
              />
            </div>

            {/* 商品分類 */}
            <select
              className="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">全部分類</option>
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
        </div>

        <div className="product-add-row">
          <button
            type="button"
            className="add-product-btn"
            onClick={() => navigate("/admin/productcreate")}
          >
            ＋ 新增商品
          </button>
        </div>

        {/* 載入中 */}
        {loading && (
          <div className="product-status-box">
            <p>商品載入中...</p>
          </div>
        )}

        {/* 錯誤 */}
        {!loading && errorMessage && (
          <div className="product-status-box error">
            <p>{errorMessage}</p>
          </div>
        )}

        {/* 無資料 */}
        {!loading && !errorMessage && filteredProducts.length === 0 && (
          <div className="product-status-box">
            <p>目前沒有符合條件的商品</p>
          </div>
        )}

        {/* 商品列表 */}
        {!loading && !errorMessage && filteredProducts.length > 0 && (
          <div className="product-list">
            {filteredProducts.map((product) => (
              <div className="product-row" key={product.id}>
                {/* 商品圖片 */}
                <div className="product-cover">
                  <img
                    src={product.image_title_url || ""}
                    alt={product.name}
                    className="product-cover-img"
                  />
                </div>

                {/* 商品名稱 */}
                <div className="product-name-block">
                  <h3 className="product-name">{product.name}</h3>
                  <span className="product-category-tag">
                    {getCategoryName(product.category_id)}
                  </span>
                </div>

                {/* 編輯 / 刪除 */}
                <div className="product-action-group">
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => handleEdit(product.id)}
                    aria-label={`編輯 ${product.name}`}
                    title="編輯"
                  >
                    <span className="material-symbols-outlined">
                      edit_square
                    </span>
                  </button>

                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => handleDelete(product.id, product.name)}
                    aria-label={`刪除 ${product.name}`}
                    title="刪除"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BackendProduct;