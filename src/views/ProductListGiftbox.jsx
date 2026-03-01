import { Link } from "react-router-dom";
import home from "@/assets/images/home.webp";
import 經典甜甜禮盒6入去背 from "@/assets/images/經典甜甜-禮盒-6入-去背.webp";
import 綜合甜甜禮盒6入去背 from "@/assets/images/綜合甜甜-禮盒-6入-去背.webp";
import 經典甜甜禮盒12入去背 from "@/assets/images/經典甜甜-禮盒-12入-去背.webp";
import 綜合甜甜禮盒12入去背 from "@/assets/images/綜合甜甜-禮盒-12入-去背.webp";

const ProductListGiftbox = () => {
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
                <Link to="/productList-giftbox">甜甜禮盒</Link>
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
                    className="text-neutral-90 fs-4"
                  >
                    季節限定
                  </Link>
                </li>
                <li>
                  <Link
                    to="/productList-giftbox"
                    className="text-primary-60 fs-4"
                  >
                    甜甜禮盒
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-12 col-lg-9">
              <div className="row">
                <div className="col-12 col-lg-6 ps-lg-8 pe-lg-0 mb-8">
                  <div className="mb-lg-8 product" data-id="giftbox_Six">
                    <a
                      href="./item_details-giftbox_six.html"
                      className="position-relative d-inline-block"
                    >
                      <div className="img-box p-25">
                        <img
                          src={經典甜甜禮盒6入去背}
                          alt="經典甜甜-禮盒-6入"
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
                        <h2 className="fs-6 mb-2">經典甜甜-禮盒-6入</h2>
                        <p className="fs-6">$ 360</p>
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
                  <div className="mb-lg-8 product" data-id="comp_giftbox_Six">
                    <a
                      href="./item_details-comp_giftbox_six.html"
                      className="position-relative d-inline-block"
                    >
                      <div className="img-box p-25">
                        <img
                          src={綜合甜甜禮盒6入去背}
                          alt="綜合甜甜-禮盒-6入"
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
                        <h2 className="fs-6 mb-2">綜合甜甜-禮盒-6入</h2>
                        <p className="fs-6">$ 360</p>
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
                  <div className="mb-lg-8 product" data-id="giftbox_twelve">
                    <a
                      href="./item_details-giftbox_twelve.html"
                      className="position-relative d-inline-block"
                    >
                      <div className="img-box p-25">
                        <img
                          src={經典甜甜禮盒12入去背}
                          alt="經典甜甜-禮盒-12入"
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
                        <h2 className="fs-6 mb-2">經典甜甜-禮盒-12入</h2>
                        <p className="fs-6">$ 750</p>
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
                  <div
                    className="mb-lg-8 product"
                    data-id="Comp_giftbox_twelve"
                  >
                    <a
                      href="./item_details-comp_giftbox_twelve.html"
                      className="position-relative d-inline-block"
                    >
                      <div className="img-box p-25">
                        <img
                          src={綜合甜甜禮盒12入去背}
                          alt="綜合甜甜-禮盒-12入"
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
                        <h2 className="fs-6 mb-2">綜合甜甜-禮盒-12入</h2>
                        <p className="fs-6">$ 750</p>
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
                {/* 推出空白並且方便後續直接新增品項 */}
                <div className="col-12 col-lg-6 ps-lg-8 pe-lg-0 mb-8 lg-invisible">
                  <div className="mb-lg-8">
                    <a
                      href="./item_details-giftbox_twelve.html"
                      className="position-relative d-inline-block"
                    >
                      <div className="img-box p-25">
                        <img src="" alt="" className="img-fluid" />
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
                        <h2 className="fs-6 mb-2"></h2>
                        <p className="fs-6"></p>
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

export default ProductListGiftbox;
