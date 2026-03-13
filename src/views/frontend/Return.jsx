const Return = () => {
  return (
    <>
      <main className="login-bg border-top border-bottom border-lg-0 position-relative">
        <div className="login container py-lg-14 py-8 px-3 px-lg-0">
          <div className="row d-lg-flex justify-content-center">
            {/* 麵包屑 */}
            <div className="container mb-4 mb-lg-8">
              <nav>
                <ol className="breadcrumb">
                  <li className="bread-item">
                    <a href="./index.html">
                      <img src="/icon-home.webp" alt="" />
                    </a>
                  </li>
                  <li className="d-flex align-items-center">
                    <span className="material-symbols-outlined text-neutral-60 mx-2">
                      keyboard_double_arrow_right
                    </span>
                    <a href="#"></a>
                  </li>
                  <li
                    className="bread-item text-neutral-80 fw-bold active"
                    aria-current="page"
                  >
                    退換貨政策
                  </li>
                </ol>
              </nav>
            </div>
            {/* 退換貨政策 */}
            <div className="w-100">
              {/* 歡迎詞 */}
              <h4 className="fs-lg-2 fs-4 fw-bold mb-lg-10 text-neutral-100 mb-6 text-center">
                退換貨政策
              </h4>
              {/* 第一項 */}
              <div className="mb-lg-10 mb-8">
                <h5 className="fs-lg-5 fs-6 fw-bold text-neutral-100 mb-4">
                  一、退換貨流程
                </h5>
                <ol className="list-style-num mb-8">
                  <li className="fs-lg-9 fs-7 text-neutral-100 lh-base mb-2">
                    於甜甜熊貓官方購物商城下方，點擊 IG 或 Facebook
                    進到粉絲專頁私訊小編。
                  </li>
                  <li className="fs-lg-9 fs-7 text-neutral-100 lh-base">
                    留下訂單相關資訊(訂單編號、姓名、聯絡電話、退換貨原因)，我們將盡速與您聯繫。
                  </li>
                </ol>
                <p className="fs-lg-9 fs-7 text-neutral-100 lh-base mb-2">
                  ※ 離島購買無退換貨服務。
                </p>
                <p className="fs-lg-9 fs-7 text-neutral-100 lh-base">
                  ※<span className="fw-bold">提醒您</span>
                  ，若遇產品問題時，建議拍照錄影以做為您的保障。
                </p>
              </div>
              {/* 第二項 */}
              <div className="mb-lg-10 mb-8">
                <h5 className="fs-lg-5 fs-6 fw-bold text-neutral-100 mb-4">
                  二、退款方式
                </h5>
                <ol className="list-style-num">
                  <li className="fs-lg-9 fs-7 text-neutral-100 lh-base mb-2">
                    符合退款標準之訂單，本公司將在收到退貨商品後進行退款，信用卡交易將在3日內進行退刷，其餘交易將進行人工退款作業，7~10個工作天後匯款至顧客指定帳戶。
                  </li>
                  <li className="fs-lg-9 fs-7 text-neutral-100 lh-base">
                    超商代碼、虛擬ATM付款者將酌收金流手續費30元，訂單消費金額扣除手續費、運費，為最後退款之金額。
                  </li>
                </ol>
              </div>
              {/* 第三項 */}
              <div className="mb-lg-14 mb-10">
                <h5 className="fs-lg-5 fs-6 fw-bold text-neutral-100 mb-4">
                  三、退換貨須知
                </h5>
                <ol className="list-style-num">
                  <li className="fs-lg-9 fs-7 text-neutral-100 lh-base mb-4">
                    當日現做商品無法退換貨，甜甜圈屬於短效期食品、當日現做、需冷藏保存，根據《消費者保護法》及其合理例外規定，不適用7日鑑賞期。若遇到商品有明顯瑕疵或出貨錯誤，請在收到後2小時內拍照存證並聯繫我們，我們會盡快協助處理。
                    <p className="fs-lg-9 fs-7 text-neutral-100 lh-base fw-bold mt-2">
                      ※
                      若由他人代收（如：管理室、親友），亦視為您本人收貨，請留意保存與時效責任。
                    </p>
                  </li>
                  <li className="fs-lg-9 fs-7 text-neutral-100 lh-base mb-4">
                    如遇以下狀況，商品將視為您主動放棄，
                    <span className="fw-bold">
                      恕不再另行補寄或退款，並需負擔運費與費用
                    </span>
                    ：
                    <ol className="list-style mt-2">
                      <li className="fs-lg-9 fs-7 text-neutral-100 lh-base mb-2">
                        配送兩次失敗無人簽收。
                      </li>
                      <li className="fs-lg-9 fs-7 text-neutral-100 lh-base mb-2">
                        約定時間未領取。
                      </li>
                      <li className="fs-lg-9 fs-7 text-neutral-100 lh-base">
                        聯絡資訊錯誤或無法取得聯繫。
                      </li>
                    </ol>
                  </li>
                  <li className="fs-lg-9 fs-7 text-neutral-100 lh-base">
                    申請退換貨時，請您以送貨廠商使用之包裝紙箱將退貨商品包裝妥當，若原紙箱已遺失，請另使用其他紙箱包覆於商品原廠包裝之外，請勿直接在商品包裝上黏貼紙張或書寫文字，若原廠商品包裝損毀將無法退貨。若是使用優惠券、優惠代碼購買商品者進行退換貨，退款會以使用優惠後的金額為準，無法取回優惠券，請見諒。
                  </li>
                </ol>
              </div>
              {/* 客服資訊 */}
              <ol className="text-lg-start text-center">
                <li className="fs-lg-9 fs-7 text-neutral-100 lh-base mb-2">
                  <span className="fw-bold">客服時間：</span>9:00-18:00
                </li>
                <li className="fs-lg-9 fs-7 text-neutral-100 lh-base mb-2">
                  <span className="fw-bold">客服專線：</span>0912-345-678
                </li>
                <li className="fs-lg-9 fs-7 text-neutral-100 lh-base">
                  <span className="fw-bold">客服信箱：</span>tenten@g​mail.com
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Return;
