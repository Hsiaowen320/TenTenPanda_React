
import { NavLink } from "react-router";
import { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient.js";
import orderSuccessImg from "@/assets/images/order-success/order-success-img.png";
import orderSuccessDone from "@/assets/images/order-success/order-success-done.png";

const OrderSuccess = () => {
  const [orderID, setOrderID] = useState([]);

  const getOrder = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const res = await supabase
        .from("carts")
        .select(`*, profiles(*), products(*)`)
        .eq("user_id", user.id)
        .throwOnError();
      setOrderID(res.data[0].id.slice(-6));
      // 刪除購物車資料
      const cartIds = res.data.map(item => item.id);
      await supabase
        .from('carts')
        .delete()
        .in('id', cartIds)
        .throwOnError();
    } catch (error) {
      alert("資料錯誤");
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

    return (
      <>
        <main className="order-bg">
              <section className="py-lg-14 py-8 container">
                {/* <!-- 進度條 --> */}
                <ol
                  className="d-flex justify-content-between p-lg-8 px-2 position-relative mb-lg-10 mb-8"
                >
                  <li className="d-flex flex-column align-items-center">
                    <div
                      className="bg-primary-40 mb-lg-3 mb-2 order-progress-dot rounded-circle d-flex justify-content-center align-items-center"
                    >
                      <i className="bi bi-check2 text-white fs-lg-5 fs-7"></i>
                    </div>
                    <p className="fw-bold fs-lg-6 fs-8 text-primary-40">查看購物車</p>
                  </li>
                  <li className="d-flex flex-column align-items-center">
                    <div
                      className="bg-primary-40 mb-lg-3 mb-2 order-progress-dot rounded-circle d-flex justify-content-center align-items-center"
                    >
                      <i className="bi bi-check2 text-white fs-lg-5 fs-7"></i>
                    </div>
                    <p className="fw-bold fs-lg-6 fs-8 text-primary-40">填寫收件資料</p>
                  </li>
                  <li className="d-flex flex-column align-items-center">
                    <div
                      className="bg-primary-40 mb-lg-3 mb-2 order-progress-dot rounded-circle d-flex justify-content-center align-items-center"
                    >
                      <p className="text-white fs-lg-6 fs-8" style={{ marginLeft: '1px' }}>3</p>
                    </div>
                    <p className="fw-bold fs-lg-6 fs-8 text-primary-40">確認付款</p>
                  </li>
                  {/* <!-- 線條 --> */}
                  <div
                    className="order-progress-leftline bg-primary-40 position-absolute translate-middle-y"
                  ></div>
                  <div
                    className="order-progress-rightline bg-primary-40 position-absolute translate-middle-y"
                  ></div>
                </ol>
                <div
                  className="orer-details-bg rounded-4 overflow-hidden d-flex flex-column flex-lg-row"
                >
                  <div className="d-none d-lg-block">
                    <img
                      src={orderSuccessImg}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div
                    className="d-flex flex-column gap-5 align-items-center justify-content-center flex-grow-1 mt-lg-0 mt-8"
                  >
                    <div>
                      <img
                        src={orderSuccessDone}
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                    <h2 className="fw-bold fs-3 lh-base" style={{ letterSpacing: '0.04em' }}>
                      您的訂單已確認 !
                    </h2>
                    <div
                      className="d-flex flex-column gap-2 align-items-center fs-lg-6 fs-7"
                    >
                      <p>您的訂單編號末6碼為：{orderID}</p>
                      <p>我們會盡快為您處理，並於出貨時通知您</p>
                    </div>
                    <div
                      className="d-flex gap-4 w-100 px-lg-15 my-lg-5 flex-column flex-lg-row px-3 mb-8"
                    >
                      <NavLink to="/member/myOrders" className="btn btn-outline-primary-80 bg-white w-100 py-3 fs-6">查看訂單資訊</NavLink>
                      <NavLink to="/" className="btn btn-primary-40 text-white w-100 py-3 fs-6">繼續逛逛</NavLink>
                    </div>
                  </div>
                </div>
              </section>
        </main>
      </>
    )
}

export default OrderSuccess;