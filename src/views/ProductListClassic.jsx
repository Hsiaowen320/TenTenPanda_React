import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { updateCart } from "@/api/cart";
import { Modal } from "bootstrap";

import home from "@/assets/images/home.webp";
import 經典甜甜 from "@/assets/images/經典甜甜.webp";
import 芝麻甜甜 from "@/assets/images/芝麻甜甜.webp";
import 抹茶甜甜 from "@/assets/images/抹茶甜甜.webp";
import 生乳檸檬甜甜 from "@/assets/images/生乳檸檬甜甜.webp";
import 焦糖可可甜甜 from "@/assets/images/焦糖可可甜甜.webp";
import 莓果甜甜 from "@/assets/images/莓果甜甜.webp";

const ProductListClassic = () => {
  const navigate = useNavigate();

  // 商品資料
  const [products, setProducts] = useState([]);

  // 載入中
  const [loading, setLoading] = useState(true);

  // 錯誤訊息
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * english_name 對應本地圖片
   * 如果資料庫 image_title_url 暫時沒有值
   * 就先退回本地圖片
   */

  /**
   * 取得經典口味商品
   * category_id = 1
   */
  const getClassicProducts = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category_id", 1)
        .order("id", { ascending: true });

      if (error) {
        throw error;
      }

      setProducts(data || []);
    } catch (error) {
      console.error("取得商品失敗：", error.message);
      setErrorMessage("商品資料取得失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  /**
   * 進頁面時撈資料
   */
  useEffect(() => {
    getClassicProducts();
  }, []);

  /**
   * 點商品卡片 / 圖片 / 標題時，進商品詳情頁
   * 使用 english_name 當 id
   */
  const handleGoDetail = (id) => {
    navigate(`/productList-classic/${id}`);
  };

  const handleAddToCart = async (productId, event) => {
    // 避免點購物車按鈕時觸發外層商品卡片點擊
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const success = await updateCart(productId, 1, true);

    // 沒成功（例如未登入）就直接結束，不開 modal
    if (success !== true) return;

    const modalElement = document.getElementById("cartModal");
    if (modalElement) {
      const modalInstance = new Modal(modalElement);
      modalInstance.show();
    }
  };

  return (
    <>
      <section className="p-lg-0 mt-8 mt-lg-14 container mx-lg-auto mb-lg-16">
        {/* 麵包屑 */}
        <div className="mb-lg-12 mb-4">
          <nav aria-label="breadcrumb">
            <ol
              className="breadcrumb"
              style={{ "--bs-breadcrumb-divider": '""' }}
            >
              <li className="breadcrumb-item d-flex align-items-center ms-5">
                <Link to="/">
                  <img src={home} alt="首頁超連結" />
                </Link>
              </li>
              <span className="text-neutral-60 material-symbols-outlined ms-5">
                keyboard_double_arrow_right
              </span>
              <li className="text-neutral-60 breadcrumb-item d-flex align-items-center ms-5">
                <p>商品列表</p>
              </li>
              <span className="text-neutral-60 material-symbols-outlined ms-5">
                keyboard_double_arrow_right
              </span>
              <li className="breadcrumb-item d-flex align-items-center ms-5">
                <Link to="/productList-classic">經典口味</Link>
              </li>
            </ol>
          </nav>
        </div>

        {/* 商品列表 */}
        <div className="container">
          <div className="row">
            <div className="d-none d-lg-block col-lg-3">
              <ul>
                <li className="mb-lg-12">
                  <Link
                    to="/productList-classic"
                    className="text-primary-60 fs-4"
                  >
                    經典口味
                  </Link>
                </li>
                <li className="mb-lg-12">
                  <Link
                    to="/productList-seasonal"
                    className="text-neutral-90 fs-4"
                  >
                    季節限定
                  </Link>
                </li>
                <li>
                  <Link
                    to="/productList-giftbox"
                    className="text-neutral-90 fs-4"
                  >
                    甜甜禮盒
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-12 col-lg-9">
              {/* 載入中 */}
              {loading && (
                <div className="text-center py-10">
                  <p className="fs-5 text-neutral-100">商品載入中...</p>
                </div>
              )}

              {/* 錯誤 */}
              {!loading && errorMessage && (
                <div className="text-center py-10">
                  <p className="fs-5 text-danger">{errorMessage}</p>
                </div>
              )}

              {/* 無資料 */}
              {!loading && !errorMessage && products.length === 0 && (
                <div className="text-center py-10">
                  <p className="fs-5 text-neutral-100">目前沒有商品資料</p>
                </div>
              )}

              {/* 商品卡片 */}
              {!loading && !errorMessage && products.length > 0 && (
                <>
                  <div className="row">
                    {products.map((product) => {
                      /**
                       * 商品列表圖：
                       * 1. 優先使用資料庫的 image_title_url
                       * 2. 若沒有值，才退回本地圖片
                       */
                      const imageSrc =
                        product.image_title_url ||
                        "";

                      return (
                        <div
                          className="col-12 col-lg-6 ps-lg-8 pe-lg-0 mb-8"
                          key={product.id}
                        >
                          <div
                            className="mb-lg-8 product"
                            data-id={product.english_name}
                          >
                            <div
                              className="position-relative d-inline-block w-100 cursor-pointer"
                              onClick={() => handleGoDetail(product.id)}
                            >
                              <div className="img-box">
                                <img
                                  src={imageSrc}
                                  alt={product.name}
                                  className="img-fluid"
                                />
                              </div>

                              {/* 加入收藏 */}
                              <button
                                type="button"
                                className="favorite-btn position-absolute top-0 end-0 fs-3 fs-lg-1"
                                data-bs-toggle="modal"
                                data-bs-target="#favoriteModal"
                                onClick={(event) => {
                                  event.preventDefault();
                                  event.stopPropagation();
                                }}
                              >
                                <i className="bi bi-heart empty"></i>
                                <i className="bi bi-heart-fill full"></i>
                              </button>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h2
                                  className="fs-6 mb-2 cursor-pointer"
                                  onClick={() => handleGoDetail(product.id)}
                                >
                                  {product.name}
                                </h2>
                                <p className="fs-6">$ {product.price}</p>
                              </div>

                              {/* 加入購物車 */}
                              <button
                                type="button"
                                className="producList-cart-btn br-999"
                                onClick={(event) =>
                                  handleAddToCart(product.id, event)
                                }
                              >
                                <i className="bi bi-cart2 fs-3 fs-lg-2"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <ul className="d-flex justify-content-center align-items-center">
                    <li className="px-3">
                      <span className="material-symbols-outlined">
                        chevron_left
                      </span>
                    </li>
                    <li className="px-3 text-primary-60">1</li>
                    <li className="px-3">
                      <span className="material-symbols-outlined">
                        chevron_right
                      </span>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {/* 購物車 */}
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

      {/* 收藏 */}
      <div
        className="modal fade"
        id="favoriteModal"
        tabIndex="-1"
        aria-labelledby="favoritetModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content br-32">
            <div className="modal-body d-flex flex-column justify-content-center align-items-center py-10">
              <div className="mb-5 cart">
                <i className="bi bi-heart-fill d-inline-block fs-2"></i>
              </div>
              <p className="fs-6">已加入願望清單！</p>
            </div>
          </div>
        </div>
      </div>

      {/* 取消收藏 */}
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
};

export default ProductListClassic;
