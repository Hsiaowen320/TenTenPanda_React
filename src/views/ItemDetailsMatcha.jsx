const ItemDetailsMatcha = () => {
  return (
    <>
      {/* 商品詳情-抹茶甜甜 頁面 */}
      <section>
        {/* 麵包屑 */}
        <div className="container mb-4 mb-lg-8">
          <nav>
            <ol className="breadcrumb">
              <li className="bread-item">
                <a href="#">
                  <img src="/icon-home.webp" alt="" />
                </a>
              </li>
              <li className="d-flex align-items-center">
                <span className="material-symbols-outlined text-neutral-60 mx-2">
                  keyboard_double_arrow_right
                </span>
                <a href="#"></a>
              </li>
              <li className="bread-item d-block d-lg-none">
                <a
                  href="#"
                  className="text-neutral-60"
                  onclick="
                    history.back();
                    return false;
                  "
                >
                  ⋯
                </a>
              </li>
              <li className="bread-item d-none d-lg-block">
                <span className="text-neutral-60">商品列表</span>
              </li>
              <li className="d-flex align-items-center">
                <span className="material-symbols-outlined text-neutral-60 mx-2">
                  keyboard_double_arrow_right
                </span>
                <a href="#"></a>
              </li>
              <li className="bread-item d-none d-lg-block">
                <a
                  href="./productList-classic.html"
                  className="text-neutral-60"
                >
                  經典口味
                </a>
              </li>
              <li className="d-lg-flex align-items-center d-none">
                <span className="material-symbols-outlined text-neutral-60 mx-2">
                  keyboard_double_arrow_right
                </span>
                <a href="#"></a>
              </li>
              <li
                className="bread-item text-neutral-80 fw-bold active"
                aria-current="page"
              >
                抹茶甜甜
              </li>
            </ol>
          </nav>
        </div>
        {/* 商品主要區塊 */}
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="mb-lg-8">
                <img src="/抹茶甜甜.webp" alt="" />
              </div>
            </div>
            <div className="col-lg-7">
              {/* 第一區 */}
              <div className="pb-8 mb-lg-6 border-bottom border-neutral-40">
                <h4 className="fs-4 fs-lg-2 fw-bold text-neutral-100 mb-4">
                  抹茶甜甜 / matcha
                </h4>
                <p className="fs-7 fs-lg-6 text-neutral-60 fw-normal mb-4">
                  ⸺「來自京都的抹茶時光」
                </p>
                <p
                  className="border-start border-4 border-primary-20 text-neutral-80 px-3 py-2 mb-8 mb-lg-10"
                  style="background-color: #fef9ecbf"
                >
                  嚴選日本抹茶粉製作，苦中帶甘、清香回甘
                  <br />
                  細膩茶韻與Q彈口感交織
                  <br />
                  一口抹茶香，彷彿置身午後陽光下的日式茶屋
                </p>
                <h5 className="fs-5 fs-lg-3 fw-bold text-neutral-100 mb-2">
                  NT$ 65
                </h5>
                <p className="fs-8 fs-lg-9 lh-base text-accent-darkBlue mb-4 mb-lg-8">
                  ※ 2025/10/01–10/15 輸入折扣碼 TENTEN1010，即享
                  <span className="fw-bold">滿 NT.499 免運費</span>
                </p>
                <div className="col-lg-4 border border-neutral-40 br-8 d-flex justify-content-between align-items-center mb-8 mb-lg-6">
                  <button className="btn p-3 text-neutral-100">
                    <span className="material-symbols-outlined align-bottom">
                      remove
                    </span>
                  </button>
                  <p className="fs-9 fw-normal lh-base">1</p>
                  <button className="btn p-3 text-neutral-100">
                    <span className="material-symbols-outlined align-bottom">
                      add
                    </span>
                  </button>
                </div>
                <div className="row">
                  <div className="col-6 pe-2 pe-lg-3">
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#joinCart"
                      className="btn bg-primary-40 text-white w-100 py-4 br-8"
                    >
                      加入購物車
                      <span className="material-symbols-outlined align-bottom mx-2">
                        shopping_cart
                      </span>
                    </button>
                  </div>
                  <div className="col-6 ps-2 ps-lg-3">
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#joinFavorite"
                      className="btn border-primary-80 text-primary-80 w-100 py-4 br-8"
                    >
                      加入願望清單
                      <span className="material-symbols-outlined align-bottom mx-2">
                        favorite
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              {/* 產品說明&保存方式 */}
              <div className="py-8">
                <div className="mb-10">
                  <h5 className="fs-6 fs-lg-5 fw-bold text-neutral-100 mb-5">
                    產品說明
                  </h5>
                  <p className="fs-7 fs-lg-6 text-neutral-80 lh-base">
                    使用日本進口抹茶調製成抹茶奶油餡，
                    <br />
                    本體使用北海道牛奶製成的甜甜圈麵糰，
                    <br />
                    外層包裹薄層抹茶糖粉，帶出抹茶的純粹與細緻風味
                  </p>
                </div>
                <div>
                  <h5 className="fs-6 fs-lg-5 fw-bold text-neutral-100 mb-5">
                    保存方式
                  </h5>
                  <div className="mb-5 mb-lg-4">
                    <p className="badge br-8 fw-normal fs-7 fs-lg-6 lh-base py-1 px-3 bg-accent-lightBlue text-accent-darkBlue mb-2">
                      冷藏
                    </p>
                    <p className="fs-7 fs-lg-6 lh-base text-neutral-80">
                      可保存 1～3 天，建議放置密封盒中以避免受潮與氣味混入
                    </p>
                  </div>
                  <div>
                    <p className="badge br-8 fw-normal fs-7 fs-lg-6 lh-base py-1 px-3 bg-accent-lightBlue text-accent-darkBlue mb-2">
                      冷凍
                    </p>
                    <p className="fs-7 fs-lg-6 lh-base text-neutral-80">
                      可保存 3～5
                      天，建議個別包裝以避免結霜與異味，食用前可微波加熱約 10
                      秒，讓內餡稍回柔軟，風味較佳
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 相關產品 */}
        <div className="bg-primary-20">
          <div className="container-lg py-14">
            <h4 className="fs-4 fw-bold text-neutral-100 mb-8">相關商品</h4>
            <div className="row g-6">
              <div className="recommend-commodity col-6 col-lg flex-shrink-1">
                <a
                  href="./item_details-classic.html"
                  className="card bg-transparent border-0 h-100 align-items-center text-center"
                >
                  <img
                    src="/經典甜甜.webp"
                    className="img-limited img-fluid h-100"
                    alt="經典甜甜"
                  />
                  <div className="my-1 my-lg-0">
                    <h5 className="fs-7 fs-lg-5 text-neutral-100 fw-bold mb-1 mb-lg-0">
                      經典甜甜
                    </h5>
                    <p className="fs-7 fs-lg-6 text-primary-80 lh-base">
                      $ 65/入
                    </p>
                  </div>
                </a>
              </div>
              <div className="recommend-commodity col-6 col-lg flex-shrink-1">
                <a
                  href="./item_details-berry.html"
                  className="card bg-transparent border-0 h-100 align-items-center text-center"
                >
                  <img
                    src="/莓果甜甜.webp"
                    className="img-limited img-fluid h-100"
                    alt="莓果甜甜"
                  />
                  <div className="my-1 my-lg-0">
                    <h5 className="fs-7 fs-lg-5 text-neutral-100 fw-bold mb-1 mb-lg-0">
                      莓果甜甜
                    </h5>
                    <p className="fs-7 fs-lg-6 text-primary-80 lh-base">
                      $ 65/入
                    </p>
                  </div>
                </a>
              </div>
              <div className="recommend-commodity col-6 col-lg flex-shrink-1">
                <a
                  href="./item_details-creamlemon.html"
                  className="card bg-transparent border-0 h-100 align-items-center text-center"
                >
                  <img
                    src="/生乳檸檬甜甜.webp"
                    className="img-limited img-fluid h-100"
                    alt="生乳檸檬甜甜"
                  />
                  <div className="my-1 my-lg-0">
                    <h5 className="fs-7 fs-lg-5 text-neutral-100 fw-bold mb-1 mb-lg-0">
                      生乳檸檬甜甜
                    </h5>
                    <p className="fs-7 fs-lg-6 text-primary-80 lh-base">
                      $ 65/入
                    </p>
                  </div>
                </a>
              </div>
              <div className="recommend-commodity col-6 col-lg flex-shrink-1">
                <a
                  href="./item_details-caramelcocoa.html"
                  className="card bg-transparent border-0 h-100 align-items-center text-center"
                >
                  <img
                    src="/焦糖可可甜甜.webp"
                    className="img-limited img-fluid h-100"
                    alt="焦糖可可甜甜"
                  />
                  <div className="my-1 my-lg-0">
                    <h5 className="fs-7 fs-lg-5 text-neutral-100 fw-bold mb-1 mb-lg-0">
                      焦糖可可甜甜
                    </h5>
                    <p className="fs-7 fs-lg-6 text-primary-80 lh-base">
                      $ 65/入
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 加入購物車model */}
      <div
        className="modal"
        tabindex="-1"
        id="joinCart"
        aria-labelledby="joinCartLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modal_set br-32 py-10 mx-auto">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div>
                <span className="material-symbols-outlined align-bottom fs-lg-2 text-primary-40 bg-primary-20 p-4 p-lg-6 mb-5 rounded-circle d-inline-block">
                  shopping_cart
                </span>
              </div>
              <p className="fs-6 fs-lg-5 fw-bold">已加入購物車！</p>
            </div>
          </div>
        </div>
      </div>
      {/* 加入我的收藏model */}
      <div
        className="modal"
        tabindex="-1"
        id="joinFavorite"
        aria-labelledby="joinFavoriteLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modal_set br-32 py-10 mx-auto">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div>
                <span className="text-primary-40 bg-primary-20 p-4 p-lg-6 mb-5 rounded-circle d-inline-block">
                  <svg
                    className="icon_favorite"
                    xmlns="http://www.w3.org/2000/svg"
                    height="32px"
                    viewBox="0 -960 960 960"
                    width="32px"
                    fill="#e89018"
                  >
                    <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
                  </svg>
                </span>
              </div>
              <p className="fs-6 fs-lg-5 fw-bold">已加入願望清單！</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetailsMatcha;
