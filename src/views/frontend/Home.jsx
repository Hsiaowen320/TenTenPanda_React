import banner from "@/assets/images/banner.webp";
import bannerTitle from "@/assets/images/banner-seasonal-title.webp";
import graphic1 from "@/assets/images/graphic-1.webp";
import graphic2 from "@/assets/images/graphic-2.webp";
import donutIcon from "@/assets/images/section-list-donut.webp";
import recommendBigTitle from "@/assets/images/recommend-bigtitle.webp";
import adNews1 from "@/assets/images/ad-news-1.webp";
import adNews2 from "@/assets/images/ad-news-2.webp";
import adNews3 from "@/assets/images/ad-news-3.webp";
import adNews4 from "@/assets/images/ad-news-4.webp";
import recommendLeft from "@/assets/images/recommend-left.webp";
import recommendRight from "@/assets/images/recommend-right.webp";
import starberryImage from "@/assets/images/星塵草莓2-光暈.webp";
import snowberryImage from "@/assets/images/白雪綿霜莓2-光暈.webp";
import berryCocoImage from "@/assets/images/莓果可可2-光暈.webp";
import wineberryImage from "@/assets/images/熱紅酒莓果2-光暈.webp";
import snowberryMontImage from "@/assets/images/雪莓蒙布朗2-光暈.webp";
import frostberryImage from "@/assets/images/莓果夾心2-光暈.webp";
import classicImage from "@/assets/images/經典甜甜.webp";
import berryImage from "@/assets/images/莓果甜甜.webp";
import sesameImage from "@/assets/images/芝麻甜甜.webp";
import matchaImage from "@/assets/images/抹茶甜甜.webp";
import creamLemonImage from "@/assets/images/生乳檸檬甜甜.webp";
import caramelCocoaImage from "@/assets/images/焦糖可可甜甜.webp";
import sectionListDonutImage from "@/assets/images/section-list-donut.webp";
import { useMemo } from "react";
import { useSwiperInit } from "@/hooks/useSwiperInit";
import { useNewsHoverPreview } from "@/hooks/useNewsHoverPreview";
import "swiper/css";

