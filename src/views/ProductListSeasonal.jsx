import { Link } from "react-router-dom";
import home from "@/assets/images/home.webp";
import 星塵草莓 from "@/assets/images/星塵草莓（光暈）.webp";
import 白雪綿霜莓 from "@/assets/images/白雪綿霜莓（光暈）.webp";
import 莓果可可 from "@/assets/images/莓果可可（光暈）.webp";
import 雪莓蒙布朗 from "@/assets/images/雪莓蒙布朗（光暈）.webp";
import 熱紅酒莓果 from "@/assets/images/熱紅酒莓果（光暈）.webp";
import 莓果夾心 from "@/assets/images/莓果夾心（光暈）.webp";

const ProductListSeasonal = () => {
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
                <a href="./productList-seasonal.html">季節限定</a>
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
                    className="text-neutral-90 fs-4"
                  >
                    經典口味
                  </Link>
                </li>
                <li className="mb-lg-12">
                  <Link
                    to="/productList-seasonal"
                    className="text-primary-60 fs-4"
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
              <div className="row">
                <div className="col-12 col-lg-6 ps-lg-8 pe-lg-0 mb-8">
                  <div className="mb-lg-8 product" data-id="starberry">
                    <a
                      href="./item_details-starberry.html"
                      className="position-relative d-inline-block"
                    >
                      <div className="img-box p-18">
                        <img
                          src={星塵草莓}
                          alt="星塵草莓"
                          className="img-fluid"
                        />
                      </div>
                      {/* 加入收藏 */}
                      <button
                        type="button"
                        className="favorite-btn position-absolute top-0 end-0 fs-3 fs-lg-1"
                        data-bs-toggle="modal"
                        data-bs-target="#favoriteModal"
                      >
                        <i className="bi bi-heart empty"></i>
                        <i className="bi bi-heart-fill full"></i>
                      </button>
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h2 className="fs-6 mb-2">星塵草莓</h2>
                        <p className="fs-6">$ 95</p>
                      </div>
                      {/* 加入購物車 */}
                      <button
                        type="button"
                        className="producList-cart-btn br-999"
                        data-bs-toggle="modal"
                        data-bs-target="#cartModal"
                      >
                        <i className="bi bi-cart2 fs-3 fs-lg-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6 ps-lg-8 pe-lg-0 mb-8">
                  <div className="mb-lg-8 product" data-id="snowberry">
                    <a
                      href="./item_details-snowberry.html"
                      className="position-relative d-inline-block"
                    >
                      <div className="img-box p-18">
                        <img
                          src={白雪綿霜莓}
                          alt="白雪綿霜莓"
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
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h2 className="fs-6 mb-2">白雪綿霜莓</h2>
                        <p className="fs-6">$ 95</p>
                      </div>
                      {/* 加入購物車 */}
                      <button
                        type="button"
                        className="producList-cart-btn br-999"
                        data-bs-toggle="modal"
                        data-bs-target="#cartModal"
                      >
                        <i className="bi bi-cart2 fs-3 fs-lg-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6 ps-lg-8 pe-lg-0 mb-8">
                  <div className="mb-lg-8 product" data-id="berrycoco">
                    <a
                      href="./item_details-berrycoco.html"
                      className="position-relative d-inline-block"
                    >
                      <div className="img-box p-18">
                        <img
                          src={莓果可可}
                          alt="莓果可可"
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
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h2 className="fs-6 mb-2">莓果可可</h2>
                        <p className="fs-6">$ 95</p>
                      </div>
                      {/* 加入購物車 */}
                      <button
                        type="button"
                        className="producList-cart-btn br-999"
                        data-bs-toggle="modal"
                        data-bs-target="#cartModal"
                      >
                        <i className="bi bi-cart2 fs-3 fs-lg-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6 ps-lg-8 pe-lg-0 mb-8">
                  <div className="mb-lg-8 product" data-id="SnowberryMont">
                    <a
                      href="./item_details-SnowberryMont.html"
                      className="position-relative d-inline-block"
                    >
                      <div className="img-box p-18">
                        <img
                          src={雪莓蒙布朗}
                          alt="雪莓蒙布朗"
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
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h2 className="fs-6 mb-2">雪莓蒙布朗</h2>
                        <p className="fs-6">$ 95</p>
                      </div>
                      {/* 加入購物車 */}
                      <button
                        type="button"
                        className="producList-cart-btn br-999"
                        data-bs-toggle="modal"
                        data-bs-target="#cartModal"
                      >
                        <i className="bi bi-cart2 fs-3 fs-lg-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6 ps-lg-8 pe-lg-0 mb-8">
                  <div className="mb-lg-8 product" data-id="wineberry">
                    <a
                      href="./item_details-wineberry.html"
                      className="position-relative d-inline-block"
                    >
                      <div className="img-box p-18">
                        <img
                          src={熱紅酒莓果}
                          alt="熱紅酒莓果"
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
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h2 className="fs-6 mb-2">熱紅酒莓果</h2>
                        <p className="fs-6">$ 95</p>
                      </div>
                      {/* 加入購物車 */}
                      <button
                        type="button"
                        className="producList-cart-btn br-999"
                        data-bs-toggle="modal"
                        data-bs-target="#cartModal"
                      >
                        <i className="bi bi-cart2 fs-3 fs-lg-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6 ps-lg-8 pe-lg-0 mb-8">
                  <div className="mb-lg-8 product" data-id="frostBerry">
                    <a
                      href="./item_details-frostBerry.html"
                      className="position-relative d-inline-block"
                    >
                      <div className="img-box p-18">
                        <img
                          src={莓果夾心}
                          alt="莓果夾心"
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
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h2 className="fs-6 mb-2">莓果夾心</h2>
                        <p className="fs-6">$ 95</p>
                      </div>
                      {/* 加入購物車 */}
                      <button
                        type="button"
                        className="producList-cart-btn br-999"
                        data-bs-toggle="modal"
                        data-bs-target="#cartModal"
                      >
                        <i className="bi bi-cart2 fs-3 fs-lg-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
                {/*  */}
              </div>
              <ul className="d-flex justify-content-center align-items-center">
                <li className="px-3">
                  <span className="material-symbols-outlined">
                    {" "}
                    chevron_left{" "}
                  </span>
                </li>
                <li className="px-3 text-primary-60">1</li>
                <li className="px-3">
                  <span className="material-symbols-outlined">
                    {" "}
                    chevron_right{" "}
                  </span>
                </li>
              </ul>
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

export default ProductListSeasonal;
