import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";

function MyFavorite() {
  const [favorites, setFavorites] = useState([]); // 存儲收藏商品
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    getFavorite();
  }, []);

  // 取得會員資收藏商品的 API
  const getFavorite = async () => {
    try {
      // 先獲取當前登入使用者的 ID (確保有登入)
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // 這裡可以寫程式碼 (如跳轉到登入頁面、警告未登入)
      if (!user) {
        alert("請先登入才能收藏商品喔！");
        return;
      }

      const response = await supabase
        .from("favorites") // 資料表名稱
        .select(`*, products(*)`) // 取得資料
        .eq("user_id", user.id) // 加上 user_id 確保是該會員的收藏
        .throwOnError(); // 如果發生錯誤，會直接跳進 catch 區塊

      // 將收藏的商品資料儲存
      const productList = response.data;
      setFavorites(productList);
    } catch (error) {
      console.error("取得失敗：", error.message);
    } finally {
      setLoading(false);
    }
  };

  // 移除會員資收藏商品的 API
  const RemoveFavorite = async (productId) => {
    try {
      // 先獲取當前登入使用者的 ID (確保有登入)
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // 這裡可以寫程式碼 (如跳轉到登入頁面、警告未登入)
      if (!user) {
        alert("請先登入才能收藏商品喔！");
        return;
      }

      const response = await supabase
        .from("favorites") // 資料表名稱
        .delete()
        .eq("product_id", productId) // 指定商品 ID
        .eq("user_id", user.id) // 加上 user_id 確保是刪除該會員的收藏
        .throwOnError(); // 如果發生錯誤，會直接跳進 catch 區塊

      // 再次渲染收藏
      getFavorite();
    } catch (error) {
      console.error("修改失敗：", error.message);
    }
  };

  // 加入購物車的 API
  const updateCart = async (productId, amount, isRelative = true) => {
    try {
      // 先獲取當前登入使用者的 ID (確保有登入)
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // 這裡可以寫程式碼 (如跳轉到登入頁面、警告未登入)
      if (!user) {
        alert("請先登入新增至購物車喔！");
        return;
      }

      // 定義加入購物車商品的最終數量
      let targetQuantity;

      // isRelative 是 true 代表「相對增減」
      // 先查看購物車的數量，再進行更新
      if (isRelative) {
        const response = await supabase
          .from("carts") // 資料表名稱
          .select("qty") // 取得數量
          .eq("product_id", productId) // 指定商品 ID
          .eq("user_id", user.id) // 加上 user_id 確保是更新該會員的購物車資訊
          .maybeSingle() // 如果沒在購物車內會回傳 null
          .throwOnError(); // 如果發生錯誤，會直接跳進 catch 區塊

        const existingItem = response.data;

        // 購物車無此商品：existingItem　會是　null
        // 因此定義 currentQty 去接指定商品的數量（如果沒有則顯示 0)
        const currentQty = existingItem ? existingItem.qty : 0;
        targetQuantity = currentQty + amount;
      } else {
        targetQuantity = amount;
      }

      // 執行 upsert (update + insert)
      const response = await supabase
        .from("carts")
        .upsert(
          {
            product_id: productId,
            user_id: user.id,
            qty: targetQuantity,
          },
          {
            onConflict: "user_id, product_id", // 判斷重複的依據 (若 user_id 和 product_id 都相同，表示這是一筆舊資料)
          },
        )
        .throwOnError(); // 如果發生錯誤，會直接跳進 catch 區塊

      // 這裡寫更新購物車成功的執行程式碼
      console.log("購物車已更新！");
    } catch (error) {
      console.error("操作失敗：", error.message);
    }
  };

  // 分頁邏輯計算
  const totalPages = Math.ceil(favorites.length / ITEMS_PER_PAGE);
  const currentItems = favorites.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <>
      <p className="fs-2 fw-semibold mb-lg-18 mb-8">我的收藏</p>
      {loading ? (
        <div className="text-center py-20">努力翻找收藏中...</div>
      ) : (
        <div className="container" style={{ minHeight: "350px" }}>
          <div className="row" id="favorites-list">
            {currentItems.length > 0 ? (
              currentItems.map((product) => (
                <div
                  key={product.id}
                  className="col-12 col-lg-6 mb-8 favorite-item"
                >
                  <div className="mb-lg-8 product">
                    <div className="position-relative d-inline-block">
                      <Link to={`${product.products.path}/${product.products.id}`}>
                        <div
                          className={`img-box ${
                            product.products.category_id === 1
                              ? "p-0"
                              : product.products.category_id === 2
                                ? "p-18"
                                : product.products.category_id === 3
                                  ? "p-25"
                                  : ""
                          }`}
                        >
                          <img
                            src={product.products.image_title_url}
                            alt={product.products.name}
                            className="img-fluid"
                          />
                        </div>
                      </Link>
                      {/* 愛心按鈕 */}
                      <button
                        type="button"
                        className="favorite-btn active position-absolute top-0 end-0 fs-3 fs-lg-1 border-0 bg-transparent"
                        data-bs-toggle="modal"
                        data-bs-target="#cancelFavoriteModal"
                        onClick={() => RemoveFavorite(product.products.id)}
                      >
                        <i className="bi bi-heart-fill full text-danger"></i>
                      </button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h2 className="fs-6 mb-2">{product.products.name}</h2>
                        <p className="fs-6">$ {product.products.price}</p>
                      </div>
                      <button
                        type="button"
                        className="producList-cart-btn br-999"
                        data-bs-toggle="modal"
                        data-bs-target="#cartModal"
                        onClick={() => updateCart(product.products.id, 1)}
                      >
                        <i className="bi bi-cart2 fs-3 fs-lg-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-18">
                <p className="fs-5 mb-6">目前沒有收藏商品</p>
                <p className="fs-5 mb-6">
                  前往{" "}
                  <Link
                    to="/productList-classic"
                    className="fw-bold text-primary-80"
                  >
                    商品列表
                  </Link>{" "}
                  逛逛吧
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {/* 分頁元件 */}
      {totalPages > 1 && (
        <ul className="d-flex justify-content-center align-items-center list-unstyled mt-8">
          <li
            className="px-3 cursor-pointer"
            style={{
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              opacity: currentPage === 1 ? 0.5 : 1,
            }}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </li>

          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index + 1}
              className={`px-3 cursor-pointer ${currentPage === index + 1 ? "text-primary-60 fw-bold" : ""}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </li>
          ))}

          <li
            className="px-3 cursor-pointer"
            style={{
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              opacity: currentPage === totalPages ? 0.5 : 1,
            }}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </li>
        </ul>
      )}

      {/* 加入購物車 modal */}
      <div
        className="modal fade"
        id="cartModal"
        tabIndex="-1"
        aria-labelledby="cartModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content br-32">
            <div className="modal-body d-flex flex-column justify-content-center align-items-center py-10">
              <div className="mb-5 cart">
                <i className="bi bi-cart2 d-inline-block fs-2"></i>
              </div>

              <p className="fs-6">已加入購物車！</p>
            </div>
          </div>
        </div>
      </div>
      {/* 取消收藏 modal */}
      <div
        className="modal fade"
        id="cancelFavoriteModal"
        tabIndex="-1"
        aria-labelledby="favoritetModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content br-32">
            <div className="modal-body d-flex flex-column justify-content-center align-items-center py-10">
              <div className="mb-5 cart">
                <i className="bi bi-check d-inline-block fs-2"></i>
              </div>
              <p className="fs-6">已取消收藏！</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyFavorite;