const Home = () => {
  const swiperOptions = useMemo(
    () => ({
      slidesPerView: "auto",
      loop: true,
      initialSlide: 3,
      centeredSlides: true,
      spaceBetween: 12,
      breakpoints: {
        992: {
          spaceBetween: 40,
        },
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    }),
    [],
  );

  const { swiperRef, paginationRef } = useSwiperInit(swiperOptions);
  const { newsRef } = useNewsHoverPreview();

  return (
    <>
      {/* section 1 雪夜莓語主視覺 */}
      <section>
        <div className="container-fluid py-lg-8 pt-3 pb-8 position-relative">
          <div className="banner-img mx-auto position-relative">
            <img
              src={banner}
              alt=""
              className="banner-boder-radius-lg w-100 h-100 object-fit-cover"
            />
            {/* 雪夜莓語-白底 */}
            <div className="bg-white p-lg-4 p-2 banner-seasonal-title position-absolute d-flex flex-column gap-lg-6 gap-2 justify-content-lg-end">
              <img
                src={bannerTitle}
                alt=""
                className="banner-seasonal-title-img"
              />
              <p className="lh-base fs-7 fs-lg-6 text-neutral-80">
                在冬夜的靜謐裡，
                <br />
                莓果低語、雪花作伴，
                <br />
                點亮這一季的溫柔時光。
              </p>
            </div>
            {/* 期間限定-白底 */}
            <div className="bg-white ps-2 pe-5 pt-6 pb-5 ps-lg-10 pt-lg-10 banner-seasonal-date position-absolute d-flex">
              <p className="fs-6 fs-lg-3 text-neutral-100">
                期間限定：10/11~1/11
              </p>
            </div>
          </div>
          <div
            className="position-absolute banner-deco"
            style={{ top: "10%", left: "1%" }}
          >
            <img src={graphic1} alt="" />
          </div>
          <div
            className="position-absolute banner-deco"
            style={{ bottom: "30%", right: "2%" }}
          >
            <img src={graphic2} alt="" />
          </div>
        </div>
      </section>

      {/* section 2 甜甜優惠 */}
      <section className="pt-14 pb-4 py-lg-24">
        <div className="d-flex flex-column align-items-center gap-1 gap-lg-1 pb-6 pb-lg-14">
          <img src={donutIcon} alt="" className="section-list-donut" />
          <h2 className="fs-4 fs-lg-2 text-neutral-100">
            <span className="text-primary-40 me-1">甜甜</span>優惠
          </h2>
        </div>
        <div>
          <div className="swiper" ref={swiperRef}>
            {/* 滑動區塊 */}
            <div className="swiper-wrapper">
              {/* AD-3 */}
              <div className="swiper-slide">
                <div className="sales-ad sales-ad-3 shadow-sm mb-10">
                  <div className="d-flex flex-column align-items-center justify-content-center gap-3 gap-lg-8 h-100">
                    <h3 className="fs-4 fs-lg-1 fw-bold text-primary-80">
                      經典不敗！
                    </h3>
                    <p className="fs-7 fs-lg-4 fw-bold text-white px-6 px-lg-14 py-2 py-lg-3 bg-primary-60 rounded-pill">
                      買五送一優惠中
                    </p>
                  </div>
                </div>
              </div>
              {/* AD-1 */}
              <div className="swiper-slide">
                <div className="sales-ad sales-ad-1 shadow-sm mb-10">
                  <div className="d-flex gap-4 gap-lg-12 flex-column align-items-start justify-content-center h-100">
                    <div>
                      <img
                        src={bannerTitle}
                        alt=""
                        className="sales-ad-title"
                      />
                    </div>
                    <h3 className="fs-7 fs-lg-2 text-neutral-100">
                      六款冬季新品上市！
                    </h3>
                    <p className="bg-primary-40 fs-8 fs-lg-6 py-1 py-lg-2 px-2 px-lg-12 text-white rounded-pill">
                      2025.10.11~2026.01.11
                    </p>
                  </div>
                </div>
              </div>
              {/* AD-2 */}
              <div className="swiper-slide">
                <div className="sales-ad sales-ad-2 shadow-sm mb-10 position-relative overflow-hidden">
                  <div className="deco-bg-circle position-absolute z-1"></div>
                  <div className="d-flex flex-column justify-content-center align-items-start ps-4 ps-lg-20 h-100 position-absolute z-2">
                    <p className="fs-8 fs-lg-6 fw-bold text-primary-60 py-1 px-3 py-lg-3 px-lg-6 bg-primary-20 sales-ad-span mb-2 mb-lg-3">
                      6種人氣口味一次滿足！
                    </p>
                    <h3 className="fs-6 fs-lg-1 fw-bold text-neutral-100 mb-4 mb-lg-12">
                      綜合甜甜禮盒
                    </h3>
                    <p className="text-neutral-60 fs-8 fs-lg-4 mb-1 mb-lg-2">
                      <del>原價 ＄390</del>
                    </p>
                    {/* 補 - 手機字體18px、電腦字體72px */}
                    <h4 className="fw-bold text-primary-80 fz18-72-Jenna">
                      $360
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            {/* If we need pagination */}
            <div
              className="swiper-pagination d-none d-lg-block"
              ref={paginationRef}
            ></div>
          </div>
        </div>
      </section>

      {/* section 3 甜甜推薦 */}
      <section className="recommend-section">
        <div className="container pt-14">
          <div className="d-flex flex-column align-items-center mb-6 mb-lg-14">
            <img
              className="section-list-donut mb-1 mb-lg-2"
              src={donutIcon}
              alt="section-list-donut"
            />
            <div className="d-flex">
              <h2 className="text-primary-40 fw-normal lh-sm fs-4 fs-lg-2">
                甜甜
              </h2>
              <h2 className="text-neutral-100 fw-normal lh-sm fs-4 fs-lg-2 ms-1">
                推薦
              </h2>
            </div>
          </div>
        </div>
        {/* 商品圖片 */}
        <div className="sweet-section overflow-x-hidden">
          <div className="recommend-main position-relative container-lg">
            <img
              className="position-absolute recommend-bigtitle"
              src={recommendBigTitle}
              alt=""
            />
            <div className="py-14 pt-lg-18 pb-lg-30">
              <div className="d-flex flex-column align-items-center mb-6 mb-lg-14">
                <div
                  className="nav col-12 col-lg-8 bg-white border border-primary-60 rounded-pill d-flex gap-6 justify-content-center flex-nowrap px-3 py-2 px-lg-6 py-4"
                  id="pills-tab"
                  role="tablist"
                >
                  <div className="col-6 flex-shrink-1">
                    <button
                      className="w-100 fs-7 fs-lg-4 py-3 py-lg-5 rounded-pill border-0 active"
                      id="pills-limited-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-limited"
                      type="button"
                      role="tab"
                      aria-controls="pills-limited"
                      aria-selected="true"
                    >
                      <img
                        src={recommendLeft}
                        style={{ width: "24px", height: "12px" }}
                        alt="recommend-left"
                      />
                      期間限定
                      <img
                        src={recommendRight}
                        style={{ width: "24px", height: "12px" }}
                        alt="recommend-right"
                      />
                    </button>
                  </div>
                  <div className="col-6 flex-shrink-1">
                    <button
                      className="w-100 fs-7 fs-lg-4 py-3 py-lg-5 rounded-pill border-0"
                      id="pills-permanent-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-permanent"
                      type="button"
                      role="tab"
                      aria-controls="pills-permanent"
                      aria-selected="false"
                    >
                      <img
                        src={recommendLeft}
                        style={{ width: "24px", height: "12px" }}
                        alt="recommend-left"
                      />
                      常駐品項
                      <img
                        src={recommendRight}
                        style={{ width: "24px", height: "12px" }}
                        alt="recommend-right"
                      />
                    </button>
                  </div>
                </div>
              </div>
              {/* nav 下方內容 */}
              <div className="tab-content" id="pills-tabContent">
                {/* 期間限定 */}
                <div
                  className="tab-pane fade show active"
                  id="pills-limited"
                  role="tabpanel"
                  aria-labelledby="pills-limited-tab"
                  tabIndex="0"
                >
                  <form>
                    {/* 主要區塊 */}
                    <div className="container-lg">
                      <div className="d-flex justify-content-center">
                        <h4 className="d-none d-lg-block fs-6 text-primary-80 lh-base mb-10">
                          ＃適合蛋奶素食者食用
                        </h4>
                      </div>
                      <div className="row g-6">
                        <div className="recommend-commodity col-6 col-lg-4 flex-shrink-1">
                          <a
                            href="./item_details-starberry.html"
                            className="card bg-transparent border-0 h-100 align-items-center text-center"
                          >
                            <img
                              src={starberryImage}
                              className="img-limited img-fluid h-100"
                              alt="星塵草莓"
                            />
                            <div className="my-1 my-lg-0">
                              <h5 className="fs-7 fs-lg-5 text-neutral-100 fw-bold mb-1 mb-lg-0">
                                星塵草莓
                              </h5>
                              <p className="fs-7 fs-lg-6 text-primary-80 lh-base">
                                $ 95/入
                              </p>
                            </div>
                          </a>
                        </div>
                        <div className="recommend-commodity col-6 col-lg-4 flex-shrink-1">
                          <a
                            href="./item_details-snowberry.html"
                            className="card bg-transparent border-0 h-100 align-items-center text-center"
                          >
                            <img
                              src={snowberryImage}
                              className="img-limited img-fluid h-100"
                              alt="白雪綿霜莓"
                            />
                            <div className="my-1 my-lg-0">
                              <h5 className="fs-7 fs-lg-5 text-neutral-100 fw-bold mb-1 mb-lg-0">
                                白雪綿霜莓
                              </h5>
                              <p className="fs-7 fs-lg-6 text-primary-80 lh-base">
                                $ 95/入
                              </p>
                            </div>
                          </a>
                        </div>
                        <div className="recommend-commodity col-6 col-lg-4 flex-shrink-1">
                          <a
                            href="./item_details-berrycoco.html"
                            className="card bg-transparent border-0 h-100 align-items-center text-center"
                          >
                            <img
                              src={berryCocoImage}
                              className="img-limited img-fluid h-100"
                              alt="莓果可可"
                            />
                            <div className="my-1 my-lg-0">
                              <h5 className="fs-7 fs-lg-5 text-neutral-100 fw-bold mb-1 mb-lg-0">
                                莓果可可
                              </h5>
                              <p className="fs-7 fs-lg-6 text-primary-80 lh-base">
                                $ 95/入
                              </p>
                            </div>
                          </a>
                        </div>
                        <div className="recommend-commodity col-6 col-lg-4 flex-shrink-1">
                          <a
                            href="./item_details-SnowberryMont.html"
                            className="card bg-transparent border-0 h-100 align-items-center text-center"
                          >
                            <img
                              src={snowberryMontImage}
                              className="img-limited img-fluid h-100"
                              alt="雪莓蒙布郎"
                            />
                            <div className="my-1 my-lg-0">
                              <h5 className="fs-7 fs-lg-5 text-neutral-100 fw-bold mb-1 mb-lg-0">
                                雪莓蒙布朗
                              </h5>
                              <p className="fs-7 fs-lg-6 text-primary-80 lh-base">
                                $ 95/入
                              </p>
                            </div>
                          </a>
                        </div>
                        <div className="recommend-commodity col-6 col-lg-4 flex-shrink-1">
                          <a
                            href="./item_details-wineberry.html"
                            className="card bg-transparent border-0 h-100 align-items-center text-center"
                          >
                            <img
                              src={wineberryImage}
                              className="img-limited img-fluid h-100"
                              alt="熱紅酒莓果"
                            />
                            <div className="my-1 my-lg-0">
                              <h5 className="fs-7 fs-lg-5 text-neutral-100 fw-bold mb-1 mb-lg-0">
                                熱紅酒莓果
                              </h5>
                              <p className="fs-7 fs-lg-6 text-primary-80 lh-base">
                                $ 95/入
                              </p>
                            </div>
                          </a>
                        </div>
                        <div className="recommend-commodity col-6 col-lg-4 flex-shrink-1">
                          <a
                            href="./item_details-frostberry.html"
                            className="card bg-transparent border-0 h-100 align-items-center text-center"
                          >
                            <img
                              src={frostberryImage}
                              className="img-limited img-fluid h-100"
                              alt="莓果夾心"
                            />
                            <div className="my-1 my-lg-0">
                              <h5 className="fs-7 fs-lg-5 text-neutral-100 fw-bold mb-1 mb-lg-0">
                                莓果夾心
                              </h5>
                              <p className="fs-7 fs-lg-6 text-primary-80 lh-base">
                                $ 95/入
                              </p>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                {/* 常駐品項 */}
                <div
                  className="tab-pane fade"
                  id="pills-permanent"
                  role="tabpanel"
                  aria-labelledby="pills-permanent-tab"
                  tabIndex="0"
                >
                  <form>
                    {/* 主要區塊 */}
                    <div className="container-lg">
                      <div className="d-flex justify-content-center">
                        <h4 className="d-none d-lg-block fs-6 text-primary-80 lh-base mb-10">
                          ＃適合蛋奶素食者食用
                        </h4>
                      </div>
                      <div className="row g-6">
                        <div className="recommend-commodity col-6 col-lg-4 flex-shrink-1">
                          <a
                            href="./item_details-classic.html"
                            className="card bg-transparent border-0 h-100 align-items-center text-center"
                          >
                            <img
                              src={classicImage}
                              className="img-classic img-fluid h-100"
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
                        <div className="recommend-commodity col-6 col-lg-4 flex-shrink-1">
                          <a
                            href="./item_details-berry.html"
                            className="card bg-transparent border-0 h-100 align-items-center text-center"
                          >
                            <img
                              src={berryImage}
                              className="img-classic img-fluid h-100"
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
                        <div className="recommend-commodity col-6 col-lg-4 flex-shrink-1">
                          <a
                            href="./item_details-sesame.html"
                            className="card bg-transparent border-0 h-100 align-items-center text-center"
                          >
                            <img
                              src={sesameImage}
                              className="img-classic img-fluid h-100"
                              alt="芝麻甜甜"
                            />
                            <div className="my-1 my-lg-0">
                              <h5 className="fs-7 fs-lg-5 text-neutral-100 fw-bold mb-1 mb-lg-0">
                                芝麻甜甜
                              </h5>
                              <p className="fs-7 fs-lg-6 text-primary-80 lh-base">
                                $ 65/入
                              </p>
                            </div>
                          </a>
                        </div>
                        <div className="recommend-commodity col-6 col-lg-4 flex-shrink-1">
                          <a
                            href="./item_details-matcha.html"
                            className="card bg-transparent border-0 h-100 align-items-center text-center"
                          >
                            <img
                              src={matchaImage}
                              className="img-classic img-fluid h-100"
                              alt="抹茶甜甜"
                            />
                            <div className="my-1 my-lg-0">
                              <h5 className="fs-7 fs-lg-5 text-neutral-100 fw-bold mb-1 mb-lg-0">
                                抹茶甜甜
                              </h5>
                              <p className="fs-7 fs-lg-6 text-primary-80 lh-base">
                                $ 65/入
                              </p>
                            </div>
                          </a>
                        </div>
                        <div className="recommend-commodity col-6 col-lg-4 flex-shrink-1">
                          <a
                            href="./item_details-creamlemon.html"
                            className="card bg-transparent border-0 h-100 align-items-center text-center"
                          >
                            <img
                              src={creamLemonImage}
                              className="img-classic img-fluid h-100"
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
                        <div className="recommend-commodity col-6 col-lg-4 flex-shrink-1">
                          <a
                            href="./item_details-caramelcocoa.html"
                            className="card bg-transparent border-0 h-100 align-items-center text-center"
                          >
                            <img
                              src={caramelCocoaImage}
                              className="img-classic img-fluid h-100"
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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section 4 slogan */}
      <section className="slogan-section d-flex justify-content-center align-items-center justify-content-lg-start">
        <div className="container-lg">
          <div className="slogan-text text-center text-lg-start">
            <h2 className="fs-5 fs-lg-2 fw-bold mb-4 mb-lg-6">
              讓甜甜熊貓溫暖你的心！
            </h2>
            <p className="fs-7 fs-lg-4 mb-10 mb-lg-14">
              快來看看我們的甜點清單，讓美味一次擁有。
            </p>
            <a
              href="productList-classic.html"
              type="button"
              className="btn bg-white text-primary-80 border-primary-80 px-8 py-4"
            >
              前往商品列表
            </a>
          </div>
        </div>
      </section>
      {/* section 5 甜甜報你知 */}
      <section className="py-14 py-lg-24">
        {/* 標題 */}
        <div className="d-flex flex-column align-items-center mb-6 mb-lg-14">
          <img
            src={sectionListDonutImage}
            alt="donut-icon"
            className="section-list-donut mb-1 mb-lg-2"
          />
          <h4 className="fs-4 fs-lg-2">
            <span className="me-1 text-primary-40">甜甜</span>報你知
          </h4>
        </div>
        {/* 消息區塊 */}
        <div className="news container p-lg-0" ref={newsRef}>
          {/* radios 放最前，checked 控制預設圖 */}
          <input className="d-none" type="radio" name="news" id="n1" />
          <input className="d-none" type="radio" name="news" id="n2" />
          <input className="d-none" type="radio" name="news" id="n3" />
          <input className="d-none" type="radio" name="news" id="n4" />

          <div className="row">
            {/* 右：清單（label 綁 radio） */}
            <div className="col-lg-6 order-lg-2 d-flex flex-column">
              {/* 消息列表 */}
              <div className="list-group list-group-flush mb-6 mb-lg-4">
                {/* 消息 1 */}
                <label
                  htmlFor="n1"
                  className="list-group-item list-group-item-action border-0 p-0"
                >
                  <a href="news.html" className="d-block w-100 py-4 px-6">
                    <p className="lh-base fw-normal fs-lg-7 fs-8 text-neutral-60 mb-2">
                      2025/10/03
                    </p>
                    <h3 className="news-title fs-lg-5 fs-6 fw-bold mb-2 text-truncate">
                      甜甜圈原來要這樣吃！網友激推這種方法！
                    </h3>
                    <p className="news-detail lh-base fw-normal text-truncate text-neutral-80">
                      最新話題美食「雪夜莓語」冬季限定系列，不只賣造型，更主打吃法有撇步！店家表示
                    </p>
                  </a>
                </label>
                {/* 消息 2 */}
                <label
                  htmlFor="n2"
                  className="list-group-item list-group-item-action border-0 p-0"
                >
                  <a href="news.html" className="d-block w-100 py-4 px-6">
                    <p className="lh-base fw-normal fs-lg-7 fs-8 text-neutral-60 mb-2">
                      2025/10/01
                    </p>
                    <h3 className="news-title fs-lg-5 fs-6 fw-bold text-truncate mb-2 text-truncate">
                      冬季限定｜北海道奶油Ｘ大湖草莓！雪夜莓語六款甜甜圈溫暖上市！
                    </h3>
                    <p className="news-detail lh-base fw-normal text-truncate text-neutral-80">
                      草莓的季節又來囉！冷冷的天有甜甜熊貓帶給您溫暖的甜食！季節限定產品「雪夜莓語」，六款甜甜新發售
                    </p>
                  </a>
                </label>
                {/* 消息 3 */}
                <label
                  htmlFor="n3"
                  className="list-group-item list-group-item-action border-0 p-0"
                >
                  <a href="news.html" className="d-block w-100 py-4 px-6">
                    <p className="lh-base fw-normal fs-lg-7 fs-8 text-neutral-60 mb-2">
                      2025/6/20
                    </p>
                    <h3 className="news-title fs-lg-5 fs-6 fw-bold mb-2 text-truncate">
                      焦糖可可甜甜｜蹦出新滋味 🥳
                    </h3>
                    <p className="news-detail lh-base fw-normal text-truncate text-neutral-80">
                      冬天想找人依偎嗎？來來來，暖男暖女這不就來了嗎！濃醇可可搭配香甜可口甜甜圈，溫暖你的心
                    </p>
                  </a>
                </label>
                {/* 消息 4 */}
                <label
                  htmlFor="n4"
                  className="list-group-item list-group-item-action border-0 p-0"
                >
                  <a href="news.html" className="d-block w-100 py-4 px-6">
                    <p className="lh-base fw-normal fs-lg-7 fs-8 text-neutral-60 mb-2">
                      2025/6/20
                    </p>
                    <h3 className="news-title fs-lg-5 fs-6 fw-bold mb-2 text-truncate">
                      生乳檸檬甜甜｜熱烈開賣中 🥳
                    </h3>
                    <p className="news-detail lh-base fw-normal text-truncate text-neutral-80">
                      生乳檸檬甜甜清爽登場！選用新鮮檸檬製成果泥，結合滑順法式生乳內餡，滑順口感讓人愛不釋手
                    </p>
                  </a>
                </label>
              </div>
              <a
                href="news.html"
                className="align-self-lg-end align-self-center"
              >
                <button
                  type="button"
                  className="btn more-btn btn-pd-16-32 fs-6 border-radius-4"
                >
                  瀏覽更多
                </button>
              </a>
            </div>

            {/* 左：預覽圖 */}
            <div className="col-lg-6 order-lg-1 d-none d-lg-flex">
              <div className="ratio ratio-4x3 position-relative news-preview">
                <img
                  src={adNews1}
                  alt="ad-news-1"
                  className="preview-img"
                  data-key="1"
                />
                <img
                  src={adNews2}
                  alt="ad-news-2"
                  className="preview-img ad-news-2"
                  data-key="2"
                />
                <img
                  src={adNews3}
                  alt="ad-news-3"
                  className="preview-img"
                  data-key="3"
                />
                <img
                  src={adNews4}
                  alt="ad-news-4"
                  className="preview-img"
                  data-key="4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section 6 甜甜在這裡 */}
      <section className="map py-5 px-3 py-lg-24">
        <div className="container s6-bg py-8 px-3 py-lg-14 px-lg-18">
          {/* 標題 */}
          <div className="d-flex flex-column align-items-center mb-6 mb-lg-11">
            <img
              src={donutIcon}
              alt="donut-icon"
              className="section-list-donut mb-1 mb-lg-2"
            />
            <h4 className="fs-4 fs-lg-2">
              <span className="me-1 text-primary-40">甜甜</span>在這裡
            </h4>
          </div>
          {/* 開店資訊 */}
          <div className="store mx-auto">
            {/* 營業＆地址文字資訊 */}
            <div className="store-info d-lg-flex d-block justify-content-center px-2 px-lg-8 mb-6 mb-lg-10 w-100 h-100">
              {/* 營業時間 */}
              <div className="store-time d-flex align-items-center mb-4 mb-lg-0 me-lg-6 w-100 w-lg-50">
                <span className="badge bg-accent-lightBlue text-accent-darkBlue fw-normal fs-7 fs-lg-5 p-4 p-lg-6 rounded-circle me-4 me-lg-6">
                  <p className="mb-1">營業</p>
                  <p>時間</p>
                </span>
                {/* 時間 */}
                <div>
                  <p className="fs-7 fs-lg-6 mb-2 mb-lg-5">
                    週二～五：<span className="fw-bold">10:00~18:00</span>
                  </p>
                  <p className="fs-7 fs-lg-6">
                    週六、日：<span className="fw-bold">10:00~20:00</span>
                  </p>
                </div>
              </div>
              {/* 店面位置 */}
              <div className="store-address d-flex align-items-center w-100 w-lg-50">
                <span className="badge bg-accent-lightBlue text-accent-darkBlue fw-normal fs-7 fs-lg-5 p-4 p-lg-6 rounded-circle me-4 me-lg-6">
                  <p className="mb-1">店面</p>
                  <p>位址</p>
                </span>
                {/* 時間 */}
                <div>
                  <p className="fs-7 fs-lg-6 mb-2 mb-lg-5 fw-bold">
                    總統府對面、直走3分鐘即達
                  </p>
                  <p className="fs-7 fs-lg-6">台北市中正區重慶南路一段122號</p>
                </div>
              </div>
            </div>
            {/* 地址圖片 */}
            <div className="map-img-col mx-auto w-100 overflow-hidden d-block">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.8232530655573!2d121.50937341095572!3d25.040071577719893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a90a870e5af1%3A0x180e1a442209d1c1!2zMTAw5Y-w5YyX5biC5Lit5q2j5Y2A6YeN5oW25Y2X6Lev5LiA5q61MTIy6Jmf!5e0!3m2!1szh-TW!2stw!4v1756648901358!5m2!1szh-TW!2stw"
                className="map-img w-100 h-100 object-fit-cover"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
