import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function BackendOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [hover, setHover] = useState(false);

  const order = location.state;

  return (
    <div>
      <div className="d-lg-flex justify-content-between ms-lg-8 pt-8">
        <div className="d-lg-none d-flex justify-content-end mb-6">
          <button
            className={`me-12 btn br-999 text-center bg-${hover ? "primary-40" : "primary-20"} text-${hover ? "white" : "black"}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => navigate(-1)}
          >
            返回訂單列表
          </button>
        </div>
        <div className="ms-4 ms-lg-0">
          <p className="infoHeading fs-6 fs-lg-5 mb-4 mb-lg-8 fw-bold">
            訂單資訊
          </p>
          <ul className="mb-12">
            <li className="fs-7 fs-lg-6 mb-4 mb-lg-6">
              訂單時間
              <span className="ms-6">{order.date}</span>
            </li>
            <li className="fs-7 fs-lg-6 mb-4 mb-lg-6">
              訂單狀態
              <span className="ms-6">{order.order_statuses.status}</span>
            </li>
            <li className="fs-7 fs-lg-6 mb-4 mb-lg-6">
              付款方式
              <span className="ms-6">{order.payment_method}</span>
            </li>
          </ul>

          <p className="infoHeading fs-6 fs-lg-5 mb-4 mb-lg-8 fw-bold">
            收貨人資訊
          </p>
          <ul className="mb-12">
            <li className="fs-7 fs-lg-6 mb-4 mb-lg-6">
              姓　　名
              <span className="ms-6">{order.receiver_name}</span>
            </li>
            <li className="fs-7 fs-lg-6 mb-4 mb-lg-6">
              電子信箱
              <span className="ms-6">{order.receiver_email}</span>
            </li>
            <li className="fs-7 fs-lg-6 mb-4 mb-lg-6">
              聯絡電話
              <span className="ms-6">{order.receiver_tel}</span>
            </li>
            <li className="fs-7 fs-lg-6 mb-4 mb-lg-6">
              收貨地址
              <span className="ms-6">{order.receiver_address}</span>
            </li>
          </ul>

          <p className="infoHeading fs-6 fs-lg-5 mb-4 mb-lg-8 fw-bold">
            商品與金額資訊
          </p>
          <ul className="mb-12">
            <li className="fs-7 fs-lg-6 mb-lg-2">
              購買品項
              <div className="mt-4 mt-lg-0 ms-6 itemsList">
                {order.order_detail?.map((item, index) => (
                  <ul className="mb-4 item" key={index}>
                    <li>{item.product_name}</li>
                    <li>NT$ {item.price}</li>
                    <li>X {item.qty}</li>
                  </ul>
                ))}
              </div>
            </li>
            <li className="fs-7 fs-lg-6 mb-4 mb-lg-6">
              優惠折扣
              <span className="ms-6">
                {order.discount_amount === 0
                  ? "(無)"
                  : `NT$ ${order.discount_amount}`}
              </span>
            </li>
            <li className="fs-7 fs-lg-6 mb-4 mb-lg-6">
              運　　費
              <span className="ms-6">NT$ {order.shipping_fee}</span>
            </li>
            <li className="fs-7 fs-lg-6 mb-4 mb-lg-6">
              訂單總額
              <span className="ms-6">NT$ {order.total_amount}</span>
            </li>
          </ul>
        </div>
        <div className="d-none d-lg-block">
          <button
            className={`me-12 btn br-999 text-center bg-${hover ? "primary-40" : "primary-20"} text-${hover ? "white" : "black"}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => navigate(-1)}
          >
            返回訂單列表
          </button>
        </div>
      </div>
    </div>
  );
}

export default BackendOrderDetail;
