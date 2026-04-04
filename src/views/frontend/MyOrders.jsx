import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import { Link } from "react-router-dom";

function MyOrders() {
  const [myOrders, setMyOrders] = useState([]); // 存儲我的訂單
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [openOrderId, setOpenOrderId] = useState(null);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const getOrders = async () => {
      try {
        // 先獲取當前登入使用者的 ID (確保有登入)
        const {
          data: { user },
        } = await supabase.auth.getUser();

        // 這裡可以寫程式碼 (如跳轉到登入頁面、警告未登入)
        if (!user) {
          navigate("/login", { replace: true });
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
        alert("修改失敗：", error.message);
        console.error("修改失敗：", error.message);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  // 取得訂單的 API

  // 分頁邏輯計算
  const totalPages = Math.ceil(myOrders.length / ITEMS_PER_PAGE);

  const toggleOrder = (id) => {
    setOpenOrderId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <p className="fs-2 fw-semibold mb-lg-18 mb-8">我的訂單</p>

      {loading ? (
        <div className="text-center py-20">
          <div
            className="spinner-border text-primary-80"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 fs-5">努力整理訂單中...</p>
        </div>
      ) : (
        <div className="container" style={{ minHeight: "350px" }}>
          <div className="row">
            {myOrders.length > 0 ? (
              myOrders.map((myorder) => {
                const isExpanded = openOrderId === myorder.id;
                return (
                  <div
                    className="accordion"
                    id={`accordion-${myorder.id}`}
                    key={myorder.id}
                  >
                    <div className="accordion-item mb-8">
                      <h2
                        className="accordion-header"
                        id={`heading-${myorder.id}`}
                      >
                        <button
                          className={`accordion-button fs-6 fs-lg-4 pb-14 ${!isExpanded ? "collapsed" : ""}`}
                          type="button"
                          onClick={() => toggleOrder(myorder.id)}
                          aria-expanded={isExpanded}
                        >
                          訂單編號 :
                          <span className="ms-4 fs-7 fs-lg-5">
                            {myorder.id}
                          </span>
                        </button>
                      </h2>

                      <div
                        id={`order-${myorder.id}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`heading-${myorder.id}`}
                        style={{ display: isExpanded ? "block" : "none" }}
                      >
                        <div className="accordion-body ms-lg-8">
                          {/* 訂單資訊、收貨人資訊、商品資訊 */}
                          {/* 內容同之前 */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-18">
                <p className="fs-5 mb-6">目前沒有訂單</p>
                <p className="fs-5 mb-6">
                  前往{" "}
                  <Link
                    to="/productList-classic"
                    className="fw-bold text-primary-80"
                  >
                    商品列表
                  </Link>{" "}
                  逛逛購買吧 ~
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
    </>
  );
}

export default MyOrders;
