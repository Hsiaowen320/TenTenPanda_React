import { useState, useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";
import { supabase } from "../../../supabaseClient.js";
import { useCoupon } from "../../components/CouponContext.jsx";

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { couponCode, setCouponCode, couponDiscount } = useCoupon();
  const shippingFee = 60;

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const res = await supabase
        .from("carts")
        .select(`*, profiles(*), products(*)`)
        .eq("user_id", user.id)
        .throwOnError();
      setCart(res.data);
    })();
  }, []);

  useEffect(() => {
    setTotalPrice(
      cart.reduce((sum, item) => sum + item.products.price * item.qty, 0),
    );
  }, [cart]);



  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const paymentMethod = useWatch({
    control,
    name: "paymentMethod",
  });

  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);

  // 送出表單
  const onSubmit = async (data) => {
    if (cart.length === 0) {
        alert("購物車是空的喔！");
        return;
    }
    const orderDetailJson = cart.map(item => ({
            product_id: item.product_id,
            product_name: item.products.name,
            price: item.products.price, // 存下購買時的價格！
            qty: item.qty
        }));
    const { data: { user } } = await supabase.auth.getUser(); 
    // console.log(couponCode);
    // console.log(typeof couponCode);

    try {
        const res = await supabase
            .from('orders') // 資料表名稱
            .insert({
                user_id: user.id, // 帶入使用者 ID
                date: new Date().toISOString(), // 訂單的日期
                order_status_id: 6, // 6 為待處理 
                payment_method: paymentMethod, // 帶入參數
                order_detail: orderDetailJson, // 存入 JSONB 欄位
                shipping_fee: shippingFee, // 帶入參數
                sub_total: totalPrice, // 帶入變數
                discount_amount: couponDiscount, // 帶入變數
                total_amount: totalPrice + shippingFee - couponDiscount, // 帶入變數
                coupon_id: couponCode, // 帶入變數
                receiver_name: data.receiverName, // 帶入變數
                receiver_email: data.receiverEmail, // 帶入變數
                receiver_tel: data.receiverTel, // 帶入變數
                receiver_address: data.receiverAddress // 帶入變數
            })
            .throwOnError(); // 如果發生錯誤，會直接跳進 catch 區塊
        navigate("/cart/checkout/order-success");
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <>
      <main className="order-bg">
        <section className="py-lg-14 py-8 container">
          {/* <!-- 進度條 --> */}
          <ol className="d-flex justify-content-between p-lg-8 px-2 position-relative mb-lg-10 mb-8">
            <li className="d-flex flex-column align-items-center">
              <div className="bg-primary-40 mb-lg-3 mb-2 order-progress-dot rounded-circle d-flex justify-content-center align-items-center">
                <i className="bi bi-check2 text-white fs-lg-5 fs-7"></i>
              </div>
              <p className="fw-bold fs-lg-6 fs-8 text-primary-40">查看購物車</p>
            </li>
            <li className="d-flex flex-column align-items-center">
              <div className="bg-primary-40 mb-lg-3 mb-2 order-progress-dot rounded-circle d-flex justify-content-center align-items-center">
                <p
                  className="text-white fs-lg-6 fs-8"
                  style={{ marginLeft: "1px" }}
                >
                  2
                </p>
              </div>
              <p className="fw-bold fs-lg-6 fs-8 text-primary-40">
                填寫收件資料
              </p>
            </li>
            <li className="d-flex flex-column align-items-center">
              <div className="bg-white border border-neutral-40 mb-lg-3 mb-2 order-progress-dot rounded-circle d-flex justify-content-center align-items-center">
                <p
                  className="text-neutral-60 fs-lg-6 fs-8"
                  style={{ marginLeft: "1px" }}
                >
                  3
                </p>
              </div>
              <p className="fw-bold fs-lg-6 fs-8 text-neutral-60">確認付款</p>
            </li>
            {/* <!-- 線條 --> */}
            <div className="order-progress-leftline bg-primary-40 position-absolute translate-middle-y"></div>
            <div className="order-progress-rightline bg-neutral-40 position-absolute translate-middle-y"></div>
          </ol>
          {/* <!-- 訂單資訊 --> */}
          <div className="row">
            <div className="col-lg-8">
              <div className="bg-white p-lg-8 rounded-4">
                <h1 className="fw-bold text-neutral-100 fs-4 mb-6">
                  收件人資訊
                </h1>
                {/* 表單 */}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="d-flex flex-column gap-8 gap-lg-6"
                  id="myForm"
                >
                  {/* 收件人姓名與電話 */}
                  <div className="d-flex gap-lg-6 gap-8 flex-column flex-lg-row">
                    <div className="w-100">
                      <label
                        htmlFor="receiverName"
                        className="lh-base ps-2 fs-lg-9 fs-7 mb-2"
                      >
                        收件人姓名
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.receiverName && "border border-primary-40"}`}
                        id="receiverName"
                        placeholder="例如：王小明"
                        {...register("receiverName", {
                          required: "※請輸入姓名",
                        })}
                      />
                      {errors.receiverName && (
                        <div className="text-primary-60 pt-1 text-start">
                          {errors.receiverName.message}
                        </div>
                      )}
                    </div>
                    <div className="w-100">
                      <label
                        htmlFor="receiverTel"
                        className="lh-base ps-2 fs-lg-9 fs-7 mb-2"
                      >
                        收件人電話
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.receiverTel && "border border-primary-40"}`}
                        id="receiverTel"
                        placeholder="例如：0912-345678"
                        {...register("receiverTel", {
                          required: "※請輸入電話號碼",
                          pattern: {
                            value: /^09\d{2}-\d{6}$/,
                            message: "※請依照手機格式 09XX-XXXXXX 輸入",
                          },
                        })}
                      />
                      {errors.receiverTel && (
                        <div className="text-primary-60 pt-1 text-start">
                          {errors.receiverTel.message}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* 電子信箱 */}
                  <div className="w-100">
                    <label
                      htmlFor="receiverEmail"
                      className="lh-base ps-2 fs-lg-9 fs-7 mb-2"
                    >
                      電子信箱
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.receiverEmail && "border border-primary-40"}`}
                      id="receiverEmail"
                      placeholder="例如：example@email.com"
                      {...register("receiverEmail", {
                        required: "※請輸入電子信箱",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "※請輸入有效的電子信箱",
                        },
                      })}
                    />
                    {errors.receiverEmail && (
                      <div className="text-primary-60 pt-1 text-start">
                        {errors.receiverEmail.message}
                      </div>
                    )}
                  </div>
                  {/* 收件地址 */}
                  <div className="w-100">
                    <label
                      htmlFor="receiverAddress"
                      className="lh-base ps-2 fs-lg-9 fs-7 mb-2"
                    >
                      收件地址
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.receiverAddress && "border border-primary-40"}`}
                      id="receiverAddress"
                      placeholder="例如：忠孝東路四段 123 號 5 樓"
                      {...register("receiverAddress", {
                        required: "※請輸入地址",
                      })}
                    />
                    {errors.receiverAddress && (
                      <div className="text-primary-60 pt-1 text-start">
                        {errors.receiverAddress.message}
                      </div>
                    )}
                  </div>
                  {/* 付款方式 */}
                  <div>
                    <label
                      htmlFor="paymentMethod"
                      className="lh-base ps-2 fs-lg-9 fs-7 mb-2"
                    >
                      付款方式
                    </label>
                    <select
                      id="paymentMethod"
                      className={`form-select ${errors.paymentMethod && "border border-primary-40"}`}
                      {...register("paymentMethod", {
                        required: "※請選擇付款方式",
                      })}
                    >
                      <option value="" hidden>
                        請選擇付款方式
                      </option>
                      <option value="cod">貨到付款</option>
                      <option value="credit-card">線上刷卡</option>
                    </select>
                    {errors.paymentMethod && (
                      <div className="text-primary-60 pt-1 text-start">
                        {errors.paymentMethod.message}
                      </div>
                    )}
                  </div>
                  {paymentMethod === "credit-card" && (
                    <div>
                      {/* 卡號 */}
                      <div className="pay-online-input-creditcard mb-3">
                        <label
                          htmlFor="credit-part1"
                          className="lh-base ps-2 fs-lg-9 fs-7 mb-2"
                        >
                          信用卡卡號
                        </label>
                        <div className="d-flex gap-lg-2 gap-1 align-items-center">
                          <input
                            type="text"
                            id="credit-part1"
                            maxLength={4}
                            className="form-control text-centefs-7 fs-lg-9 px-4"
                            ref={card1Ref}
                            onInput={(e)=>{
                              e.target.value = e.target.value.replace(/\D/g,"");
                              if(e.target.value.length === 4){
                                card2Ref.current.focus();
                              }
                            }}
                          />
                          <i className="bi bi-dash-lg text-neutral-60 d-lg-block d-none"></i>
                          <i className="bi bi-dash text-neutral-60 d-block d-lg-none"></i>
                          <input
                            type="text"
                            id="credit-part2"
                            className="form-control text-centefs-7 fs-lg-9 px-4"
                            maxLength={4}
                            ref={card2Ref}
                            onInput={(e)=>{
                              e.target.value = e.target.value.replace(/\D/g,"");
                              if(e.target.value.length === 4){
                                card3Ref.current.focus();
                              }
                            }}
                            onKeyDown={(e)=>{
                              if(e.key==="Backspace" && !e.target.value){
                                card1Ref.current.focus();
                              }
                            }}
                          />
                          <i className="bi bi-dash-lg text-neutral-60 d-lg-block d-none"></i>
                          <i className="bi bi-dash text-neutral-60 d-block d-lg-none"></i>
                          <input
                            type="text"
                            id="credit-part3"
                            className="form-control text-centefs-7 fs-lg-9 px-4"
                            maxLength={4}
                            ref={card3Ref}
                            onInput={(e)=>{
                              e.target.value = e.target.value.replace(/\D/g,"");
                              if(e.target.value.length === 4){
                                card4Ref.current.focus();
                              }
                            }}
                            onKeyDown={(e)=>{
                              if(e.key==="Backspace" && !e.target.value){
                                card2Ref.current.focus();
                              }
                            }}
                          />
                          <i className="bi bi-dash-lg text-neutral-60 d-lg-block d-none"></i>
                          <i className="bi bi-dash text-neutral-60 d-block d-lg-none"></i>
                          <input
                            type="text"
                            id="credit-part4"
                            className="form-control text-centefs-7 fs-lg-9 px-4"
                            maxLength={4}
                            ref={card4Ref}
                            onInput={(e)=>{
                              e.target.value = e.target.value.replace(/\D/g,"");
                            }}
                            onKeyDown={(e)=>{
                              if(e.key==="Backspace" && !e.target.value){
                                card3Ref.current.focus();
                              }
                            }}
                          />
                        </div>
                      </div>
                      {/* 有效期限 & CVV */}
                      <div className="pay-online-input-creditcard-date mt-lg-6 mt-8">
                        <div className="d-flex gap-lg-6 gap-4 justify-content-start align-items-start">
                          <div>
                            <label
                              htmlFor="creditExpiry"
                              className="lh-base ps-2 fs-lg-9 fs-7 mb-2"
                            >
                              有效期限
                            </label>
                            <input
                              type="text"
                              id="creditExpiry"
                              className="form-control"
                              maxLength={4}
                              placeholder="例如：MMYY"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="creditCvv"
                              className="lh-base ps-2 fs-lg-9 fs-7 mb-2"
                            >
                              安全碼 (CVV / CVC)
                            </label>
                            <input
                              type="text"
                              id="creditCvv"
                              className="form-control"
                              maxLength={3}
                              placeholder="例如：000"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* 其他需求 */}
                  <div>
                    <label
                      htmlFor="order-card"
                      className="lh-base ps-2 fs-lg-9 fs-7 mb-2"
                    >
                      其他需求
                    </label>
                    <textarea
                      className="form-control mb-lg-5 pb-0"
                      id="order-card"
                      rows="8"
                      placeholder="例如：甜點禮盒請幫我附上生日小卡。（最多可輸入 150 字）"
                      maxLength="150"
                      {...register("note")}
                    ></textarea>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4 mt-8 mt-lg-0">
              <div className="orer-details-bg py-lg-8 py-6 px-4 px-lg-6 rounded-4">
                <h2 className="fw-bold fs-4 text-neutral-100">訂單明細</h2>
                <div className="mt-5 mt-lg-8 d-flex flex-column gap-lg-5 gap-1 pb-2 pb-lg-6 border-bottom border-neutral-40">
                  {cart.map((item) => {
                    return (
                      <div
                        className="d-flex flex-column gap-1 py-2"
                        key={item.id}
                      >
                        <h3 className="fs-6 text-neutral-100">
                          {item.products.name}
                        </h3>
                        <div className="d-flex justify-content-between fs-6">
                          <p className="orer-details-num-color">x{item.qty}</p>
                          <p>NT$ {item.products.price * item.qty}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="pt-0 pt-lg-2">
                  <div className="pt-4">
                    <h3 className="fw-bold fs-lg-4 fs-5 text-neutral-100 pb-lg-4 pb-3">
                      合計
                    </h3>
                    <div className="py-6 d-flex flex-column gap-4 border-bottom border-neutral-40 mb-3 mb-lg-4">
                      <div className="d-flex justify-content-between fs-6 text-neutral-100">
                        <p>小計</p>
                        <p>NT$ {totalPrice}</p>
                      </div>
                      <div className="d-flex justify-content-between fs-6 text-neutral-100">
                        <p>運費</p>
                        <p>NT$ {shippingFee}</p>
                      </div>
                      <div className="d-flex justify-content-between fs-6 text-neutral-100">
                        <p>優惠折扣</p>
                        <p>− NT$ {couponDiscount}</p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <h3 className="fs-4 fs-lg-6 text-neutral-100 fw-bold">
                        總計
                      </h3>
                      <p className="fs-5 text-primary-80 fw-bold">
                        NT$ {totalPrice + shippingFee - couponDiscount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-lg-10 mt-8 d-flex flex-column justify-content-center align-items-center gap-4 gap-lg-6">
                <button
                  type="button"
                  className="btn btn-primary-40 text-white w-100 py-4 fs-6"
                  onClick={() =>
                    document.getElementById("myForm").requestSubmit()
                  }
                >
                  確認付款
                </button>
                <button
                  className="btn btn-outline-primary-80 w-100 py-4 fs-6"
                  onClick={() => navigate(-1)}
                >
                  編輯購物車
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Checkout;
