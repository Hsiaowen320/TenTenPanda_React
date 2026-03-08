import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

function MyOrders() {
  const [myOrders, setMyOrders] = useState([]); // 存儲我的訂單
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    getOrders();
  }, []);

  // 取得訂單的 API
  const getOrders = async () => {
    try {
      // 先獲取當前登入使用者的 ID (確保有登入)
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // 這裡可以寫程式碼 (如跳轉到登入頁面、警告未登入)
      if (!user) {
        alert("請先登入才能查看訂單喔！");
        return;
      }

      const response = await supabase
        .from("orders") // 資料表名稱
        .select(`*, order_status_id(*), user_id(*)`) // 取得資料
        .eq("user_id", user.id) // 加上 user_id 確保是該會員的訂單
        .throwOnError(); // 如果發生錯誤，會直接跳進 catch 區塊

      // 這裡寫取得訂單成功的執行程式碼
      const myOrderList = response.data;
      setMyOrders(myOrderList);
    } catch (error) {
      console.error("修改失敗：", error.message);
    }
  };

  // 分頁邏輯計算
  const totalPages = Math.ceil(myOrders.length / ITEMS_PER_PAGE);
  const currentItems = myOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <>
      <p className="fs-2 fw-semibold mb-lg-18 mb-8">我的訂單</p>
      <div className="container min-vh-100">
        <div className="row">
          {myOrders.map((myorder) => (
            <div
              className="accordion"
              id={`accordion-${myorder.id}`}
              key={myorder.id}
            >
              <div className="accordion-item mb-8">
                <h2 className="accordion-header" id={`heading-${myorder.id}`}>
                  <button
                    className="accordion-button collapsed fs-5 fs-lg-4 pb-14"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#order-${myorder.id}`}
                    aria-controls={`order-${myorder.id}`}
                  >
                    訂單編號 :
                    <span className="ms-4 fs-6 fs-lg-5">{myorder.id}</span>
                  </button>
                </h2>

                <div
                  id={`order-${myorder.id}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading-${myorder.id}`}
                  data-bs-parent={`#accordion-${myorder.id}`}
                >
                  <div className="accordion-body ms-lg-8">
                    <p className="infoHeading fs-6 fs-lg-5 mb-5 fw-bold">
                      訂單資訊
                    </p>
                    <ul className="mb-12">
                      <li className="fs-7 fs-lg-6 mb-4">
                        訂單時間
                        <span className="ms-6">{myorder.date}</span>
                      </li>
                      <li className="fs-7 fs-lg-6 mb-4">
                        訂單狀態
                        <span className="ms-6">
                          {myorder.order_status_id.status}
                        </span>
                      </li>
                      <li className="fs-7 fs-lg-6 mb-4">
                        付款方式
                        <span className="ms-6">{myorder.payment_method}</span>
                      </li>
                    </ul>

                    <p className="infoHeading fs-6 fs-lg-5 mb-5 fw-bold">
                      收貨人資訊
                    </p>
                    <ul className="mb-12">
                      <li className="fs-7 fs-lg-6 mb-4">
                        姓　　名
                        <span className="ms-6">{myorder.receiver_name}</span>
                      </li>
                      <li className="fs-7 fs-lg-6 mb-4">
                        電子信箱
                        <span className="ms-6">{myorder.receiver_email}</span>
                      </li>             
                      <li className="fs-7 fs-lg-6 mb-4">
                        聯絡電話
                        <span className="ms-6">{myorder.receiver_tel}</span>
                      </li>                                 
                      <li className="fs-7 fs-lg-6 mb-4">
                        收貨地址
                        <span className="ms-6">{myorder.receiver_address}</span>
                      </li>
                    </ul>

                    <p className="infoHeading fs-6 fs-lg-5 mb-5 fw-bold">
                      商品與金額資訊
                    </p>
                    <ul class="mb-12">
                      <li class="fs-7 fs-lg-6 mb-4">
                        購買品項
                        <div class="mt-4 mt-lg-0 ms-3 ms-lg-6 itemsList">
                          {myorder.order_detail?.map((item, index) => (
                            <ul class="mb-4 item" key={index}>
                              <li>{item.product_name}</li>
                              <li>NT$ {item.price}</li>
                              <li>X {item.qty}</li>
                            </ul>
                          ))}
                        </div>
                      </li>
                      <li class="fs-7 fs-lg-6 mb-4">
                        優惠折扣
                        <span class="ms-6">
                          {myorder.discount_amount === 0
                            ? "(無)"
                            : `NT$ ${myorder.discount_amount}`}
                        </span>
                      </li>
                      <li className="fs-7 fs-lg-6 mb-4">
                        運　　費
                        <span className="ms-6">NT$ {myorder.shipping_fee}</span>
                      </li>
                      <li className="fs-7 fs-lg-6 mb-4">
                        訂單總額
                        <span className="ms-6">NT$ {myorder.total_amount}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
    </>
  );
}

export default MyOrders;
