import { supabase } from "../../../supabaseClient.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BackendOrder() {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const [hover, setHover] = useState(false);
  const [searchId, setSearchId] = useState("");
  const STATUS_OPTIONS = [
    { id: 1, label: "已完成" },
    { id: 2, label: "已送達" },
    { id: 3, label: "配送中" },
    { id: 4, label: "準備出貨" },
    { id: 5, label: "未出貨" },
    { id: 6, label: "待處理" },
    { id: 7, label: "退貨/退款" },
  ];
  const toggleAccordion = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // 過濾訂單
  const filteredOrders = searchId
    ? orderData.filter((o) => o.id.startsWith(searchId)) // 可以改成 includes(value)
    : orderData;

  const getOrderInfo = async () => {
    try {
      const res = await supabase
        .from("orders")
        .select(`*, order_statuses(*)`)
        .throwOnError();
      setOrderData(res.data);
      console.log(res.data);
    } catch (error) {
      alert("資料錯誤");
    }
  };

  const updateStatus = async (orderId, orderStatus) => {
    console.log(orderId, orderStatus)
    try {
      await supabase
        .from('orders')
        .update({ order_status_id: orderStatus })
        .eq('id', orderId)
        .select(`*`, `order_statuses(*)`)
        .throwOnError();

      setOrderData((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? { ...order, order_status_id: orderStatus }
            : order,
        ),
      );
      alert("更改成功")
    } catch (error) {
      alert("資料錯誤");
    }
  };

  const handleChangeStatus = async (orderId, orderStatus) => {
    await updateStatus(orderId, orderStatus);
  };

  useEffect(() => {
    getOrderInfo();
  }, []);

  return (
    <>
      {/* 搜尋框 */}
      <div className="px-5 d-flex align-items-center  py-2 gap-5 mb-4 br-tl-12 br-tr-12 fs-6">
        <div className="col-12 col-lg-3">
          <div className="position-relative">
            <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3"></i>
            <input
              className="form-control rounded-pill ps-12"
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="輸入訂單編號"
            />
          </div>
        </div>
      </div>
      {/* 表頭 */}
      <div className="px-5 d-flex align-items-center border-bottom py-2 bg-primary-20 br-tl-12 br-tr-12 fs-6">
        <div className="col-7 col-lg-5 text-start text-lg-center fs-9 fs-lg-6">
          訂單編號
        </div>
        <div className="d-none d-lg-block col-lg-2 text-center fs-9 fs-lg-6">
          訂購會員
        </div>
        <div className="d-none d-lg-block col-lg-2 text-center fs-9 fs-lg-6">
          訂單時間
        </div>
        <div className="col-4 col-lg-2 text-start text-lg-center fs-9 fs-lg-6">
          訂單狀態
        </div>
      </div>
      {/* 手風琴 */}
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order, index) => (
          <div className="accordion" key={order.id}>
            <div className="accordion-item">
              <div className="accordion-header d-flex align-items-center py-2 gap-5 br-tl-12 br-tr-12 fs-6">
                <button
                  className={`accordion-button d-flex align-items-center pt-6 ${openId === order.id ? "" : "collapsed"}`}
                  type="button"
                  onClick={() => toggleAccordion(order.id)}
                >
                  <div className="col-7 col-lg-5 text-start text-lg-center fs-8 fs-lg-9">
                    {order.id}
                  </div>
                  <div className="d-none d-lg-block col-2 text-center fs-lg-9">
                    {order.receiver_name}
                  </div>
                  <div className="d-none d-lg-block col-2 text-center fs-lg-9">
                    {order.date}
                  </div>
                  <div className="col-4 col-lg-2">
                    <select
                      className="form-select br-999 fs-8 fs-lg-9 ps-4 ps-lg-20 py-2"
                      value={order.order_status_id}
                      onChange={(e) =>
                        handleChangeStatus(order.id, Number(e.target.value))
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </button>
              </div>
              <div
                style={{
                  height: openId === order.id ? "auto" : 0,
                  overflow: "hidden",
                  transition: "height 0.5s ease",
                }}
              >
                <div className="accordion-body d-flex flex-column gap-5 mb-5">
                  <button
                    onClick={() => navigate(`${order.id}`, { state: order })}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    className={`col-3 col-lg-1 ms-auto me-8 btn br-999 text-center fs-7 fs-lg-9 bg-${
                      hover ? "primary-40" : "primary-20"
                    } text-${hover ? "white" : "black"}`}
                  >
                    訂單詳情
                  </button>
                  <div className="accordion-body d-flex flex-column gap-5 mb-5">
                    {/* 訂購會員 */}
                    <div className="d-flex d-lg-none gap-3">
                      <div className="col-lg-1"></div>
                      <div className="d-flex gap-3 w-100">
                        <p className="col-3 col-lg-2 fs-7 fs-lg-6">訂單會員</p>
                        <p className="fs-7 fs-lg-6">
                          {order.receiver_name || "(無)"}
                        </p>
                      </div>
                    </div>
                    {/* 訂單時間 */}
                    <div className="d-flex d-lg-none gap-3">
                      <div className="col-lg-1"></div>
                      <div className="d-flex gap-3 w-100">
                        <p className="col-3 col-lg-2 fs-7 fs-lg-6">訂單時間</p>
                        <p className="fs-7 fs-lg-6">{order.date || "(無)"}</p>
                      </div>
                    </div>
                    {/* 訂單金額 */}
                    <div className="d-flex gap-3">
                      <div className="col-lg-1"></div>
                      <div className="d-flex gap-3 w-100">
                        <p className="col-3 col-lg-2 fs-7 fs-lg-6">訂單金額</p>
                        <p className="fs-7 fs-lg-6">
                          $ {order.total_amount || "(無)"}
                        </p>
                      </div>
                    </div>
                    {/* 運送地址 */}
                    <div className="d-flex gap-3">
                      <div className="col-lg-1"></div>
                      <div className="d-flex gap-3 w-100">
                        <p className="col-3 col-lg-2 fs-7 fs-lg-6">運送地址</p>
                        <p className="fs-7 fs-lg-6">
                          {order.receiver_address || "(無)"}
                        </p>
                      </div>
                    </div>
                    {/* 付款方式 */}
                    <div className="d-flex gap-3">
                      <div className="col-lg-1"></div>
                      <div className="d-flex gap-3 w-100">
                        <p className="col-3 col-lg-2 fs-7 fs-lg-6">付款方式</p>
                        <p className="fs-7 fs-lg-6">
                          {order.payment_method || "(無)"}
                        </p>
                      </div>
                    </div>
                    {/* 備註 */}
                    <div className="d-flex gap-3">
                      <div className="col-lg-1"></div>
                      <div className="d-flex gap-3 w-100">
                        <p className="col-3 col-lg-2 fs-7 fs-lg-6">備註</p>
                        <p className="fs-7 fs-lg-6">{order.note || "(無)"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center py-3">找不到對應的訂單</p>
      )}
    </>
  );
}

export default BackendOrder;
