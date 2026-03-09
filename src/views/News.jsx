
import newsBright from "@/assets/images/news/news-bright.webp";
import newsLetter from "@/assets/images/news/news-letter.webp";
import adNews1 from "@/assets/images/ad-news-1.webp";
import adNews2 from "@/assets/images/ad-news-2.webp";
import adNews3 from "@/assets/images/ad-news-3.webp";
import adNews4 from "@/assets/images/ad-news-4.webp";


const News = () => {
  return (
    <>
      <main className="news-bg position-relative" >
      <section className="py-lg-12 py-8 container">
        <div
          className="d-flex flex-column gap-2 align-items-center align-items-lg-start position-relative mb-6 mb-lg-12"
        >
          <h1 className="fs-2 fw-bold text-neutral-100">最新消息</h1>
          <h2
            className="text-neutral-60 lh-base fs-lg-9 fs-7"
            style={{ letterSpacing: '0.04rem' }}
          >
            甜甜報你知，第一手掌握最新資訊與優惠!
          </h2>
          <img
            src={newsBright}
            alt=""
            className="img-fluid position-absolute top-0 news-deco-img-bright"
          />
        </div>
        {/* <!-- 手風琴 --> */}
        <div className="accordion d-flex flex-column gap-lg-6 gap-5 pb-12">
          {/* <!-- 最新消息-1 --> */}
          <div
            className="accordion-item shadow rounded-4 border-0 overflow-hidden p-lg-8 p-5 animate__animated animate__slideInUp animate__faster"
            id="news-title-1"
          >
            {/* <!-- 收合 --> */}
            <button
              className="news-accordion-btn"
              data-bs-toggle="collapse"
              data-bs-target="#news-list-1"
              aria-expanded="false"
              aria-controls="news-list-1"
            >
              <div className="d-flex gap-5 flex-column flex-lg-row">
                <div className="news-img rounded-4 overflow-hidden flex-shrink-0">
                  <img src={adNews1} alt="" />
                </div>
                <div className="d-flex flex-column justify-content-between gap-2">
                  <p className="text-neutral-60 fs-lg-9 fs-7">
                    <time dateTime="2025-10-03">2025/10/03</time>
                  </p>
                  <h2 className="fw-bold fs-lg-4 fs-5 news-font-hover">
                    甜甜圈原來要這樣吃！網友激推這種方法！
                  </h2>
                  <div className="d-flex">
                    <div
                      className="text-neutral-100 fs-7 lh-base d-flex gap-2 flex-column text-neutral-100 news-preview-height"
                    >
                      <p className="" style={{ letterSpacing: '0.04rem' }}>
                        最新話題美食「雪夜莓語」冬季限定系列，不只賣造型，更主打吃法有撇步，讓冬天的甜味瞬間翻倍。
                      </p>
                      <p>
                        首先，大推「微波加熱 8 秒」或「烤箱低溫回烤 2～3
                        分鐘」——讓北海道奶油緩緩融化，草莓果醬微微溫熱，香氣瞬間爆發！接著，不少老饕分享，搭配黑咖啡或熱紅茶更能凸顯大湖草莓的酸甜，減去甜膩感；也有人選擇用冰牛奶中和熱甜甜圈的溫度，吃起來外熱內涼，層次更豐富。
                      </p>
                    </div>
                    <span className="ms-2 mb-2 align-self-end d-lg-none d-block"
                      ><i
                        className="bi bi-caret-down-fill btn rounded-circle px-2 py-1 btn-outline-primary-40 news-btn-hover fw-bold"
                      ></i
                    ></span>
                  </div>
                  <p className="d-lg-block d-none">...</p>
                </div>
                <span className="ms-2 mb-2 align-self-end d-lg-block d-none"
                  ><i
                    className="bi bi-caret-down-fill btn rounded-circle px-2 py-1 btn-outline-primary-40 news-btn-hover fw-bold"
                  ></i
                ></span>
              </div>
            </button>
            {/* <!-- 展開 --> */}
            <div id="news-list-1" className="accordion-collapse collapse">
              <div className="accordion-body px-lg-10 py-lg-10 p-2">
                <div className="news-img-open rounded-4 overflow-hidden">
                  <img src={adNews1} alt="" className="img-fluid" />
                </div>
                <div className="d-flex flex-column mt-lg-8 mt-5">
                  <div
                    className="d-flex justify-content-lg-between align-items-lg-start flex-lg-row-reverse flex-column gap-2"
                  >
                    <p className="text-neutral-60 fs-lg-9 fs-7">
                      <time dateTime="2025-10-03">2025/10/03</time>
                    </p>
                    <h2 className="text-neutral-100 fw-bold fs-lg-3 fs-5">
                      甜甜圈原來要這樣吃！網友激推這種方法！ 🤩
                    </h2>
                  </div>
                  <div
                    className="d-flex gap-lg-12 justify-content-lg-between flex-lg-row flex-column justify-content-start"
                  >
                    <div className="d-flex gap-5 flex-column mt-5 fs-9 lh-base">
                      <p>
                        <span className="fw-bold">\ 冬天就是要吃甜甜圈 / </span
                        >跟著這三招，甜味瞬間翻倍，幸福感滿分✨
                      </p>
                      <p>
                        最新話題美食「雪夜莓語」冬季限定系列，不只賣造型，更主打吃法有撇步，讓冬天的甜味瞬間翻倍😋<br />TENTEN小當家一致認證：「加熱、搭飲品、控制溫度」三招學起來，草莓甜甜圈才真香<br />現在就公開美味的秘密！
                      </p>
                      <ul>
                        <li>
                          秘訣1：<span className="fw-bold">微波 8 秒 🔥</span> -
                          快速加熱，奶油慢慢融化，草莓果醬微微溫熱，香氣撲鼻
                        </li>
                        <li>
                          秘訣2：<span className="fw-bold"
                            >烤箱低溫回烤 2～3 分鐘 🍰</span
                          >
                          - 外層微酥、內餡柔軟，口感層次更分明
                        </li>
                        <li>
                          秘訣3：<span className="fw-bold"
                            >搭配熱飲或牛奶 ☕️🥛</span
                          >
                          -
                          熱紅茶、黑咖啡或冰牛奶都能平衡甜度，吃起來外熱內涼，層次更豐富
                        </li>
                      </ul>
                      <p>
                        秘訣MAX：<span className="fw-bold"
                          >「微波加熱 8 秒」或「烤箱低溫回烤 2～3 分鐘」</span
                        >——讓北海道奶油緩緩融化，草莓果醬微微溫熱，香氣瞬間爆發！<br />搭配黑咖啡或熱紅茶更能凸顯大湖草莓的酸甜，減去甜膩感<br />選擇用冰牛奶中和熱甜甜圈的溫度，吃起來外熱內涼，層次更豐富
                      </p>
                      <ul>
                        <li>
                          <span className="fw-bold"
                            >冬日限定｜TENTEN 熱銷TOP.3</span
                          >
                        </li>
                        <li>
                          <span className="fw-bold">🥇 雪莓蒙布朗</span
                          >：口感綿密濃郁，回烤後更能嚐到栗香與果香的融合。
                        </li>
                        <li>
                          <span className="fw-bold">🥈 熱紅酒莓果</span
                          >：濃郁果香與熱紅酒香氣交織，冬天必吃經典款。
                        </li>
                        <li>
                          <span className="fw-bold">🥉 冰霜莓果夾心 ❄️</span
                          >：建議冷藏後直接享用，外層糖霜酥脆、內餡清爽，冰涼口感超療癒
                          💖
                        </li>
                      </ul>
                      <div className="d-flex justify-content-between">
                        <p>
                          冬夜裡，一口甜甜圈、一口熱飲，<br
                            className="d-block d-lg-none"
                          />是最幸福的小確幸<br /><a
                            href="productList-seasonal.html"
                            className="fw-bold rounded-pill news-link-font-hover"
                            target="_blank"
                            >前往季節限定商品</a
                          >
                        </p>
                        <button
                          className="btn btn-outline-primary-40 rounded-circle news-btn-hover fw-bold align-self-end px-2 py-1 d-lg-none d-block"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#news-list-1"
                          aria-expanded="true"
                          aria-controls="news-title-1"
                        >
                          <i
                            className="bi bi-caret-up-fill d-block"
                            style={{ transform: 'translateY(-2px)' }}
                          ></i>
                        </button>
                      </div>
                    </div>
                    <button
                      className="btn btn-outline-primary-40 rounded-circle news-btn-hover fw-bold align-self-end px-2 py-1 d-lg-block d-none mb-3"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#news-list-1"
                      aria-expanded="true"
                      aria-controls="news-title-1"
                    >
                      <i
                        className="bi bi-caret-up-fill d-block"
                        style={{ transform: 'translateY(-2px)' }}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- 最新消息-2 --> */}
          <div
            className="accordion-item shadow rounded-4 border-0 overflow-hidden p-lg-8 p-5 animate__animated animate__slideInUp animate__fast"
            id="news-title-2"
          >
            {/* <!-- 收合 --> */}
            <button
              className="news-accordion-btn"
              data-bs-toggle="collapse"
              data-bs-target="#news-list-2"
              aria-expanded="false"
              aria-controls="news-list-2"
            >
              <div className="d-flex gap-5 flex-column flex-lg-row">
                <div className="news-img rounded-4 overflow-hidden flex-shrink-0">
                  <img src={adNews2} alt="" />
                </div>
                <div className="d-flex flex-column justify-content-between gap-2">
                  <p className="text-neutral-60 fs-lg-9 fs-7">
                    <time dateTime="2025-10-01">2025/10/01</time>
                  </p>
                  <h2 className="fw-bold fs-lg-4 fs-5 news-font-hover">
                    冬季限定の北海道奶油Ｘ大湖草莓 \ 溫暖上市！ /🍓
                  </h2>
                  <div className="d-flex">
                    <div
                      className="text-neutral-100 fs-7 lh-base d-flex gap-2 flex-column text-neutral-100 news-preview-height"
                    >
                      <p style={{ letterSpacing: '0.04rem' }}>
                        草莓的季節又來囉！冷冷的天有甜甜熊貓帶給您味蕾的甜蜜驚喜！
                      </p>
                      <p style={{ letterSpacing: '0.04rem' }}>
                        本季活動從
                        2025/10/11至2026/01/11，我們以「雪夜莓語」為主題，嚴選台灣大湖新鮮草莓搭配北海道奶油，打造
                        6
                        款冬季限定草莓甜甜圈，陪大家一起度過最冷卻最暖心的季節。
                      </p>
                    </div>
                    <span className="ms-2 mb-2 align-self-end d-lg-none d-block"
                      ><i
                        className="bi bi-caret-down-fill btn rounded-circle px-2 py-1 btn-outline-primary-40 news-btn-hover fw-bold"
                      ></i
                    ></span>
                  </div>
                  <p className="d-lg-block d-none">...</p>
                </div>
                <span className="ms-2 mb-2 align-self-end d-lg-block d-none"
                  ><i
                    className="bi bi-caret-down-fill btn rounded-circle px-2 py-1 btn-outline-primary-40 news-btn-hover fw-bold"
                  ></i
                ></span>
              </div>
            </button>
            {/* <!-- 展開 --> */}
            <div id="news-list-2" className="accordion-collapse collapse">
              <div className="accordion-body px-lg-10 py-lg-10 p-2">
                <div className="news-img-open rounded-4 overflow-hidden">
                  <img src={adNews2} alt="" className="img-fluid" />
                </div>
                <div className="d-flex flex-column mt-lg-8 mt-5">
                  <div
                    className="d-flex justify-content-lg-between align-items-lg-start flex-lg-row-reverse flex-column gap-2"
                  >
                    <p className="text-neutral-60 fs-lg-9 fs-7">
                      <time dateTime="2025-10-01">2025/10/01</time>
                    </p>
                    <h2 className="text-neutral-100 fw-bold fs-lg-3 fs-5">
                      冬季限定の北海道奶油Ｘ大湖草莓 \ 溫暖上市！ / 🍓
                    </h2>
                  </div>
                  <div
                    className="d-flex gap-lg-12 justify-content-lg-between flex-lg-row flex-column justify-content-start"
                  >
                    <div className="d-flex gap-5 flex-column mt-5 fs-9 lh-base">
                      <p>
                        草莓的季節又來囉！冷冷的天有甜甜熊貓帶給您味蕾的甜蜜驚喜！
                      </p>
                      <p>
                        <span className="fw-bold"
                          >期間限定 : 2025/10/11 - 2026/01/11 </span
                        ><br />嚴選台灣大湖新鮮草莓搭配北海道奶油，打造 6
                        款冬季限定草莓甜甜圈<br />陪大家一起度過最冷卻最暖心的季節💕
                      </p>

                      <ul>
                        <li>
                          <span className="fw-bold">✨冬季星塵草莓</span
                          >：粉嫩草莓糖霜配上閃閃銀白糖珠，好像冬夜裡的星光，酸甜不膩
                        </li>
                        <li>
                          <span className="fw-bold">✨白雪綿霜莓</span
                          >：鬆軟圈體淋上北海道奶油霜，撒上雪白糖粉，一口咬下奶香滿滿又吃得到草莓香氣
                        </li>
                        <li>
                          <span className="fw-bold">✨暖心莓果可可</span
                          >：濃郁可可醬結合微酸草莓，再灑些微融棉花糖，就像冬夜裡的一杯熱可可，暖胃又暖心
                        </li>
                        <li>
                          <span className="fw-bold">✨雪莓蒙布朗</span
                          >：栗子奶油搭配草莓奶油做成蒙布朗造型，外表夢幻、內餡酸甜滑順，每一口都很有層次
                        </li>
                        <li>
                          <span className="fw-bold">✨熱紅酒莓果</span
                          >：靈感來自冬季熱紅酒，融合肉桂與果乾的香氣，加上大湖草莓果香，微微辛香暖身剛剛好
                        </li>
                        <li>
                          <span className="fw-bold">✨冰霜莓果夾心</span
                          >：外層薄薄糖霜加上草莓碎果粒，裡面是滿滿草莓果醬，綿軟柔和，口感很有驚喜感
                        </li>
                      </ul>

                      <p>
                        🍓只在這個冬天限定上市，售完為止！用酸甜草莓和香濃奶油，替寒冷冬夜留下一段溫暖的味覺記憶
                      </p>

                      <div className="d-flex justify-content-between">
                        <p>
                          快來店裡嚐嚐這 6 款只屬於冬天的甜蜜滋味吧！<br /><a
                            href="productList-seasonal.html"
                            className="fw-bold rounded-pill news-link-font-hover news-link"
                            target="_blank"
                            >前往季節限定商品</a
                          >
                        </p>
                        <button
                          className="btn btn-outline-primary-40 rounded-circle news-btn-hover fw-bold align-self-end px-2 py-1 d-lg-none d-block"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#news-list-2"
                          aria-expanded="true"
                          aria-controls="news-title-2"
                        >
                          <i
                            className="bi bi-caret-up-fill d-block"
                            style={{ transform: 'translateY(-2px)' }}
                          ></i>
                        </button>
                      </div>
                    </div>
                    <button
                      className="btn btn-outline-primary-40 rounded-circle news-btn-hover fw-bold align-self-end px-2 py-1 d-lg-block d-none mb-3"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#news-list-2"
                      aria-expanded="true"
                      aria-controls="news-title-2"
                    >
                      <i
                        className="bi bi-caret-up-fill d-block"
                        style={{ transform: 'translateY(-2px)' }}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- 最新消息-3 --> */}
          <div
            className="accordion-item shadow rounded-4 border-0 overflow-hidden p-lg-8 p-5 animate__animated animate__slideInUp"
            id="news-title-3"
          >
            {/* <!-- 收合 --> */}
            <button
              className="news-accordion-btn"
              data-bs-toggle="collapse"
              data-bs-target="#news-list-3"
              aria-expanded="false"
              aria-controls="news-list-3"
            >
              <div className="d-flex gap-5 flex-column flex-lg-row w-100">
                <div className="news-img rounded-4 overflow-hidden flex-shrink-0">
                  <img src={adNews3} alt="" />
                </div>
                <div className="d-flex flex-column justify-content-between gap-2">
                  <p className="text-neutral-60 fs-lg-9 fs-7">
                    <time dateTime="2025-08-23">2025/08/23</time>
                  </p>
                  <h2 className="fw-bold fs-lg-4 fs-5 news-font-hover">
                    來自法國的焦糖可可甜甜 - 8/23 起全門市熱烈販售
                  </h2>
                  <div className="d-flex">
                    <div
                      className="text-neutral-100 fs-7 lh-base d-flex gap-2 flex-column text-neutral-100 news-preview-height"
                    >
                      <p style={{ letterSpacing: '0.04rem' }}>
                        ‼滿額免運優惠中‼ 選用法國進口苦甜可可粉慢火熬煮
                      </p>
                      <p style={{ letterSpacing: '0.04rem' }}>
                        冬天濃純可可搭配香甜焦糖，表層烘培出微微焦香，甜而不膩、溫柔而濃厚，午後搭配拿鐵享用，讓午後時光更加迷人！<br />來一杯熱牛奶，度過你的溫柔時光吧！
                      </p>
                    </div>
                    <span className="ms-2 mb-2 align-self-end d-lg-none d-block"
                      ><i
                        className="bi bi-caret-down-fill btn rounded-circle px-2 py-1 btn-outline-primary-40 news-btn-hover fw-bold"
                      ></i
                    ></span>
                  </div>
                  <p className="d-lg-block d-none">...</p>
                </div>
                <span className="ms-auto mb-2 align-self-end d-lg-block d-none"
                  ><i
                    className="bi bi-caret-down-fill btn rounded-circle px-2 py-1 btn-outline-primary-40 news-btn-hover fw-bold"
                  ></i
                ></span>
              </div>
            </button>
            {/* <!-- 展開 --> */}
            <div id="news-list-3" className="accordion-collapse collapse">
              <div className="accordion-body px-lg-10 py-lg-10 p-2">
                <div className="news-img-open rounded-4 overflow-hidden">
                  <img src={adNews3} alt="" className="img-fluid" />
                </div>
                <div className="d-flex flex-column mt-lg-8 mt-5">
                  <div
                    className="d-flex justify-content-lg-between align-items-lg-start flex-lg-row-reverse flex-column gap-2"
                  >
                    <p className="text-neutral-60 fs-lg-9 fs-7">
                      <time dateTime="2025-08-23">2025/08/23</time>
                    </p>
                    <h2 className="text-neutral-100 fw-bold fs-lg-3 fs-5">
                      來自法國的焦糖可可甜甜 - 8/23 起全門市熱烈販售
                    </h2>
                  </div>
                  <div
                    className="d-flex gap-lg-12 justify-content-lg-between flex-lg-row flex-column justify-content-start"
                  >
                    <div className="d-flex gap-5 flex-column mt-5 fs-9 lh-base">
                      <p>🎉 08/23起 \全門市熱烈販售/ 🎉</p>
                      <p>
                        <span className="fw-bold">焦糖可可甜甜🍫療癒新登場</span
                        ><br />選用法國進口苦甜可可粉，與慢火熬煮的手工焦糖醬融合製成特製內餡<br />外層以微烘焙可可粒與可可糖粉，搭配高純度可可豆壓模製成可愛外表🐼
                      </p>
                      <p>
                        濃醇可可搭配香甜焦糖，表層烘焙出微微焦香，甜而不膩、溫柔而濃厚💛<br />午後搭配拿鐵☕️享用，讓午後時光更加迷人🥛！
                      </p>
                      <p>
                        網路商城<span className="fw-bold"> ‼ 滿額免運優惠中‼ </span>
                        <br />數量有限，手刀把握最新出爐的好吃甜甜圈吧！😋<br />※單筆消費限折扣乙次
                      </p>
                      <div className="d-flex justify-content-between">
                        <a
                          href="item_details-caramelcocoa.html.html"
                          className="fw-bold rounded-pill news-link-font-hover news-link"
                          target="_blank"
                          >享用迷人的午後時光</a
                        >
                        <button
                          className="btn btn-outline-primary-40 rounded-circle news-btn-hover fw-bold align-self-end px-2 py-1 d-lg-none d-block"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#news-list-3"
                          aria-expanded="true"
                          aria-controls="news-title-3"
                        >
                          <i
                            className="bi bi-caret-up-fill d-block"
                            style={{ transform: 'translateY(-2px)' }}
                          ></i>
                        </button>
                      </div>
                    </div>
                    <button
                      className="btn btn-outline-primary-40 rounded-circle news-btn-hover fw-bold align-self-end px-2 py-1 d-lg-block d-none mb-3"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#news-list-3"
                      aria-expanded="true"
                      aria-controls="news-title-3"
                    >
                      <i
                        className="bi bi-caret-up-fill d-block"
                        style={{ transform: 'translateY(-2px)' }}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- 最新消息-4 --> */}
          <div
            className="accordion-item shadow rounded-4 border-0 overflow-hidden p-lg-8 p-5 animate__animated animate__slideInUp"
            id="news-title-4"
          >
            {/* <!-- 收合 --> */}
            <button
              className="news-accordion-btn"
              data-bs-toggle="collapse"
              data-bs-target="#news-list-4"
              aria-expanded="false"
              aria-controls="news-list-4"
            >
              <div className="d-flex gap-5 flex-column flex-lg-row w-100">
                <div className="news-img rounded-4 overflow-hidden flex-shrink-0">
                  <img src={adNews4} alt="" />
                </div>
                <div className="d-flex flex-column justify-content-between gap-2">
                  <p className="text-neutral-60 fs-lg-9 fs-7">
                    <time dateTime="2025-06-20">2025/06/20</time>
                  </p>
                  <h2 className="fw-bold fs-lg-4 fs-5 news-font-hover">
                    #涼爽登場 加購 \生乳檸檬甜甜/ 滿額免運!!
                  </h2>
                  <div className="d-flex">
                    <div
                      className="text-neutral-100 fs-7 lh-base d-flex gap-2 flex-column text-neutral-100 news-preview-height"
                    >
                      <p style={{ letterSpacing: '0.04rem' }}>
                        生乳檸檬甜甜 6/20 起，全門市清爽登場！
                      </p>
                      <p style={{ letterSpacing: '0.04rem' }}>
                        選用新鮮檸檬製成果泥，結合滑順法式生乳內餡，酸中帶甜、柔和清新，<br />不僅不膩口，還能讓你在每一口裡，感受到夏天的微風與陽光。
                      </p>
                      <p className="d-lg-block d-none">
                        推薦冰冰吃更對味，搭配冷萃咖啡或氣泡飲也超級剛好！
                      </p>
                    </div>
                    <span className="ms-2 mb-2 align-self-end d-lg-none d-block"
                      ><i
                        className="bi bi-caret-down-fill btn rounded-circle px-2 py-1 btn-outline-primary-40 news-btn-hover fw-bold"
                      ></i
                    ></span>
                  </div>
                  <p className="d-lg-block d-none">...</p>
                </div>
                <span className="ms-auto mb-2 align-self-end d-lg-block d-none"
                  ><i
                    className="bi bi-caret-down-fill btn rounded-circle px-2 py-1 btn-outline-primary-40 news-btn-hover fw-bold"
                  ></i
                ></span>
              </div>
            </button>
            {/* <!-- 展開 --> */}
            <div id="news-list-4" className="accordion-collapse collapse">
              <div className="accordion-body px-lg-10 py-lg-10 p-2">
                <div className="news-img-open rounded-4 overflow-hidden">
                  <img src={adNews4} alt="" className="img-fluid" />
                </div>
                <div className="d-flex flex-column mt-lg-8 mt-5">
                  <div
                    className="d-flex justify-content-lg-between align-items-lg-start flex-lg-row-reverse flex-column gap-2"
                  >
                    <p className="text-neutral-60 fs-lg-9 fs-7">
                      <time dateTime="2025-06-20">2025/06/20</time>
                    </p>
                    <h2 className="text-neutral-100 fw-bold fs-lg-3 fs-5">
                      #涼爽登場 加購 \生乳檸檬甜甜/ 滿額免運!!
                    </h2>
                  </div>
                  <div
                    className="d-flex gap-lg-12 justify-content-lg-between flex-lg-row flex-column justify-content-start"
                  >
                    <div className="d-flex gap-5 flex-column mt-5 fs-9 lh-base">
                      <p>🎉 6/20 起 全門市熱烈販售 / 新上市！快來嚐鮮🎉</p>
                      <p>
                        <span className="fw-bold">生乳檸檬甜甜圈🍋</span><br />
                        選用新鮮檸檬製成果泥，結合法式滑順生乳內餡，酸中帶甜、柔和清新。不僅不膩口，每一口都能感受到夏天的微風與陽光☀️🍃
                      </p>
                      <p>
                        推薦冰冰吃更對味，搭配冷萃咖啡或氣泡飲也超級剛好🥤❄️！快帶上好友一起來品嚐這款清爽新甜點吧💛
                      </p>
                      <p>
                        <span className="fw-bold">‼ 滿額免運優惠中‼ </span
                        ><br />※單筆消費限折扣乙次
                      </p>
                      <div className="d-flex justify-content-between">
                        <a
                          href="item_details-creamlemon.html"
                          className="fw-bold rounded-pill news-link-font-hover news-link"
                          target="_blank"
                          >享用夏日的透心涼</a
                        >
                        <button
                          className="btn btn-outline-primary-40 rounded-circle news-btn-hover fw-bold align-self-end px-2 py-1 d-lg-none d-block"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#news-list-4"
                          aria-expanded="true"
                          aria-controls="news-title-4"
                        >
                          <i
                            className="bi bi-caret-up-fill d-block"
                            style={{ transform: 'translateY(-2px)' }}
                          ></i>
                        </button>
                      </div>
                    </div>
                    <button
                      className="btn btn-outline-primary-40 rounded-circle news-btn-hover fw-bold align-self-end px-2 py-1 d-lg-block d-none mb-3"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#news-list-4"
                      aria-expanded="true"
                      aria-controls="news-title-4"
                    >
                      <i
                        className="bi bi-caret-up-fill d-block"
                        style={{ transform: 'translateY(-2px)' }}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <img
        src={newsLetter}
        alt=""
        className="position-absolute news-deco-img-letter"
      />
    </main>
    </>
  );
};

export default News;
