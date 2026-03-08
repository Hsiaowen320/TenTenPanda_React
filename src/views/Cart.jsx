
import { supabase } from '../../supabaseClient.js'
import { useNavigate, NavLink } from "react-router";
import { useState, useEffect } from "react";


const Cart  = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponPercentDiscount, setCouponPercentDiscount] = useState(0);
  const isCartEmpty = cart.length === 0;
  const navigate = useNavigate();

  // 更新購物車商品數量 - 新增/減少
  const increaseQty = (item) => {
    updateProductQty(item.product_id, item.qty + 1);
  };
  const decreaseQty = (item) => {
    if (item.qty === 1) return;
    updateProductQty(item.product_id, item.qty - 1);
  };
  const updateProductQty = async(id, newQty) => {
      try {
          const { data: { user } } = await supabase.auth.getUser();
          await supabase
            .from('carts')
            .update({ qty: newQty })
            .eq('product_id', id)
            .eq('user_id', user.id)
            .throwOnError();
          setCart(prev =>
                prev.map(cartItem =>
                  cartItem.product_id === id
                    ? { ...cartItem, qty: newQty }
                    : cartItem
                )
              );
      } catch (error) {
          alert("資料錯誤：" + error.message);
      }
  };
  //清除購物車商品
  const delProduct = async(id) => {
      try {
          const { data: { user } } = await supabase.auth.getUser();
          await supabase
            .from('carts')
            .delete()
            .eq('product_id', id)
            .eq('user_id', user.id)
            .throwOnError();
          getCart();
      } catch (error) {
          alert("資料錯誤：" + error.message);
      }
  };
  //取得購物車資料
  const getCart = async() => {
    try {
          const { data: { user } } = await supabase.auth.getUser();
          const res = await supabase
            .from('carts') // 資料表名稱
            .select(`*, profiles(*), products(*)`) // 取得購物車資料
            .eq('user_id', user.id)    // 加上 user_id 確保是該會員的購物車       
            .throwOnError(); // 如果發生錯誤，會直接跳進 catch 區塊
          setCart(res.data);
      } catch (error) {
          alert("資料錯誤");
      }
  }

  //優惠券
  useEffect(() => {
    if (!couponCode) {
      setCouponMessage(""); 
      return;
    }

    (async () => {
      try {
        const res = await supabase
          .from("coupons")
          .select("*")
          .eq("id", couponCode)
          .eq("is_active", true)
          .maybeSingle()
          .throwOnError();
        console.log(res);
        if (!res.data) {
          setCouponMessage("查無此優惠券或已失效");
          setCouponDiscount(0);
        } else {
          setCouponMessage("優惠券套用成功！");
          setCouponDiscount(res.data.discount_value);
        }
      } catch (error) {
        setCouponMessage("系統錯誤，請稍後再試");
      }
    })();
  }, [couponCode]);


  useEffect(() => {
    setTotalPrice(
      cart.reduce((sum, item) => sum + item.products.price * item.qty, 0)
    );
  }, [cart]);

  useEffect(() => {
    getCart();
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
                    <p className="text-white fs-lg-6 fs-8" style={{ marginLeft: '1px' }}>1</p>
                  </div>
                  <p className="fw-bold fs-lg-6 fs-8 text-primary-40">查看購物車</p>
                </li>
                <li className="d-flex flex-column align-items-center">
                  <div
                    className="bg-white border border-neutral-40 mb-lg-3 mb-2 order-progress-dot rounded-circle d-flex justify-content-center align-items-center"
                  >
                    <p className="text-neutral-60 fs-lg-6 fs-8" style={{ marginLeft: '1px' }}>
                      2
                    </p>
                  </div>
                  <p className="fw-bold fs-lg-6 fs-8 text-neutral-60">填寫收件資料</p>
                </li>
                <li className="d-flex flex-column align-items-center">
                  <div
                    className="bg-white border border-neutral-40 mb-lg-3 mb-2 order-progress-dot rounded-circle d-flex justify-content-center align-items-center"
                  >
                    <p className="text-neutral-60 fs-lg-6 fs-8" style={{ marginLeft: '1px' }}>
                      3
                    </p>
                  </div>
                  <p className="fw-bold fs-lg-6 fs-8 text-neutral-60">確認付款</p>
                </li>
                {/* <!-- 線條 --> */}
                <div
                  className="order-progress-leftline bg-neutral-40 position-absolute translate-middle-y"
                ></div>
                <div
                  className="order-progress-rightline bg-neutral-40 position-absolute translate-middle-y"
                ></div>
              </ol>
              {/* <!-- 訂單內容/ --> */}
              <div className="row">
                <div className="col-lg-8">
                  <div className="bg-white p-lg-8 rounded-4">
                    <h1 className="fw-bold text-neutral-100 fs-4 mb-6">訂單內容</h1>
                    { isCartEmpty ? (
                      <div className="cart-border-top border-neutral-40 pb-lg-10 w-100 pb-6 d-flex flex-column pt-lg-5 pt-2">
                        <p className="text-neutral-60 fs-lg-6 fs-8 text-center py-5">購物車是空的</p>
                      </div>
                    ) : (                    
                      <div
                        className="cart-border-top border-neutral-40 pb-lg-10 w-100 pb-6 d-flex flex-column pt-lg-5 pt-2"
                      >
                        {cart.map((item)=>{
                          return (
                            <div key={item.id}>
                              <button
                                type="button"
                                className="cart-checkout-btn cart-checkout-btn-x align-self-baseline ms-auto mb-1 d-lg-block d-none"
                                onClick={()=>delProduct(item.product_id)}
                              >
                                <i className="bi bi-x-lg"></i>
                              </button>
                              <div
                                className="d-flex justify-content-between align-items-start align-items-lg-center gap-lg-12 gap-4 ps-lg-5 px-0 pe-lg-15"
                              >
                                <div
                                  className="cart-img rounded-4 overflow-hidden border border-neutral-40"
                                >
                                  <img
                                    src={item.products.image_title_url}
                                    alt=""
                                    className="img-fluid"
                                  />
                                </div>
                                {/* <!-- 電腦版 --> */}
                                <div className="d-none d-lg-block w-100">
                                  <div
                                    className="d-flex justify-content-between w-100 align-items-center"
                                  >
                                    <p className="fw-bold fs-lg-9" style={{ width: '100px' }}>
                                      {item.products.name}
                                    </p>
                                    <p className="fw-bold fs-lg-9">NT. {item.products.price}</p>
                                    <div
                                      className="rounded-2 px-1 d-flex align-items-center"
                                      style={{
                                        border: '1px solid rgba(199, 199, 199, 0.15)',
                                        backgroundColor: 'rgba(199, 199, 199, 0.15)',
                                      }}
                                    >
                                      <button type="button" className="cart-checkout-btn" onClick={() => decreaseQty(item)} 
                                        style={{
                                          opacity: item.qty === 1 ? 0.5 : 1,
                                          cursor: item.qty === 1 ? "not-allowed" : "pointer",
                                        }}
                                      >
                                        <i className="bi bi-dash-lg pe-1"></i>
                                      </button>
                                        <p className="px-6 py-2 bg-white fw-bold">{item.qty}</p>
                                      <button type="button" className="cart-checkout-btn" onClick={() => increaseQty(item)}>
                                        <i className="bi bi-plus-lg ps-1"></i>
                                      </button>
                                    </div>
                                    <p className="fw-bold fs-lg-9" style={{ width: '63px' }}>NT. {item.products.price * item.qty}</p>
                                  </div>
                                </div>
                                {/* <!-- 手機版 --> */}
                                <div className="d-block d-lg-none w-100">
                                  <div className="pe-2 pt-2 d-flex flex-column gap-4">
                                    <div className="d-flex justify-content-between">
                                      <p className="fw-bold fs-7">{item.products.name}</p>
                                      <p className="fs-7">NT. {item.products.price}</p>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                      <div
                                        className="rounded-2 w-100 d-flex align-items-center"
                                        style={{
                                          border: '1px solid rgba(199, 199, 199, 0.15)',
                                          backgroundColor: 'rgba(199, 199, 199, 0.15)',
                                        }}
                                      >
                                        <button type="button" className="cart-checkout-btn" onClick={() => decreaseQty(item)} 
                                          style={{
                                          opacity: item.qty === 1 ? 0.5 : 1,
                                          cursor: item.qty === 1 ? "not-allowed" : "pointer",
                                        }}>
                                          <i className="bi bi-dash pe-1"></i>
                                        </button>
                                        <p
                                          className="px-4 py-1 bg-white fs-8 flex-grow-1 text-center"
                                        >
                                          {item.qty}
                                        </p>
                                        <button type="button" className="cart-checkout-btn" onClick={() => increaseQty(item)}>
                                          <i className="bi bi-plus ps-1"></i>
                                        </button>
                                      </div>
                                    </div>
                                    <div className="d-flex justify-content-end" onClick={()=>delProduct(item.product_id)}>
                                      <button type="button" className="cart-checkout-btn" onClick={() => increaseQty(item)}>
                                        <i className="bi bi-trash3 text-neutral-60 fs-7"></i>
                                        </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) }
                  </div>
                </div>
                <div className="col-lg-4 mt-8 mt-lg-0">
                  <div>
                    <div
                      className="orer-details-bg py-lg-8 py-6 px-4 px-lg-6 rounded-4"
                    >
                      <h2 className="fw-bold fs-4 text-neutral-100">優惠折扣</h2>
                      <div className="mt-lg-5 mt-3">
                        <label
                          htmlFor="coupon-code"
                          className="lh-base fs-lg-9 fs-9 mb-2 fw-bold"
                          >優惠碼
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="coupon-code"
                          placeholder="冬季限定 \ WINTER50 /"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        {couponMessage && (
                          <p className={couponMessage.includes("成功") ? "text-success mt-2" : "text-danger mt-2"}>
                            {couponMessage}
                          </p>
                        )}
                      </div>

                      <div className="mt-lg-10 mt-8">
                        <h3 className="fw-bold fs-5 text-neutral-100">小計</h3>
                        <div className="mt-5 d-flex flex-column gap-3">
                          <div className="d-flex justify-content-between">
                            <p>訂單金額</p>
                            <p>NT. {totalPrice}</p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <p>優惠折扣</p>
                            <p><i className="bi bi-dash"></i>NT. {couponDiscount}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="mt-lg-10 mt-8 d-flex flex-column justify-content-center align-items-center gap-4 gap-lg-6"
                    >
                      <NavLink to="/cart/checkout" className="btn btn-primary-40 text-white w-100 py-4 fs-6">填寫收件資料</NavLink>
                      <button className="btn btn-outline-primary-80 w-100 py-4 fs-6" onClick={() => navigate(-1)}>
                          繼續購物
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
    )
}

export default Cart;