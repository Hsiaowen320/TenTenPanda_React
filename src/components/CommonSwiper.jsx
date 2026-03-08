import { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";

/**
 * 共用輪播元件 CommonSwiper
 *
 * 外觀：
 * - 將「圖片顯示區」和「pagination」拆開
 * - 讓圓角只作用在圖片區，不被 pagination 撐高影響
 *
 * 功能：
 * - 統一初始化 Swiper
 * - 自動處理 destroy
 * - 可在 Login / Join / About... 等頁面重複使用
 *
 * props:
 * @param {Array} slides - 輪播資料
 * @param {Function} renderSlide - 每張 slide 的渲染方式
 * @param {Object} options - Swiper 設定
 * @param {String} className - 額外 className
 * @param {Boolean} showPagination - 是否顯示分頁
 * @param {String} paginationClassName - pagination 額外 class
 */
const CommonSwiper = ({
  slides = [],
  renderSlide,
  options = {},
  className = "",
  swiperClassName = "",
  showPagination = true,
  paginationClassName = "",
  fillHeight = false,
}) => {
  // 真正給 Swiper 初始化的 DOM
  const swiperRef = useRef(null);

  // Pagination DOM
  const paginationRef = useRef(null);

  // 保存 swiper instance，方便清除
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    // 若 DOM 還沒掛載，不初始化
    if (!swiperRef.current) return;

    // 組合最終設定
    const finalOptions = {
      ...options,
      pagination:
        showPagination && paginationRef.current
          ? {
              clickable: true,
              ...(options.pagination || {}),
              el: paginationRef.current,
            }
          : undefined,
    };

    // 建立 Swiper
    swiperInstanceRef.current = new Swiper(swiperRef.current, finalOptions);

    // 元件卸載時清除
    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }
    };
  }, [options, showPagination]);

  return (
    // 外層：整體容器（可放 margin / 版面用 class）
    <div className={className}>
      {/* 輪播可視區：只有這一層負責圓角與裁切 */}
      <div
        className={`overflow-hidden ${swiperClassName} ${fillHeight ? "h-100" : ""}`}
      >
        {/* 真正的 swiper 容器 */}
        <div className={`swiper ${fillHeight ? "h-100" : ""}`} ref={swiperRef}>
          {/* 
            這裡一定要補 h-100
            不然 wrapper 還是只會跟內容高
          */}
          <div className={`swiper-wrapper ${fillHeight ? "h-100" : ""}`}>
            {slides.map((slide, index) => (
              <div
                className={`swiper-slide ${fillHeight ? "h-100" : ""}`}
                key={slide.id || index}
              >
                {renderSlide ? renderSlide(slide, index) : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* pagination 放外面，避免影響圓角 */}
      {showPagination && (
        <div
          className={`swiper-pagination ${paginationClassName}`}
          ref={paginationRef}
        ></div>
      )}
    </div>
  );
};

export default CommonSwiper;
